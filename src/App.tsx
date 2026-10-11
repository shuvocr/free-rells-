import React, { useState } from 'react';
import { TelegramSimulator } from './components/TelegramSimulator';
import { CodeViewer } from './components/CodeViewer';
import { ConfigPanel } from './components/ConfigPanel';
import { SetupGuide } from './components/SetupGuide';
import { BotConfig } from './types';
import { generatePythonBotScript } from './utils/codeGenerator';
import { Download, Copy, Check, MessageSquareCode, Code2, Settings2, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'config' | 'guide'>('simulator');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const [botConfig, setBotConfig] = useState<BotConfig>({
    apiId: '12345678',
    apiHash: 'your_telegram_api_hash_here',
    botToken: '1234567890:ABCdefGhIJKlmNoPQRsTUVwxyZ_example',
    geminiModel: 'gemini-1.5-flash',
    monetagLink: 'https://otieupt.com/4/xxxxxxx',
    updateChannel: 'https://t.me/YourChannel',
    buttonText: '▶️ Watch Episode (ভিডিও দেখুন)',
  });

  const handleDownloadMainScript = () => {
    const code = generatePythonBotScript(botConfig);
    const blob = new Blob([code], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bot.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* 1. Universal Top Navigation Bar (Zone 1: Wordmark, Zone 2: Nav, Zone 3: Primary Action) */}
      <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>Telegram AI Bot Studio</span>
          </a>

          {/* Zone 2: Concise single-line navigation tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'simulator'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquareCode className="w-3.5 h-3.5" />
              <span>Live Simulator</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'code'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Python Code (bot.py)</span>
            </button>
            <button
              onClick={() => setActiveTab('config')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'config'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Credentials & Settings</span>
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'guide'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Setup Guide</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadMainScript}
              className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-all shadow-md flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download bot.py</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex items-center justify-around bg-slate-900 border-b border-slate-800 px-2 py-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'simulator' ? 'bg-sky-600 text-white' : 'text-slate-400'}`}
        >
          Simulator
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'code' ? 'bg-sky-600 text-white' : 'text-slate-400'}`}
        >
          bot.py Code
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'config' ? 'bg-sky-600 text-white' : 'text-slate-400'}`}
        >
          Settings
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'guide' ? 'bg-sky-600 text-white' : 'text-slate-400'}`}
        >
          Guide
        </button>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Editorial Subheader & Unboxed Metadata */}
        <div className="space-y-2">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Telegram Anime & Drama AI Bot
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-bengali">
                জেমিনি এআই দিয়ে বাংলায় যে কোনো কার্টুন, অ্যানিমে বা নাটকের বিস্তারিত সারসংক্ষেপ ও মনেট্যাগ ডিরেক্ট লিংক মনিটাইজেশন
              </p>
            </div>

            {/* Zero-Pill Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
              <span>Pyrogram v2.0</span>
              <span aria-hidden="true">·</span>
              <span>Gemini 1.5 Flash</span>
              <span aria-hidden="true">·</span>
              <span>Monetag SmartLink</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400">Ready to Deploy</span>
            </div>
          </div>
        </div>

        {/* Dynamic Main Workspace: Dual Split for desktop, or tabbed for mobile */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Interactive Telegram Simulator */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="font-medium text-slate-200">লাইভ টেলিগ্রাম সিমুলেটর (Live Interactive Bot)</span>
                <span>বাস্তব টেলিগ্রাম চ্যাট ও ইনলাইন বাটন টেস্ট করুন</span>
              </div>
              <TelegramSimulator config={botConfig} />
            </div>

            {/* Right: Quick Code Preview & Credentials Overview */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span className="font-medium text-slate-200">পাইথন কোড ভিউয়ার (Source Code)</span>
                  <button
                    onClick={() => setActiveTab('code')}
                    className="text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    ফুলস্ক্রিন ভিউয়ার খুলুন &rarr;
                  </button>
                </div>
                <CodeViewer config={botConfig} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <div>
                <span className="font-medium text-slate-200 text-sm">সম্পূর্ণ পাইথন স্ক্রিপ্ট ও ডিপ্লয়মেন্ট কনফিগারেশন</span>
                <p className="text-xs text-slate-400 mt-0.5">সবগুলো ফাইল কপি বা ডাউনলোড করে সাথে সাথে রান করতে পারবেন</p>
              </div>
            </div>
            <CodeViewer config={botConfig} />
          </div>
        )}

        {activeTab === 'config' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <ConfigPanel config={botConfig} onChange={setBotConfig} />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <SetupGuide />
          </div>
        )}

        {/* Secondary Section: Quick Configuration & Setup Overview below simulator */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80">
            <ConfigPanel config={botConfig} onChange={setBotConfig} />
            <SetupGuide />
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Telegram Anime AI Bot Studio</span>
            <span aria-hidden="true">·</span>
            <span>Pyrogram & Google Generative AI</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="https://my.telegram.org" target="_blank" rel="noreferrer" className="hover:text-slate-200 transition-colors">
              my.telegram.org
            </a>
            <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="hover:text-slate-200 transition-colors">
              Google AI Studio
            </a>
            <a href="https://monetag.com" target="_blank" rel="noreferrer" className="hover:text-slate-200 transition-colors">
              Monetag Publisher
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
