import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Plus, Trophy, Star, Sparkles, RefreshCw, Search, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useGame } from '../App';
import { toast } from 'sonner';

interface Holding {
  symbol: string;
  name: string;
  shares: number;
  buyPrice: number;
  currentPrice: number;
  emoji: string;
}

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdate?: string;
}

const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

// Popular stocks with fallback prices - Mix of US tech stocks (Alpha Vantage supported)
const POPULAR_STOCKS: StockData[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.50, change: 2.15, changePercent: 1.22 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 372.40, change: -1.20, changePercent: -0.32 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 138.25, change: 0.85, changePercent: 0.62 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.80, change: 5.60, changePercent: 2.36 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 495.20, change: 12.30, changePercent: 2.55 },
  { symbol: 'META', name: 'Meta Platforms', price: 338.75, change: -2.40, changePercent: -0.70 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 145.90, change: 1.75, changePercent: 1.21 },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 487.30, change: 3.20, changePercent: 0.66 },
];

const mockPriceData = [
  { month: 'Jan', value: 10000 },
  { month: 'Feb', value: 10500 },
  { month: 'Mar', value: 10200 },
  { month: 'Apr', value: 11000 },
  { month: 'May', value: 11800 },
  { month: 'Jun', value: 12500 },
];

export function PortfolioSimulator() {
  const { money, spendMoney, updatePortfolioStats } = useGame();
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [showAddStock, setShowAddStock] = useState(false);
  const [showMarket, setShowMarket] = useState(false);
  const [newStock, setNewStock] = useState({ symbol: '', shares: '', price: '' });
  const [stockPrices, setStockPrices] = useState<StockData[]>(POPULAR_STOCKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingRealPrices, setIsLoadingRealPrices] = useState(false);
  const [usingRealData, setUsingRealData] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);
  const [portfolioHistory, setPortfolioHistory] = useState<{ time: string; value: number }[]>([]);

  // Fetch real prices from Alpha Vantage API (free tier)
  const fetchRealStockPrices = async () => {
    setIsLoadingRealPrices(true);
    try {

      const API_KEY = '129P7BAY9F7N8A32';
      
      const updatedStocks: StockData[] = [];
      
      // Fetch data for first 3 stocks to respect API rate limits (5 calls/minute on free tier)
      for (const stock of POPULAR_STOCKS.slice(0, 3)) {
        try {
          console.log(`Fetching data for ${stock.symbol}...`);
          
          const response = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock.symbol}&interval=60min&apikey=${API_KEY}`
          );
          
          if (response.ok) {
            const data = await response.json();
            console.log(`Response for ${stock.symbol}:`, data);
            
            // Check for error or rate limit messages
            if (data['Error Message']) {
              console.error(`API Error for ${stock.symbol}:`, data['Error Message']);
              updatedStocks.push(stock);
              continue;
            }
            
            if (data['Note']) {
              console.warn('API Rate limit reached:', data['Note']);
              updatedStocks.push(stock);
              continue;
            }
            
            if (data['Information']) {
              console.warn('API message:', data['Information']);
              updatedStocks.push(stock);
              continue;
            }
            
            const timeSeries = data['Time Series (1min)'];
            
            if (timeSeries) {
              // Get the most recent timestamp
              const timestamps = Object.keys(timeSeries).sort().reverse();
              
              if (timestamps.length >= 2) {
                const latestTime = timestamps[0];
                const previousTime = timestamps[1];
                
                const latestData = timeSeries[latestTime];
                const previousData = timeSeries[previousTime];
                
                // Extract price (closing price of latest minute)
                const price = parseFloat(latestData['4. close']);
                const previousPrice = parseFloat(previousData['4. close']);
                
                // Calculate change
                const change = price - previousPrice;
                const changePercent = (change / previousPrice) * 100;
                
                updatedStocks.push({
                  symbol: stock.symbol,
                  name: stock.name,
                  price: parseFloat(price.toFixed(2)),
                  change: parseFloat(change.toFixed(2)),
                  changePercent: parseFloat(changePercent.toFixed(2)),
                  lastUpdate: new Date().toLocaleTimeString()
                });
                
                console.log(`✅ Successfully fetched ${stock.symbol}: $${price.toFixed(2)}`);
              } else {
                console.warn(`Not enough data points for ${stock.symbol}`);
                updatedStocks.push(stock);
              }
            } else {
              console.warn(`No time series data for ${stock.symbol}`);
              updatedStocks.push(stock);
            }
          } else {
            console.error(`HTTP error for ${stock.symbol}:`, response.status);
            updatedStocks.push(stock);
          }
        } catch (error) {
          console.error(`Error fetching ${stock.symbol}:`, error);
          updatedStocks.push(stock);
        }
        
        // Add a small delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Add remaining stocks with fallback data
      updatedStocks.push(...POPULAR_STOCKS.slice(3));
      
      setStockPrices(updatedStocks);
      setUsingRealData(updatedStocks.some(s => s.lastUpdate !== undefined));
      setLastFetchTime(new Date());
      
      console.log('✅ Stock fetch complete. Total stocks:', updatedStocks.length);
      
    } catch (error) {
      console.error('Error fetching real stock prices:', error);
      // Fall back to simulated data
      setStockPrices(POPULAR_STOCKS);
    } finally {
      setIsLoadingRealPrices(false);
    }
  };

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStockPrices(prev => prev.map(stock => {
        const priceChange = (Math.random() - 0.5) * 0.5; // Random change between -0.25 and +0.25
        const newPrice = Math.max(0.1, stock.price + priceChange);
        const change = newPrice - stock.price;
        const changePercent = (change / stock.price) * 100;
        
        return {
          ...stock,
          price: parseFloat(newPrice.toFixed(2)),
          change: parseFloat(change.toFixed(2)),
          changePercent: parseFloat(changePercent.toFixed(2))
        };
      }));

      // Update holdings with new prices
      setHoldings(prev => prev.map(holding => {
        const stockData = stockPrices.find(s => s.symbol === holding.symbol);
        if (stockData) {
          return {
            ...holding,
            currentPrice: stockData.price
          };
        }
        // Simulate price changes for custom stocks
        const priceChange = (Math.random() - 0.5) * 0.3;
        return {
          ...holding,
          currentPrice: Math.max(0.1, holding.currentPrice + priceChange)
        };
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [stockPrices]);

  // Track portfolio history for growth chart
  useEffect(() => {
    if (holdings.length === 0) return;
    
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const portfolioValue = holdings.reduce((sum, h) => sum + (h.shares * h.currentPrice), 0);
      
      setPortfolioHistory(prev => {
        const newHistory = [...prev, { time: timeStr, value: parseFloat(portfolioValue.toFixed(2)) }];
        // Keep only last 10 data points
        return newHistory.slice(-10);
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [holdings]);

  const totalInvested = holdings.reduce((sum, h) => sum + (h.shares * h.buyPrice), 0);
  const currentValue = holdings.reduce((sum, h) => sum + (h.shares * h.currentPrice), 0);
  const totalReturn = currentValue - totalInvested;
  const returnPercentage = totalInvested > 0 ? ((totalReturn / totalInvested) * 100).toFixed(2) : '0';
  const totalPortfolio = money + currentValue;

  // Update game context with portfolio stats whenever they change
  // Portfolio value = only invested stocks (not including available cash)
  useEffect(() => {
    const portfolioValue = currentValue; // Only the value of stocks, not cash
    const returns = totalReturn;
    const returnsPercent = totalInvested > 0 ? parseFloat(((totalReturn / totalInvested) * 100).toFixed(2)) : 0;
    
    updatePortfolioStats(portfolioValue, returns, returnsPercent);
  }, [holdings, currentValue, totalReturn, totalInvested, updatePortfolioStats]);

  const pieData = holdings.map(h => ({
    name: h.symbol,
    value: h.shares * h.currentPrice
  }));

  const handleBuyStock = (stock: StockData, shares: number) => {
    const cost = shares * stock.price;

    if (!spendMoney(cost)) {
      toast.error('⚠️ Not enough money! Complete more lessons to earn money! 💰');
      return;
    }

    const emojis = ['🚀', '⭐', '💎', '🎯', '🏆', '🎮', '🌟', '✨'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    // Check if already own this stock
    const existingHolding = holdings.find(h => h.symbol === stock.symbol);
    if (existingHolding) {
      // Add to existing holding
      const totalShares = existingHolding.shares + shares;
      const avgPrice = ((existingHolding.buyPrice * existingHolding.shares) + (stock.price * shares)) / totalShares;
      
      setHoldings(holdings.map(h => 
        h.symbol === stock.symbol 
          ? { ...h, shares: totalShares, buyPrice: avgPrice }
          : h
      ));
    } else {
      // Create new holding
      setHoldings([...holdings, {
        symbol: stock.symbol,
        name: stock.name,
        shares,
        buyPrice: stock.price,
        currentPrice: stock.price,
        emoji: randomEmoji
      }]);
    }

    setShowMarket(false);
  };

  const handleAddCustomStock = () => {
    if (newStock.symbol && newStock.shares && newStock.price) {
      const shares = parseInt(newStock.shares);
      const price = parseFloat(newStock.price);
      const cost = shares * price;

      if (!spendMoney(cost)) {
        toast.error('⚠️ Not enough money! Complete more lessons to earn money! 💰');
        return;
      }

      const emojis = ['🚀', '⭐', '💎', '🎯', '🏆', '🎮', '🌟', '✨'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

      setHoldings([...holdings, {
        symbol: newStock.symbol.toUpperCase(),
        name: `${newStock.symbol.toUpperCase()} Stock`,
        shares,
        buyPrice: price,
        currentPrice: price * (0.95 + Math.random() * 0.1),
        emoji: randomEmoji
      }]);
      setNewStock({ symbol: '', shares: '', price: '' });
      setShowAddStock(false);
    }
  };

  const filteredStocks = stockPrices.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full mb-4 shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span>Live Market Data!</span>
          </div>
          <h2 className="text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
            Investment Playground! 🎮💰
          </h2>
          <p className="text-xl text-gray-700 mb-4">
            Trade real Finnish stocks from Helsinki Stock Exchange!
          </p>
          
          {/* Real Data Indicator */}
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={fetchRealStockPrices}
              disabled={isLoadingRealPrices}
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-xl shadow-lg"
            >
              {isLoadingRealPrices ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Fetching Real Prices...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Fetch Real Market Data
                </>
              )}
            </Button>
            
            {usingRealData && lastFetchTime && (
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 px-4 py-2 rounded-xl border-2 border-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live data fetched at {lastFetchTime.toLocaleTimeString()}
              </div>
            )}
            
            {!usingRealData && (
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-xl border-2 border-blue-300">
                <AlertCircle className="w-4 h-4" />
                Using simulated data (Click to fetch real prices)
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-4 border-purple-300 shadow-xl transform hover:scale-105 transition-transform">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                <CardDescription className="text-white/90">Total Treasure</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="w-8 h-8" />
                <div className="text-4xl">€{totalPortfolio.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-purple-500 text-white border-4 border-blue-300 shadow-xl transform hover:scale-105 transition-transform">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6" />
                <CardDescription className="text-white/90">Invested</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl">€{totalInvested.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-400 to-orange-400 text-white border-4 border-yellow-300 shadow-xl transform hover:scale-105 transition-transform">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                <CardDescription className="text-white/90">Available Coins</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl">€{money.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className={`bg-gradient-to-br ${totalReturn >= 0 ? 'from-green-400 to-teal-400' : 'from-red-400 to-orange-400'} text-white border-4 ${totalReturn >= 0 ? 'border-green-300' : 'border-red-300'} shadow-xl transform hover:scale-105 transition-transform`}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                {totalReturn >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                <CardDescription className="text-white/90">Total Profit</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl">
                €{Math.abs(totalReturn).toLocaleString()}
              </div>
              <p className="text-white/90 mt-1">({returnPercentage}%)</p>
            </CardContent>
          </Card>
        </div>

        {/* Helsinki Stock Market */}
        <Card className="border-4 border-blue-300 shadow-xl mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200">
            <div className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                  📈 Stock Market
                </CardTitle>
                <CardDescription>Trade popular stocks with live prices!</CardDescription>
              </div>
              <Button
                onClick={() => setShowMarket(!showMarket)}
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-lg px-6 py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all"
              >
                {showMarket ? '❌ Close' : '📈 View Market'}
              </Button>
            </div>
          </CardHeader>
          
          {showMarket && (
            <CardContent className="pt-6">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search stocks..."
                    className="pl-10 text-lg py-6 border-2 border-blue-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {filteredStocks.map((stock) => (
                  <div 
                    key={stock.symbol}
                    className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all"
                  >
                    <div className="flex-1">
                      <div className="text-xl text-gray-900 mb-1">{stock.symbol}</div>
                      <p className="text-sm text-gray-600">{stock.name}</p>
                    </div>
                    <div className="text-center mx-4">
                      <div className="text-2xl text-gray-900">€{stock.price.toFixed(2)}</div>
                      <div className={`text-sm flex items-center gap-1 ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change >= 0 ? '📈' : '📉'} {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleBuyStock(stock, 1)}
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        Buy 1
                      </Button>
                      <Button
                        onClick={() => handleBuyStock(stock, 10)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Buy 10
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Prices update every 5 seconds with {usingRealData ? 'real market movements + simulation' : 'simulated market movements'}
                  </p>
                  {!usingRealData && (
                    <Button
                      onClick={fetchRealStockPrices}
                      size="sm"
                      disabled={isLoadingRealPrices}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Fetch Real Data
                    </Button>
                  )}
                </div>
                {usingRealData && (
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Real-time data from financial APIs. Click "Fetch Real Market Data" to refresh with latest prices.
                  </p>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-4 border-pink-300 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span>🥧</span> Your Portfolio Mix
              </CardTitle>
              <CardDescription>See how your investments are split!</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {holdings.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <p>No investments yet! Start trading to see your portfolio.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-4 border-blue-300 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span>📈</span> Portfolio Growth
              </CardTitle>
              <CardDescription>Watch your money grow over time!</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {portfolioHistory.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={portfolioHistory}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} name="Portfolio Value ($)" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📈</div>
                    <p>Buy stocks to track your portfolio growth over time!</p>
                    <p className="text-sm mt-2">The chart updates every 5 seconds</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="border-4 border-green-300 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-100 to-teal-100">
            <div className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">🎯 Your Stock Collection</CardTitle>
                <CardDescription>Manage your investments!</CardDescription>
              </div>
              <Button
                onClick={() => setShowAddStock(!showAddStock)}
                className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white text-lg px-6 py-6 rounded-xl shadow-lg transform hover:scale-105 transition-all"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Custom 🛠️
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showAddStock && (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl mb-6 border-4 border-gray-200">
                <h3 className="text-2xl text-gray-900 mb-4">🛠️ Add Custom Stock</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label htmlFor="symbol" className="text-lg">Stock Symbol</Label>
                    <Input
                      id="symbol"
                      value={newStock.symbol}
                      onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value })}
                      placeholder="e.g., AAPL"
                      className="text-lg py-6 border-2 border-gray-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shares" className="text-lg">How Many?</Label>
                    <Input
                      id="shares"
                      type="number"
                      value={newStock.shares}
                      onChange={(e) => setNewStock({ ...newStock, shares: e.target.value })}
                      placeholder="e.g., 10"
                      className="text-lg py-6 border-2 border-gray-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-lg">Price Each</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newStock.price}
                      onChange={(e) => setNewStock({ ...newStock, price: e.target.value })}
                      placeholder="e.g., 150"
                      className="text-lg py-6 border-2 border-gray-300 rounded-xl"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleAddCustomStock} 
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white text-lg px-8 py-6 rounded-xl"
                  >
                    ✅ Add Stock!
                  </Button>
                  <Button 
                    onClick={() => setShowAddStock(false)} 
                    variant="outline"
                    className="text-lg px-8 py-6 rounded-xl border-2"
                  >
                    ❌ Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {holdings.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">🎯</div>
                  <p className="text-xl">No stocks yet! Click "View Market" to start investing!</p>
                </div>
              )}
              
              {holdings.map((holding, index) => {
                const currentValue = holding.shares * holding.currentPrice;
                const invested = holding.shares * holding.buyPrice;
                const gain = currentValue - invested;
                const gainPercent = ((gain / invested) * 100).toFixed(2);

                return (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-6 rounded-2xl border-4 ${
                      gain >= 0 ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-4xl">{holding.emoji}</div>
                        <div>
                          <div className="text-2xl text-gray-900">{holding.symbol}</div>
                          <p className="text-gray-600">{holding.name}</p>
                        </div>
                      </div>
                      <div className="flex gap-6 text-gray-700">
                        <span className="bg-white px-3 py-1 rounded-full">📦 {holding.shares} shares</span>
                        <span className="bg-white px-3 py-1 rounded-full">💵 Bought: €{holding.buyPrice.toFixed(2)}</span>
                        <span className="bg-white px-3 py-1 rounded-full">💰 Now: €{holding.currentPrice.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl text-gray-900 mb-2">€{currentValue.toLocaleString()}</div>
                      <div className={`text-xl flex items-center gap-2 justify-end ${gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {gain >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                        {gain >= 0 ? '📈' : '📉'} €{Math.abs(gain).toFixed(2)} ({gainPercent}%)
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}