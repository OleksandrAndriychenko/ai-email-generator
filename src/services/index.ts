import { GeminiService } from "./ai/gemini.service";

// Экспортируем готовый инстанс сервиса для использования в API роутах
export const aiService = new GeminiService();
