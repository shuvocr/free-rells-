import React, { useState } from 'react';
import { Bot, Key, DollarSign, Server, Smartphone, CheckCircle2, ChevronRight, Sparkles, AlertCircle } from 'lucide-react';

export const SetupGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      id: 1,
      title: '১. Telegram Bot Token তৈরি',
      icon: Bot,
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <p>
            Telegram-এ নিজস্ব বট তৈরি করতে অফিসিয়াল <span className="text-sky-400 font-mono font-medium">@BotFather</span> ব্যবহার করতে হয়:
          </p>
          <ol className="list-decimal pl-4 space-y-2 text-slate-300">
            <li>Telegram অ্যাপে যান এবং সার্চ বক্সে <code className="text-sky-300 bg-slate-900 px-1.5 py-0.5 rounded">@BotFather</code> লিখে ভেরিফায়েড বটটিতে প্রবেশ করুন।</li>
            <li>চ্যাটে <code className="text-sky-300 bg-slate-900 px-1.5 py-0.5 rounded">/start</code> এবং পরবর্তীতে <code className="text-sky-300 bg-slate-900 px-1.5 py-0.5 rounded">/newbot</code> লিখে সেন্ড করুন।</li>
            <li>আপনার বটের একটি ডিসপ্লে নাম দিন (যেমন: <em>Anime Master BD</em>)।</li>
            <li>বটের ইউজারনেম দিন যা অবশ্যই <code>bot</code> দিয়ে শেষ হতে হবে (যেমন: <em>AnimeDramaSummary_Bot</em>)।</li>
            <li>সফল হলে BotFather আপনাকে একটি <strong>HTTP API Token</strong> দেবে (যেমন: <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded">7123456789:AAFd98...</code>)। এটি সংরক্ষণ করুন।</li>
          </ol>
        </div>
      )
    },
    {
      id: 2,
      title: '২. API_ID এবং API_HASH সংগ্রহ',
      icon: Key,
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <p>
            Pyrogram ফ্রেমওয়ার্ক টেলিগ্রামের আল্ট্রাফাস্ট MTProto প্রোটোকল ব্যবহার করে। এর জন্য একটি অ্যাপ ক্রেডেনশিয়াল প্রয়োজন:
          </p>
          <ol className="list-decimal pl-4 space-y-2 text-slate-300">
            <li>যেকোনো ব্রাউজারে <a href="https://my.telegram.org" target="_blank" rel="noreferrer" className="text-sky-400 underline font-medium">my.telegram.org</a> ওয়েবসাইটে প্রবেশ করুন।</li>
            <li>আপনার টেলিগ্রাম ফোন নম্বর দিন এবং টেলিগ্রামে আসা কনফার্মেশন কোড দিয়ে লগইন করুন।</li>
            <li><strong>"API development tools"</strong> অপশনে ক্লিক করুন।</li>
            <li>একটি অ্যাপের নাম ও শর্ট নাম লিখে সাবমিট করুন (যেমন: <em>AnimeBotApp</em>)।</li>
            <li>সেখান থেকে <strong>App api_id</strong> (একটি সংখ্যা) এবং <strong>App api_hash</strong> (৩২ অক্ষরের কোড) কপি করে নিন।</li>
          </ol>
        </div>
      )
    },
    {
      id: 3,
      title: '৩. Google Gemini API Key (ফ্রি)',
      icon: Sparkles,
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <p>
            গুগল জেমিনি এআই ব্যবহারের জন্য একটি ফ্রি API Key প্রয়োজন:
          </p>
          <ol className="list-decimal pl-4 space-y-2 text-slate-300">
            <li><a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-sky-400 underline font-medium">Google AI Studio</a>-তে আপনার গুগল অ্যাকাউন্ট দিয়ে সাইন ইন করুন।</li>
            <li>উপরে বাম পাশে <strong>"Get API key"</strong> বাটনে চাপ দিন।</li>
            <li><strong>"Create API key in new project"</strong> নির্বাচন করুন।</li>
            <li>তৈরি হওয়া চাবিটি কপি করে নিন (এটি <code className="text-sky-300 bg-slate-900 px-1.5 py-0.5 rounded">AIzaSy...</code> দিয়ে শুরু হয়)। এটি মাসে সম্পূর্ণ ফ্রি কোটা প্রদান করে।</li>
          </ol>
        </div>
      )
    },
    {
      id: 4,
      title: '৪. Monetag Direct Link (SmartLink)',
      icon: DollarSign,
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <p>
            মনেট্যাগ স্মার্টলিংক হলো টেলিগ্রাম বটের সবচেয়ে বেশি ইনকাম জেনারেটকারী ফরম্যাট:
          </p>
          <ol className="list-decimal pl-4 space-y-2 text-slate-300">
            <li><a href="https://monetag.com" target="_blank" rel="noreferrer" className="text-sky-400 underline font-medium">Monetag.com</a>-এ একটি ফ্রি Publisher Account খুলুন।</li>
            <li>ড্যাশবোর্ডের বাম পাশের মেন্যু থেকে <strong>"Direct Links"</strong> (বা SmartLinks) সেকশনে যান।</li>
            <li><strong>"Add Direct Link"</strong> বাটনে ক্লিক করে একটি নতুন স্মার্টলিংক জেনারেট করুন।</li>
            <li>জেনারেট হওয়া লিংকটি (যেমন: <code className="text-emerald-300 bg-slate-900 px-1.5 py-0.5 rounded">https://otieupt.com/4/xxxxxxx</code>) কপি করে বটের <code className="text-emerald-300 bg-slate-900 px-1.5 py-0.5 rounded">MONETAG_LINK</code>-এ বসান।</li>
          </ol>
          <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-emerald-300">
            💡 <strong>টিপস:</strong> যখনই ইউজার বাংলায় বিবরণ পড়ে "ভিডিও দেখুন" বাটনে চাপবে, সাথে সাথে মনেট্যাগ স্মার্টলিংকের মাধ্যমে ট্রাফিক মনিটাইজ হবে এবং আপনার ড্যাশবোর্ডে ডলার জমা হবে!
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: '৫. বট চালু ও ব্যাকগ্রাউন্ডে হোস্ট করার নিয়ম',
      icon: Server,
      content: (
        <div className="space-y-3 text-xs leading-relaxed text-slate-300">
          <p>
            আপনার পিসিতে, ভিপিএস (VPS) সার্ভারে বা মোবাইলে (Termux) বটটি যেভাবে চালু করবেন:
          </p>

          <div className="space-y-2">
            <span className="font-semibold text-slate-200">কমান্ডসমূহ (Linux / Ubuntu VPS / Mac):</span>
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl font-mono text-[11px] text-slate-200 space-y-1">
              <div><span className="text-slate-500"># রিপোজিটরি তৈরি ও ফাইল সেভ করুন</span></div>
              <div>mkdir telegram_bot && cd telegram_bot</div>
              <div><span className="text-slate-500"># ভার্চুয়াল এনভায়রনমেন্ট তৈরি</span></div>
              <div>python3 -m venv venv</div>
              <div>source venv/bin/activate</div>
              <div><span className="text-slate-500"># ডিপেনডেন্সি ইনস্টল</span></div>
              <div>pip install -r requirements.txt</div>
              <div><span className="text-slate-500"># বট চালু করুন</span></div>
              <div>python3 bot.py</div>
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <span className="font-semibold text-slate-200">📱 Android মোবাইলে (Termux):</span>
            <p className="text-slate-400">
              Termux অ্যাপ ওপেন করে <code className="text-sky-300 bg-slate-900 px-1 py-0.5 rounded">pkg update && pkg install python git</code> রান করুন। এরপর <code className="text-sky-300 bg-slate-900 px-1 py-0.5 rounded">pip install pyrogram tgcrypto google-generativeai python-dotenv</code> ইনস্টল করে <code className="text-sky-300 bg-slate-900 px-1 py-0.5 rounded">python bot.py</code> রান করুন।
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="font-semibold text-slate-100 text-sm">Step-by-Step Setup & Deployment Guide</h3>
          <p className="text-xs text-slate-400">টেলিগ্রাম বট ও মনেট্যাগ স্মার্টলিংক সেটআপ করার সম্পূর্ণ বাংলা গাইড</p>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>৫টি সহজ ধাপ</span>
        </div>
      </div>

      {/* Steps Pill Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {steps.map((step) => {
          const Icon = step.icon;
          const isCurrent = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col gap-1.5 ${
                isCurrent
                  ? 'bg-sky-950/60 border-sky-500 text-white shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-sky-400' : 'text-slate-500'}`} />
                <span className="text-[10px] font-mono font-semibold">ধাপ {step.id}</span>
              </div>
              <span className="text-xs font-medium truncate font-bengali">{step.title.split('.')[1]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Content */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 shadow-inner">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center">
            {activeStep}
          </span>
          <h4 className="font-semibold text-sm text-slate-100 font-bengali">
            {steps[activeStep - 1].title}
          </h4>
        </div>
        
        {steps[activeStep - 1].content}

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-800/60">
          <button
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            className="text-xs px-3 py-1.5 bg-slate-900 text-slate-400 hover:text-white rounded-lg disabled:opacity-30 transition-colors"
          >
            পূর্ববর্তী ধাপ
          </button>
          <button
            onClick={() => setActiveStep((prev) => Math.min(5, prev + 1))}
            disabled={activeStep === 5}
            className="text-xs px-3.5 py-1.5 bg-sky-600 text-white hover:bg-sky-500 rounded-lg disabled:opacity-30 transition-colors flex items-center gap-1 font-medium"
          >
            <span>পরবর্তী ধাপ</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Monetization Best Practices Box */}
      <div className="p-4 bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-950 border border-emerald-800/30 rounded-xl space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
          <DollarSign className="w-4 h-4" />
          <span>টেলিগ্রাম বট দিয়ে সর্বোচ্চ মনেট্যাগ ইনকামের টিপস (High CPM Strategy)</span>
        </div>
        <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4 leading-relaxed font-bengali">
          <li><strong>ন্যাচারাল ইউজার ফ্লো:</strong> এআই যখন অ্যানিমে বা ড্রামার উত্তেজনাকর সারসংক্ষেপ দেয়, তখন ইউজারের পর্ব দেখার আগ্রহ তুঙ্গে থাকে। ফলে বাটনে ক্লিক রেট (CTR) ৬০%-৮০% পর্যন্ত হতে পারে!</li>
          <li><strong>চ্যানেল সাবস্ক্রিপশন যোগ করুন:</strong> বটের সাথে একটি টেলিগ্রাম চ্যানেল যুক্ত করে নিয়মিত অ্যানিমে বা নাটকের আপডেট পোস্ট করলে স্থায়ী অডিয়েন্স তৈরি হয়।</li>
          <li><strong>গুগল জেমিনি এআই কোটা:</strong> Gemini 1.5 Flash মডেল প্রতি মিনিটে ১৫টি ফ্রি রিকোয়েস্ট সাপোর্ট করে, যা প্রাথমিক বটের জন্য সম্পূর্ণ বিনামূল্যে কাজ করার জন্য আদর্শ।</li>
        </ul>
      </div>
    </div>
  );
};
