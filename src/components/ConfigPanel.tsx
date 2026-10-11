import React from 'react';
import { Sliders, KeyRound, Link2, Tv, Sparkles, HelpCircle } from 'lucide-react';
import { BotConfig } from '../types';

interface ConfigPanelProps {
  config: BotConfig;
  onChange: (updated: BotConfig) => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onChange }) => {
  const updateField = (field: keyof BotConfig, value: string) => {
    onChange({ ...config, [field]: value });
  };

  const handleApplyPreset = (type: 'default' | 'anime' | 'drama') => {
    if (type === 'default') {
      onChange({
        ...config,
        buttonText: '▶️ Watch Episode (ভিডিও দেখুন)',
        geminiModel: 'gemini-1.5-flash'
      });
    } else if (type === 'anime') {
      onChange({
        ...config,
        buttonText: '🔥 Watch Anime (সব পর্ব দেখুন)',
        geminiModel: 'gemini-1.5-flash'
      });
    } else if (type === 'drama') {
      onChange({
        ...config,
        buttonText: '🍿 Watch Drama (এইচডি কোয়ালিটি)',
        geminiModel: 'gemini-1.5-flash'
      });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-sky-950 text-sky-400 border border-sky-800/60">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 text-sm">Bot Parameters & Credentials</h3>
            <p className="text-xs text-slate-400">এখানকার পরিবর্তনগুলো স্বয়ংক্রিয়ভাবে bot.py কোডে যুক্ত হবে</p>
          </div>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleApplyPreset('default')}
            className="text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
          >
            অল-ইন-ওয়ান
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('anime')}
            className="text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
          >
            অ্যানিমে ফোকাস
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('drama')}
            className="text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
          >
            ড্রামা ফোকাস
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Telegram API ID */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-sky-400" />
              API_ID (Telegram)
            </span>
            <span className="text-[10px] text-slate-500">my.telegram.org</span>
          </label>
          <input
            type="text"
            value={config.apiId}
            onChange={(e) => updateField('apiId', e.target.value)}
            placeholder="উদাহরণ: 24589123"
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        {/* Telegram API Hash */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-sky-400" />
              API_HASH (Telegram)
            </span>
            <span className="text-[10px] text-slate-500">৩২ অক্ষরের হ্যাশ</span>
          </label>
          <input
            type="text"
            value={config.apiHash}
            onChange={(e) => updateField('apiHash', e.target.value)}
            placeholder="উদাহরণ: 9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c"
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        {/* Telegram Bot Token */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              BOT_TOKEN (BotFather)
            </span>
            <span className="text-[10px] text-slate-500">Telegram @BotFather থেকে প্রাপ্ত</span>
          </label>
          <input
            type="text"
            value={config.botToken}
            onChange={(e) => updateField('botToken', e.target.value)}
            placeholder="উদাহরণ: 7123456789:AAFd98Zxxxxxxxxxxxxxxxxxxxxxx"
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        {/* Monetag Direct Link */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-emerald-400" />
              MONETAG_LINK (SmartLink Direct URL)
            </span>
            <span className="text-[10px] text-emerald-400/90 font-medium">ইনলাইন বাটনের মূল লিংক</span>
          </label>
          <input
            type="text"
            value={config.monetagLink}
            onChange={(e) => updateField('monetagLink', e.target.value)}
            placeholder="https://otieupt.com/4/xxxxxxx অথবা আপনার Monetag স্মার্টলিংক"
            className="w-full bg-slate-950 border border-emerald-900/60 rounded-xl px-3.5 py-2 text-xs font-mono text-emerald-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Button Text */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
            <Tv className="w-3.5 h-3.5 text-indigo-400" />
            Watch Button Label (বোতামের লেখা)
          </label>
          <input
            type="text"
            value={config.buttonText}
            onChange={(e) => updateField('buttonText', e.target.value)}
            placeholder="▶️ Watch Episode (ভিডিও দেখুন)"
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500 font-bengali"
          />
        </div>

        {/* Gemini Model */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            Gemini AI Model
          </label>
          <select
            value={config.geminiModel}
            onChange={(e) => updateField('geminiModel', e.target.value)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="gemini-1.5-flash">gemini-1.5-flash (দ্রুত ও নিখুঁত)</option>
            <option value="gemini-2.5-flash">gemini-2.5-flash (নতুন সংস্করণ)</option>
            <option value="gemini-flash-latest">gemini-flash-latest (সর্বশেষ আপডেট)</option>
          </select>
        </div>

        {/* Update Channel */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-slate-400" />
            Telegram Support / Update Channel Link
          </label>
          <input
            type="text"
            value={config.updateChannel}
            onChange={(e) => updateField('updateChannel', e.target.value)}
            placeholder="https://t.me/YourAnimeChannel"
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
      </div>

      <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start gap-2.5 text-xs text-slate-400">
        <HelpCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="text-slate-200 font-medium">নিরাপত্তা তথ্য:</span> আপনার বট রান করার সময় <code className="text-sky-300 bg-slate-900 px-1 py-0.5 rounded">.env</code> ফাইলে <code className="text-sky-300 bg-slate-900 px-1 py-0.5 rounded">GEMINI_API_KEY</code> সেট করুন। এতে আপনার কোনো ব্যক্তিগত চাবি পাবলিক কোডে উন্মুক্ত হবে না।
        </div>
      </div>
    </div>
  );
};
