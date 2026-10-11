import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google Gemini Client for the web simulator
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Fallback summaries for popular titles when offline / rate-limited
const FALLBACK_SUMMARIES: Record<string, string> = {
  naruto: `🎬 **নারুটো (Naruto)**
🎭 **জনরা:** অ্যাকশন, অ্যাডভেঞ্চার, ফ্যান্টাসি, শোনেন
🌟 **রেটিং:** ৮.৩/১০ | সম্পূর্ণ (৭২০ পর্ব)

📖 **কাহিনির সারসংক্ষেপ:**
হিডেন লিফ ভিলেজের দুষ্টু অনাথ বালক নারুটো উজুমাকি, যার শরীরের ভেতরে ভয়ঙ্কর নাইন-টেলস ফক্স সিল করা। পুরো গ্রাম তাকে ঘৃণা করলেও নারুটোর স্বপ্ন একদিন সে গ্রামের সেরা নিনজা ও হোকাগে (Hokage) হবে। বন্ধুত্ব, আত্মত্যাগ ও অদম্য ইচ্ছাশক্তির এক অবিশ্বাস্য গল্প!

✨ **প্রধান চরিত্র:** নারুটো উজুমাকি, সাসুকে উচিহা, সাকুরা হারুনো, কাকাশি সেনসেই।
💡 **কেন দেখবেন:** অনুপ্রেরণাদায়ক গল্প এবং চোখ ধাঁধানো নিনজা ফাইট!`,

  doraemon: `🎬 **ডোরেমন (Doraemon)**
🎭 **জনরা:** কমেডি, সায়েন্স ফিকশন, অ্যাডভেঞ্চার, চিলড্রেন
🌟 **রেটিং:** ৮.২/১০ | ক্লাসিক জনপ্রিয়

📖 **কাহিনির সারসংক্ষেপ:**
২২ শতক থেকে আসা ভবিষ্যতের রোবট বিড়াল ডোরেমন, যে এসেছে অলস ও আনাড়ি বালক নোবিতার জীবনকে সহজ করতে। ডোরেমনের ৪ডি পকেট থেকে বের হয় জাদুকরী গ্যাজেট, যা নোবিতাকে প্রতিদিন নতুন মজার বিপদে ও রোমাঞ্চকর অভিজ্ঞতায় ফেলে দেয়।

✨ **প্রধান চরিত্র:** ডোরেমন, নোবিতা নোবি, শিজুকা, জিয়ান, সুনিও।
💡 **কেন দেখবেন:** ছোট-বড় সবার জন্য বিশুদ্ধ আনন্দ ও শৈশবের নস্টালজিয়া!`,

  "squid game": `🎬 **স্কুইড গেম (Squid Game)**
🎭 **জনরা:** থ্রিলার, ড্রামা, সাসপেন্স, সারভাইভাল
🌟 **রেটিং:** ৮.০/১০ | নেটফ্লিক্স মেগাহিট

📖 **কাহিনির সারসংক্ষেপ:**
ঋণে জর্জরিত ৪৫৬ জন হতাশাগ্রস্ত মানুষ এক গোপন সারভাইভাল গেমে অংশ নেয়, যেখানে পুরস্কার ৪৫.৬ বিলিয়ন ওন! কিন্তু খেলার প্রতিটি ধাপ আসলে শিশুদের খেলার মতো হলেও হারলেই নিশ্চিত মৃত্যু। মানব চরিত্রের অন্ধকার রূপ ও বেঁচে থাকার তীব্র লড়াইয়ের এক শ্বাসরুদ্ধকর ড্রামা।

✨ **প্রধান চরিত্র:** সং গি-হুন, চো সাং-উ, কাং সে-বিয়ক, দ্য ফ্রন্টম্যান।
💡 **কেন দেখবেন:** অপ্রত্যাশিত প্লট টুইস্ট এবং চরম উত্তেজনাপূর্ণ চিত্রনাট্য!`,

  "jujutsu kaisen": `🎬 **জুজুৎসু কায়সেন (Jujutsu Kaisen)**
🎭 **জনরা:** ডার্ক ফ্যান্টাসি, সুপারন্যাচারাল, অ্যাকশন
🌟 **রেটিং:** ৮.৬/১০ | বিশ্বজুড়ে বহুল প্রশংসিত

📖 **কাহিনির সারসংক্ষেপ:**
উচ্চ বিদ্যালয়ের ছাত্র ইউজি ইতাদোরি এক অভিশপ্ত আঙুল খেয়ে ভয়ঙ্কর অভিশাপের রাজা সুকুনার বাহক হয়ে ওঠে। তাকে মৃত্যুদণ্ড থেকে বাঁচাতে এবং মানবজাতিকে রক্ষা করতে জুজুৎসু হাই-তে ভর্তি করা হয়, যেখানে সে গোজো সাতোরুর অধীনে প্রশিক্ষণ নেয়।

✨ **প্রধান চরিত্র:** ইউজি ইতাদোরি, গোজো সাতোরু, মেগুমি ফুশিগুরো, নোবারা কুগিসাকি।
💡 **কেন দেখবেন:** বিশ্বমানের অ্যানিমেশন কোয়ালিটি এবং গোজো সাতোরুর অবিশ্বাস্য ক্যারিশমা!`
};

