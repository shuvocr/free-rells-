#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
=============================================================================
 Telegram Anime, Cartoon & Drama AI Bot with Monetag Monetization
=============================================================================
 Framework: Pyrogram (v2.x)
 AI Engine: Google Generative AI (Gemini 1.5 Flash)
 Features:
   - Warm greeting in Bengali for /start and /help commands
   - Automatic Bengali summaries & details for any Anime, Cartoon, or Drama
   - High-CTR Inline button with Monetag SmartLink (Direct Link)
   - Real-time typing indicators & friendly error handling
   - Configurable via .env file or direct variables
=============================================================================
"""

import os
import logging
from dotenv import load_dotenv
from pyrogram import Client, filters, enums
from pyrogram.types import (
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    Message
)
import google.generativeai as genai

# ---------------------------------------------------------------------------
# 1. Configuration & Placeholders
# ---------------------------------------------------------------------------
# Load environment variables from a .env file if available
load_dotenv()

# Telegram API Credentials (Get from https://my.telegram.org)
API_ID = int(os.getenv("API_ID", "12345678"))
API_HASH = os.getenv("API_HASH", "your_telegram_api_hash_here")

# Telegram Bot Token (Get from @BotFather on Telegram)
BOT_TOKEN = os.getenv("BOT_TOKEN", "1234567890:ABCdefGhIJKlmNoPQRsTUVwxyZ_example")

# Google Gemini API Key (Get free key from https://aistudio.google.com)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "your_google_gemini_api_key_here")

# Monetag Direct Link (SmartLink) (Get from https://monetag.com)
MONETAG_LINK = os.getenv("MONETAG_LINK", "https://otieupt.com/4/xxxxxxx")

# Secondary Channel / Support link (optional)
UPDATE_CHANNEL = os.getenv("UPDATE_CHANNEL", "https://t.me/Telegram")

# ---------------------------------------------------------------------------
# 2. Logging Setup
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - [%(levelname)s] - %(name)s - %(message)s"
)
logger = logging.getLogger("AnimeDramaBot")

# ---------------------------------------------------------------------------
# 3. Google Gemini AI Initialization
# ---------------------------------------------------------------------------
try:
    genai.configure(api_key=GEMINI_API_KEY)
    
    # Configure Generation Parameters
    generation_config = {
        "temperature": 0.7,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 1024,
    }

    # Initialize Gemini 1.5 Flash (or gemini-2.5-flash / gemini-1.5-flash-latest)
    gemini_model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
        system_instruction=(
            "You are a friendly Bengali entertainment expert assistant for a Telegram Bot. "
            "When the user mentions any anime, cartoon, movie, or drama title, provide an exciting, "
            "well-structured summary completely in standard Bengali (বাংলা). "
            "Format the response beautifully with clean Telegram Markdown: "
            "1. 🎬 নাম (Title in Bengali & English) "
            "2. 🎭 জনরা (Genre) "
            "3. 🌟 রেটিং ও জনপ্রিয়তা (Rating / Status) "
            "4. 📖 কাহিনির সারসংক্ষেপ (Brief, engaging 2-3 paragraph plot synopsis in Bengali) "
            "5. ✨ প্রধান চরিত্রসমূহ (Main Characters) "
            "6. 💡 কেন দেখবেন? (Why you should watch it) "
            "Keep it concise (within 300 words), enthusiastic, spoiler-free, and easy to read on mobile."
        )
    )
    logger.info("Google Gemini AI initialized successfully.")
except Exception as e:
    logger.error(f"Error configuring Gemini AI: {e}")
    gemini_model = None

# ---------------------------------------------------------------------------
# 4. Pyrogram Bot Client Initialization
# ---------------------------------------------------------------------------
app = Client(
    name="anime_drama_gemini_bot",
    api_id=API_ID,
    api_hash=API_HASH,
    bot_token=BOT_TOKEN
)

# ---------------------------------------------------------------------------
# 5. Helper Function: Get Monetag Inline Keyboard
# ---------------------------------------------------------------------------
def get_watch_keyboard(query_title: str = "") -> InlineKeyboardMarkup:
    """
    Returns an InlineKeyboardMarkup with the Monetag Direct Link.
    Label matches Requirement 3: '▶️ Watch Episode (ভিডিও দেখুন)'
    """
    buttons = [
        [
            InlineKeyboardButton(
                text="▶️ Watch Episode (ভিডিও দেখুন)",
                url=MONETAG_LINK
            )
        ],
        [
            InlineKeyboardButton(
                text="📢 আপডেট চ্যানেল (Join)",
                url=UPDATE_CHANNEL
            ),
            InlineKeyboardButton(
                text="🔍 নতুন খুঁজুন (Search)",
                switch_inline_query_current_chat=""
            )
        ]
    ]
    return InlineKeyboardMarkup(buttons)

# ---------------------------------------------------------------------------
# 6. /start Command Handler (Requirement 1: Warm Bengali Greeting)
# ---------------------------------------------------------------------------
@app.on_message(filters.command("start") & filters.private)
async def start_handler(client: Client, message: Message):
    user_name = message.from_user.first_name if message.from_user else "বন্ধু"
    user_mention = message.from_user.mention if message.from_user else user_name
    
    welcome_text = (
        f"আসসালামু আলাইকুম ও স্বাগতম, {user_mention}! 👋✨\n\n"
        "আমি আপনার **Anime, Cartoon ও Drama AI Assistant Bot**। 🎬🍿\n\n"
        "📌 **আমি কী করতে পারি?**\n"
        "যে কোনো কার্টুন, অ্যানিমে অথবা ড্রামার নাম লিখে আমাকে পাঠান! "
        "(যেমন: `Naruto`, `Doraemon`, `Jujutsu Kaisen`, `Squid Game`, `Ben 10`)\n\n"
        "আমি সাথে সাথে গুগল জেমিনি এআই দিয়ে বাংলায় গল্পটির সারসংক্ষেপ ও বিস্তারিত তথ্য দেব, "
        "এবং পর্ব দেখার সরাসরি লিঙ্ক সরবরাহ করব! 🚀\n\n"
        "💡 **শুরু করতে এখনই নিচে কোনো একটি নাম টাইপ করে সেন্ড করুন!**"
    )

    start_keyboard = InlineKeyboardMarkup([
        [
            InlineKeyboardButton(
                text="▶️ Watch Episode (ভিডিও দেখুন)",
                url=MONETAG_LINK
            )
        ],
        [
            InlineKeyboardButton(
                text="ℹ️ নির্দেশিকা (Help)",
                callback_data="help_callback"
            ),
            InlineKeyboardButton(
                text="📢 অফিসিয়াল চ্যানেল",
                url=UPDATE_CHANNEL
            )
        ]
    ])

    await message.reply_text(
        text=welcome_text,
        reply_markup=start_keyboard,
        disable_web_page_preview=True
    )
    logger.info(f"User {message.from_user.id} ({user_name}) started the bot.")

# ---------------------------------------------------------------------------
# 7. /help Command Handler
# ---------------------------------------------------------------------------
@app.on_message(filters.command("help") & filters.private)
async def help_handler(client: Client, message: Message):
    help_text = (
        "📖 **বটটি ব্যবহার করার নিয়মাবলি:**\n\n"
        "1️⃣ চ্যাটে যে কোনো কার্টুন, অ্যানিমে বা নাটকের নাম লিখে পাঠান।\n"
        "   _উদাহরণ:_ `Attack on Titan`, `Doraemon`, `Crash Landing on You`\n\n"
        "2️⃣ কয়েক সেকেন্ডের মধ্যে সম্পূর্ণ বিবরণ বাংলায় চলে আসবে।\n"
        "3️⃣ পর্ব দেখতে মেসেজের নিচের **'▶️ Watch Episode (ভিডিও দেখুন)'** বাটনে চাপ দিন।\n\n"
        "⚠️ কোনো সমস্যা হলে আমাদের সাপোর্ট চ্যানেলে যোগাযোগ করুন।"
    )
    
    await message.reply_text(
        text=help_text,
        reply_markup=get_watch_keyboard(),
        disable_web_page_preview=True
    )

# ---------------------------------------------------------------------------
# 8. /ping Command Handler (Health Check)
# ---------------------------------------------------------------------------
@app.on_message(filters.command("ping") & filters.private)
async def ping_handler(client: Client, message: Message):
    await message.reply_text("🏓 **Pong!** Bot is online and active! 🚀")

# ---------------------------------------------------------------------------
# 9. Callback Query Handler (Inline Buttons)
# ---------------------------------------------------------------------------
@app.on_callback_query(filters.regex("help_callback"))
async def callback_help(client: Client, callback_query):
    help_text = (
        "💡 **সহায়তা তথ্য:**\n\n"
        "শুধু যে কোনো অ্যানিমে বা কার্টুনের নাম লিখে সেন্ড করলেই এআই আপনাকে বিস্তারিত বাংলায় জানিয়ে দেবে।\n"
        "ভিডিও দেখতে নিচের বোতামটি ব্যবহার করুন!"
    )
    await callback_query.answer()
    await callback_query.message.edit_text(
        text=help_text,
        reply_markup=get_watch_keyboard()
    )

# ---------------------------------------------------------------------------
# 10. Query Handler for Anime/Cartoon/Drama (Requirements 2 & 3)
# ---------------------------------------------------------------------------
@app.on_message(filters.text & filters.private & ~filters.command(["start", "help", "ping"]))
async def query_handler(client: Client, message: Message):
    query = message.text.strip()
    
    # Ignore empty or overly short messages
    if len(query) < 2:
        await message.reply_text("অনুগ্রহ করে একটি সঠিক অ্যানিমে, কার্টুন বা ড্রামার নাম লিখুন। 😊")
        return

    logger.info(f"Received query: '{query}' from user {message.from_user.id}")

    # Send a temporary waiting message
    status_msg = await message.reply_text(
        f"🔍 **'{query}'** সম্পর্কে তথ্য প্রস্তুত করা হচ্ছে... অনুগ্রহ করে কয়েক সেকেন্ড অপেক্ষা করুন। ⏳"
    )

    # Show Telegram typing action in the chat
    await client.send_chat_action(
        chat_id=message.chat.id,
        action=enums.ChatAction.TYPING
    )

    try:
        # Check if Gemini API is properly configured
        if not gemini_model:
            await status_msg.edit_text(
                "⚠️ দুঃখিত, জেমিনি এআই কনফিগারেশন সমস্যা দেখা দিয়েছে। অনুগ্রহ করে অ্যাডমিনের সাথে যোগাযোগ করুন।"
            )
            return

        # Prompt sent to Gemini 1.5 Flash
        prompt = (
            f"Provide an engaging, informative, and spoiler-free overview of the cartoon, anime, or drama titled '{query}' "
            "completely written in standard natural Bengali (বাংলা). "
            "Include the title, genre, synopsis/plot overview, key appeal, and main characters. "
            "Conclude by warmly telling the user to click the button below to watch the episodes."
        )

        # Call Google Gemini API
        response = gemini_model.generate_content(prompt)
        ai_reply = response.text if response and response.text else None

        if not ai_reply:
            raise ValueError("Empty response received from Gemini AI.")

        # Ensure text is not exceeding Telegram 4096 character limit
        if len(ai_reply) > 3800:
            ai_reply = ai_reply[:3800] + "\n\n...(আরও জানতে নিচে ক্লিক করুন)"

        # Append Monetag call-to-action note
        final_caption = (
            f"{ai_reply}\n\n"
            "━━━━━━━━━━━━━━━━━━━━━━\n"
            "🎬 **পর্ব দেখতে নিচের বাটনে ক্লিক করুন:** 👇"
        )

        # Edit status message with Bengali summary and Monetag Inline Button
        await status_msg.edit_text(
            text=final_caption,
            reply_markup=get_watch_keyboard(query),
            disable_web_page_preview=True
        )

    except Exception as error:
        logger.error(f"Error handling query '{query}': {error}", exc_info=True)
        error_message = (
            f"❌ দুঃখিত, **'{query}'** সম্পর্কে তথ্য সংগ্রহ করতে একটি সমস্যা হয়েছে।\n\n"
            "দয়া করে বানানটি চেক করে আবার চেষ্টা করুন অথবা কিছু সময় পর ট্রাই করুন।\n\n"
            "👇 তবুও আপনি সরাসরি পর্ব দেখার চেষ্টা করতে পারেন:"
        )
        await status_msg.edit_text(
            text=error_message,
            reply_markup=get_watch_keyboard(query)
        )

# ---------------------------------------------------------------------------
# 11. Main Entrypoint
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    print("==================================================")
    print("  Telegram Anime & Drama AI Bot is Starting...    ")
    print("==================================================")
    print(f"• Monetag Link configured: {MONETAG_LINK}")
    print("• Waiting for user messages on Telegram...")
    
    # Run the Pyrogram Bot
    app.run()
