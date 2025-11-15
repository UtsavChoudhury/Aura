import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const sampleQuestions = [
  "What's the difference between stocks and bonds?",
  "How much should I save before investing?",
  "What is compound interest?",
  "What are index funds?"
];

const mockResponses: Record<string, string> = {
  "difference between stocks and bonds": "Great question! Stocks represent ownership in a company - when you buy stock, you own a small piece of that company. Bonds are loans you give to companies or governments, and they pay you interest over time. Stocks typically have higher potential returns but more risk, while bonds are generally more stable with lower returns.",
  "save before investing": "Financial experts typically recommend having 3-6 months of living expenses saved in an emergency fund before you start investing. This ensures you won't need to sell investments at a bad time if unexpected expenses arise. Start with savings, then invest!",
  "compound interest": "Compound interest is often called the 'eighth wonder of the world'! It's when you earn interest not just on your initial investment, but also on the interest you've already earned. For example, if you invest $100 at 10% annual return, after year 1 you have $110. In year 2, you earn 10% on $110 (not just the original $100), giving you $121. Over time, this snowball effect can dramatically grow your wealth!",
  "index funds": "Index funds are investment funds that aim to match the performance of a specific market index, like the S&P 500. Instead of trying to pick winning stocks, they buy a little bit of everything in the index. They're popular because they're low-cost, diversified, and historically perform well over the long term. They're perfect for beginners!",
  "default": "That's an interesting question! Here are some key points to consider: Investing is a long-term strategy that requires patience and research. Always make sure you understand what you're investing in, diversify your portfolio to manage risk, and never invest money you can't afford to lose. Would you like me to elaborate on any specific aspect of investing?"
};

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI investment assistant. Ask me anything about investing, stocks, bonds, ETFs, or building your portfolio. I'm here to help you learn!"
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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const inputLower = input.toLowerCase();
      let response = mockResponses.default;

      // Find matching response
      for (const [key, value] of Object.entries(mockResponses)) {
        if (inputLower.includes(key)) {
          response = value;
          break;
        }
      }

      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Assistant</span>
          </div>
          <h2 className="text-gray-900 mb-4">Ask Me Anything About Investing</h2>
          <p className="text-gray-600">
            Get instant answers to your investment questions 24/7
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-600" />
              Investment Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' ? 'bg-purple-600' : 'bg-gray-300'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-gray-700" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-lg max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-700" />
                  </div>
                  <div className="px-4 py-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question about investing..."
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                className="bg-purple-600 hover:bg-purple-700 text-white"
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sampleQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(question)}
              className="text-left p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors text-gray-700"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