// API Endpoint to simulate Telegram Bot AI response in Bengali
app.post('/api/simulate-bot', async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      res.status(400).json({ error: 'Query is required' });
      return;
    }

    const trimmedQuery = query.trim();
    const normalizedKey = trimmedQuery.toLowerCase();

    // Check if Gemini API key exists
    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `You are a friendly Bengali entertainment expert assistant for a Telegram Bot.
The user requested info for the cartoon/anime/drama titled "${trimmedQuery}".
Provide a concise, captivating summary completely in natural Bengali (বাংলা) formatted for Telegram Markdown:
1. 🎬 নাম (Title in Bengali & English)
2. 🎭 জনরা (Genre)
3. 🌟 রেটিং ও জনপ্রিয়তা (Rating / Status)
4. 📖 কাহিনির সারসংক্ষেপ (Brief, thrilling 2-paragraph plot synopsis in Bengali)
5. ✨ প্রধান চরিত্রসমূহ (Main Characters)
6. 💡 কেন দেখবেন? (Why you should watch it)

Keep it within 200 words, spoiler-free, and engaging. Conclude with a warm Bengali invitation to watch the episode.`,
        });

        const text = response.text?.trim();
        if (text) {
          res.json({
            success: true,
            summary: text,
            source: 'gemini-ai'
          });
          return;
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, using smart fallback generator:', geminiError?.message || geminiError);
      }
    }

    // Smart fallback if API key is not present or failed
    for (const [key, fallbackText] of Object.entries(FALLBACK_SUMMARIES)) {
      if (normalizedKey.includes(key)) {
        res.json({
          success: true,
          summary: fallbackText,
          source: 'curated'
        });
        return;
      }
    }

    // Dynamic procedural fallback for any title in Bengali
    const genericBengaliResponse = `🎬 **${trimmedQuery}**
🎭 **জনরা:** অ্যাকশন, থ্রিলার ও ড্রামা
🌟 **রেটিং:** ৮.৪/১০ | অত্যন্ত প্রশংসিত

📖 **কাহিনির সারসংক্ষেপ:**
'${trimmedQuery}' বিশ্বজুড়ে দর্শক নন্দিত একটি অসাধারণ সিরিজ। চিত্তাকর্ষক প্লট, চমৎকার সিনেমাটোগ্রাফি ও চরিত্রগুলোর অনবদ্য অভিনয়ের মাধ্যমে গল্পটি শুরু থেকে শেষ পর্যন্ত দর্শকদের আটকে রাখে।

✨ **প্রধান আকর্ষণ:** দারুণ চিত্রনাট্য, চমকপ্রদ ব্যাকগ্রাউন্ড মিউজিক এবং স্মরণীয় ক্লাইম্যাক্স।
💡 **কেন দেখবেন:** আপনি যদি রোমাঞ্চকর ও হৃদয়স্পর্শী কাহিনি ভালোবাসেন, তবে এটি আপনার দেখার তালিকায় অবশ্যই রাখা উচিত!`;

    res.json({
      success: true,
      summary: genericBengaliResponse,
      source: 'smart-template'
    });
  } catch (err: any) {
    console.error('Server error in /api/simulate-bot:', err);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

// Mount Vite or serve static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Telegram Bot Studio server listening on port ${PORT}`);
  });
}

startServer();
