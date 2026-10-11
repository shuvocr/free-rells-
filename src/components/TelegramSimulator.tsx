import React, { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw, Sparkles, ExternalLink, Bot, Check, CheckCheck } from 'lucide-react';
import { BotConfig, ChatMessage } from '../types';

interface TelegramSimulatorProps {
  config: BotConfig;
}

const QUICK_SUGGESTIONS = [
  'Naruto',
  'Doraemon',
  'Jujutsu Kaisen',
  'Squid Game',
  'Attack on Titan',
  'Crash Landing on You',
  'Tom and Jerry',
  'Death Note'
];

export const TelegramSimulator: React.FC<TelegramSimulatorProps> = ({ config }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-bot',
      sender: 'bot',
      text: `আসসালামু আলাইকুম ও স্বাগতম! 👋✨

আমি আপনার **Anime, Cartoon ও Drama AI Assistant Bot**। 🎬🍿

📌 **আমি কী করতে পারি?**
যে কোনো কার্টুন, অ্যানিমে অথবা ড্রামার নাম লিখে আমাকে পাঠান!
(যেমন: \`Naruto\`, \`Doraemon\`, \`Jujutsu Kaisen\`, \`Squid Game\`)

আমি সাথে সাথে গুগল জেমিনি এআই দিয়ে বাংলায় গল্পটির সারসংক্ষেপ ও বিস্তারিত তথ্য দেব, এবং পর্ব দেখার সরাসরি লিঙ্ক সরবরাহ করব! 🚀

💡 **শুরু করতে নিচের সাজেস্ট করা নামগুলো চাপুন অথবা নিজের পছন্দমতো লিখুন!**`,
      time: '12:00 PM',
      inlineButtons: [
        {
          text: config.buttonText || '▶️ Watch Episode (ভিডিও দেখুন)',
          url: config.monetagLink
        },
        {
          text: '📢 অফিসিয়াল চ্যানেল',
          url: config.updateChannel
        }
      ]
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastClickedNotice, setLastClickedNotice] = useState<string | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: query,
      time: getCurrentTime()
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    // If query is /start
    if (query === '/start') {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const botReply: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `আসসালামু আলাইকুম ও স্বাগতম! 👋✨

আমি আপনার **Anime, Cartoon ও Drama AI Assistant Bot**। 🎬🍿

যে কোনো কার্টুন, অ্যানিমে অথবা ড্রামার নাম লিখে আমাকে পাঠান (যেমন: \`Naruto\`, \`Doraemon\`, \`Squid Game\`)। আমি সাথে সাথে বাংলায় গল্পটির সারসংক্ষেপ ও তথ্য সরবরাহ করব!`,
          time: getCurrentTime(),
          inlineButtons: [
            {
              text: config.buttonText || '▶️ Watch Episode (ভিডিও দেখুন)',
              url: config.monetagLink
            },
            {
              text: '📢 আপডেট চ্যানেল',
              url: config.updateChannel
            }
          ]
        };
        setMessages((prev) => [...prev, botReply]);
      }, 700);
      return;
    }

    // Call server API for simulation
    setIsTyping(true);
    try {
      const res = await fetch('/api/simulate-bot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const data = await res.json();
      setIsTyping(false);

      const summaryText = data.summary || `🎬 **${query}**\n\nঅ্যানিমে ও ড্রামার সম্পূর্ণ বিবরণ বাংলায় পেতে নিচের বাটনে ক্লিক করুন।`;
      const fullBotResponse = `${summaryText}\n\n━━━━━━━━━━━━━━━━━━━━━━\n🎬 **পর্ব দেখতে নিচের বাটনে ক্লিক করুন:** 👇`;

      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: fullBotResponse,
        time: getCurrentTime(),
        inlineButtons: [
          {
            text: config.buttonText || '▶️ Watch Episode (ভিডিও দেখুন)',
            url: config.monetagLink
          },
          {
            text: '📢 আপডেট চ্যানেল (Join)',
            url: config.updateChannel
          }
        ]
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setIsTyping(false);
      const errorReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `❌ দুঃখিত, **'${query}'** সম্পর্কিত তথ্য খুঁজতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।\n\n👇 সরাসরি পর্ব দেখার লিঙ্ক:`,
        time: getCurrentTime(),
        inlineButtons: [
          {
            text: config.buttonText || '▶️ Watch Episode (ভিডিও দেখুন)',
            url: config.monetagLink
          }
        ]
      };
      setMessages((prev) => [...prev, errorReply]);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: `আসসালামু আলাইকুম ও স্বাগতম! 👋✨ চ্যাট রিসেট করা হয়েছে।\n\nযে কোনো অ্যানিমে, কার্টুন বা ড্রামার নাম টাইপ করে সেন্ড করুন!`,
        time: getCurrentTime(),
        inlineButtons: [
          {
            text: config.buttonText || '▶️ Watch Episode (ভিডিও দেখুন)',
            url: config.monetagLink
          }
        ]
      }
    ]);
  };

  const handleButtonClick = (btn: { text: string; url?: string }) => {
    setLastClickedNotice(`বোতাম ক্লিক করা হয়েছে: "${btn.text}" -> ${btn.url || '#'}`);
    setTimeout(() => setLastClickedNotice(null), 4000);
    if (btn.url) {
      window.open(btn.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex flex-col h-[700px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
      {/* Telegram App Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-slate-100">Anime & Drama AI Bot</h3>
              <span className="text-[10px] text-sky-400 bg-sky-950/60 border border-sky-800/50 px-1.5 py-0.5 rounded">Pyrogram v2</span>
            </div>
            <p className="text-xs text-slate-400">
              {isTyping ? (
                <span className="text-sky-400 animate-pulse">টাইপ করছে... (Gemini AI searching)</span>
              ) : (
                'বট • বাংলা সারসংক্ষেপ ও মনেট্যাগ লিঙ্ক'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSendMessage('/start')}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            title="Send /start command"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            /start
          </button>
          <button
            onClick={handleResetChat}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
            title="Reset Chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Telegram Chat Message History */}
      <div
        ref={chatScrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 bg-radial from-slate-900 via-slate-950 to-slate-950"
      >
        {lastClickedNotice && (
          <div className="sticky top-0 z-10 flex justify-center">
            <div className="bg-emerald-950/90 border border-emerald-600/50 text-emerald-300 text-xs px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-2">
              <Check className="w-3.5 h-3.5" />
              <span>{lastClickedNotice}</span>
            </div>
          </div>
        )}

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] ${isUser ? 'ml-auto' : 'mr-auto'}`}
            >
              {/* Message Bubble */}
              <div
                className={`p-3.5 rounded-2xl shadow-md text-sm leading-relaxed ${
                  isUser
                    ? 'bg-sky-600 text-white rounded-br-xs'
                    : 'bg-slate-800/90 border border-slate-700/60 text-slate-200 rounded-bl-xs font-bengali'
                }`}
              >
                <div className="whitespace-pre-wrap select-text">
                  {msg.text}
                </div>
                
                <div
                  className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                    isUser ? 'text-sky-200' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.time}</span>
                  {isUser && <CheckCheck className="w-3 h-3 text-sky-200" />}
                </div>
              </div>

              {/* Inline Keyboard Buttons (Underneath Bot Message) */}
              {msg.inlineButtons && msg.inlineButtons.length > 0 && (
                <div className="w-full mt-2 space-y-1.5">
                  {msg.inlineButtons.map((btn, index) => (
                    <button
                      key={index}
                      onClick={() => handleButtonClick(btn)}
                      className={`w-full text-center py-2 px-3 text-xs font-medium rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 ${
                        index === 0
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold ring-1 ring-emerald-400/30'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <span className="truncate">{btn.text}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-80" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Telegram Typing Animation Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs bg-slate-800/70 border border-slate-700/50 px-3.5 py-2.5 rounded-2xl w-fit rounded-bl-xs">
            <span className="font-bengali">বট জেমিনি এআই দিয়ে তথ্য লিখছে</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Quick Suggestion Chips */}
      <div className="px-3 py-2 bg-slate-950/70 border-t border-slate-800/70 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
        <span className="text-slate-400 text-[11px] whitespace-nowrap pl-1 font-medium">জনপ্রিয়:</span>
        {QUICK_SUGGESTIONS.map((item) => (
          <button
            key={item}
            onClick={() => handleSendMessage(item)}
            disabled={isTyping}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/70 whitespace-nowrap transition-colors disabled:opacity-50"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
            placeholder="কার্টুন, অ্যানিমে বা ড্রামার নাম লিখুন (যেমন: Naruto, Squid Game)..."
            className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 font-bengali"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="p-2.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white rounded-xl transition-all shadow-md shrink-0"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
