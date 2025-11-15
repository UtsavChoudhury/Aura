import image_2860af584c2e69ad5f4672762edae54ae8c60dee from 'figma:asset/2860af584c2e69ad5f4672762edae54ae8c60dee.png';
import image_2860af584c2e69ad5f4672762edae54ae8c60dee from 'figma:asset/2860af584c2e69ad5f4672762edae54ae8c60dee.png';
import image_2860af584c2e69ad5f4672762edae54ae8c60dee from 'figma:asset/2860af584c2e69ad5f4672762edae54ae8c60dee.png';
import image_2860af584c2e69ad5f4672762edae54ae8c60dee from 'figma:asset/2860af584c2e69ad5f4672762edae54ae8c60dee.png';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const quickQuestions = [
  "What's a stock? 📈",
  "How do I start investing? 💰",
  "What's compound interest? 🎯",
  "Tell me about ETFs! 🎁",
  "What is opportunity cost? 🤔"
];

const mockResponses: Record<string, string> = {
  "stock": "Ahoy there! 🏢 A stock is like owning a tiny piece of a company! When you buy stock in a company like Apple or Disney, you become a part-owner. If the company does well, your stock becomes more valuable! Quite marvelous, isn't it? 🚀",
  "start investing": "Wonderful question, my young friend! Here's my advice: 1️⃣ Learn the basics (you're doing splendidly already! 🎉) 2️⃣ Save up some money 3️⃣ Open an investment account with help from a parent 4️⃣ Start small with index funds. Remember: never invest money you might need soon! That's Papa's wisdom! 💡",
  "compound interest": "Ah, compound interest! It's like a snowball rolling down a mountain! ⛄ Your money makes money, and then THAT money makes MORE money! For example: Invest $100 and earn 10%, you'll have $110. Next year, you earn 10% on $110 (not just $100), so you get $121! It keeps growing bigger and bigger! That's why starting early is SO powerful, my dear! 🌟",
  "etf": "Excellent question! An ETF (Exchange-Traded Fund) is like a treasure chest filled with different investments! 🎁 Instead of buying just one stock, an ETF lets you own tiny pieces of LOTS of companies all at once. It's like getting a variety pack instead of just one flavor! This is called diversification, and it helps keep your money safer. Papa's advice: spread your risk! 🛡️",
  "opportunity cost": "Ah, opportunity cost! It's what you give up when you choose one thing over another! 💭 For example, if you spend $100 on a new game, the opportunity cost is what that $100 could have become if you invested it instead! Check out the 'Future Me' page to see this magic in action! It helps you make wiser choices about your money! 🎯✨",
  "budget": "Budgeting is one of Papa's favorite topics! 📊 Try using the 50/30/20 rule: 50% for essentials (food, rent), 30% for fun things, and 20% for savings! Visit the Budget Simulator where I can guide you through allocating your money wisely! Remember: a budget isn't about restricting yourself—it's about spending consciously! 💰",
  "save": "Saving money is like planting seeds for your future! 🌱 Start with a goal—maybe $100, then $500, then $1,000! Keep it in a safe place like a bank account. Papa's secret: pay yourself FIRST before spending on anything else! Even saving $5 a week adds up to $260 a year! 🎯",
  "default": "That's a splendid question! 🤔 I'm Moominpappa, and I'm here to guide you through investing, stocks, saving money, and building your financial future! Think of me as your wise money mentor! Ask me anything, or try completing some learning quests to level up your knowledge! 🚀✨"
};

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Greetings, young adventurer! 👴🎩 I'm Moominpappa, your wise money guide! I've been managing my family's finances for years, and I'm here to share all my wisdom with you! Ask me anything about investing, saving, or building wealth! Let's embark on this financial journey together! 💬✨"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Use simple mock responses instead of OpenAI
    // try {
    //   // Call OpenAI API
    //   const apiKey = import.meta.env?.VITE_OPENAI_API_KEY;
    //   
    //   console.log('API Key check:', {
    //     exists: !!apiKey,
    //     startsWithSk: apiKey?.startsWith('sk-'),
    //     length: apiKey?.length,
    //     envObject: import.meta.env
    //   });
    //   
    //   if (!apiKey || apiKey === 'YOUR_OPENAI_API_KEY_HERE' || !apiKey.startsWith('sk-')) {
    //     throw new Error('API key not configured properly');
    //   }
    //
    //   const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${apiKey}`
    //     },
    //     body: JSON.stringify({
    //       model: 'gpt-4o-mini',
    //       messages: [
    //         {
    //           role: 'system',
    //           content: `You are Moominpappa from the beloved Moomin stories, but now you're a wise and cheerful financial advisor helping teenagers learn about money, investing, and personal finance. 
    //
    // Your personality:
    // - Warm, encouraging, and grandfatherly
    // - Use gentle humor and wholesome emojis (🎩, 💰, 📈, ✨, 🌟, 🚀, etc.)
    // - Call users "young adventurer", "my dear friend", or similar endearing terms
    // - Reference your experience managing the Moomin family's finances
    // - Be patient and never condescending
    // - Make complex financial topics simple and relatable for teens
    //
    // Your knowledge:
    // - Expert in stocks, ETFs, compound interest, budgeting, saving
    // - Teach responsible money habits
    // - Emphasize starting early with investing
    // - Explain opportunity costs and delayed gratification
    // - Promote the 50/30/20 budgeting rule
    // - Always remind them that you're educational, not providing actual financial advice
    //
    // Your style:
    // - Keep responses under 150 words
    // - Use simple language suitable for 13-17 year olds
    // - Include relevant emojis to make it engaging
    // - End with encouragement or a actionable tip
    // - Sometimes reference features of the Aura app (Learn section, Portfolio Simulator, Future Me calculator, Budget Simulator, Compete section)
    //
    // Important: Never discuss risky investments, crypto gambling, or encourage debt. Focus on education, long-term thinking, and building healthy money habits.`
    //         },
    //         ...messages.map(msg => ({
    //           role: msg.role,
    //           content: msg.content
    //         })),
    //         {
    //           role: 'user',
    //           content: messageText
    //         }
    //       ],
    //       temperature: 0.8,
    //       max_tokens: 300
    //     })
    //   });
    //
    //   if (!response.ok) {
    //     throw new Error('Failed to get response from AI');
    //   }
    //
    //   const data = await response.json();
    //   const assistantMessage: Message = {
    //     role: 'assistant',
    //     content: data.choices[0].message.content
    //   };
    //   
    //   setMessages(prev => [...prev, assistantMessage]);
    // } catch (error) {
    //   console.error('Error calling OpenAI:', error);
      
      // Fallback to mock responses
      const inputLower = messageText.toLowerCase();
      let fallbackResponse = mockResponses.default;

      for (const [key, value] of Object.entries(mockResponses)) {
        if (inputLower.includes(key)) {
          fallbackResponse = value;
          break;
        }
      }

      const assistantMessage: Message = { role: 'assistant', content: fallbackResponse };
      setMessages(prev => [...prev, assistantMessage]);
    // } finally {
      setIsTyping(false);
    // }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-2xl z-50 animate-bounce p-0 overflow-hidden"
        >
          <ImageWithFallback 
            src={image_2860af584c2e69ad5f4672762edae54ae8c60dee}
            alt="Moominpappa"
            className="w-full h-full object-cover"
          />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col border-4 border-blue-400">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageWithFallback 
                  src={image_2860af584c2e69ad5f4672762edae54ae8c60dee}
                  alt="Moominpappa"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <div>
                  <CardTitle className="text-white">Moominpappa 🎩</CardTitle>
                  <p className="text-sm text-blue-100">Always here to help!</p>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                    message.role === 'user' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-200'
                  }`}>
                    {message.role === 'user' ? (
                      <span className="text-white">😊</span>
                    ) : (
                      <ImageWithFallback 
                        src={image_2860af584c2e69ad5f4672762edae54ae8c60dee}
                        alt="Moominpappa"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-[80%] shadow-md ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'bg-white text-gray-800 border-2 border-blue-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <ImageWithFallback 
                      src="https://via.placeholder.com/32/3B82F6/FFFFFF?text=M"
                      alt="Moominpappa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white border-2 border-blue-200 shadow-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          <div className="p-4 bg-white border-t-2 border-blue-200">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(question)}
                  className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Papa anything! 💬"
                className="flex-1 border-2 border-blue-200 focus:border-blue-400 rounded-xl"
              />
              <Button
                onClick={() => handleSend()}
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-xl"
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}