#!/bin/bash
# ====================================================================
# Auto-setup script for Telegram Anime & Drama AI Bot
# Supported OS: Ubuntu 20.04/22.04/24.04, Debian 11/12
# ====================================================================

set -e

echo "=========================================="
echo " Setting up Telegram Anime AI Bot..."
echo "=========================================="

# 1. Update packages
sudo apt update && sudo apt upgrade -y

# 2. Install Python3 and venv
sudo apt install -y python3 python3-pip python3-venv git

# 3. Create virtual environment
python3 -m venv venv
source venv/bin/activate

# 4. Install requirements
pip install --upgrade pip
pip install -r requirements.txt

# 5. Check if .env exists
if [ ! -f .env ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo "⚠️ Please edit .env with your credentials before starting!"
fi

echo "=========================================="
echo " Setup complete!"
echo " Run: source venv/bin/activate && python3 bot.py"
echo "=========================================="
