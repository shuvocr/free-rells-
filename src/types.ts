export interface BotConfig {
  apiId: string;
  apiHash: string;
  botToken: string;
  geminiModel: string;
  monetagLink: string;
  updateChannel: string;
  buttonText: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  inlineButtons?: Array<{
    text: string;
    url?: string;
    callback_data?: string;
  }>;
}
