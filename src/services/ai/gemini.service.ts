import { GoogleGenAI } from "@google/genai";

import { AIService, GenerateEmailOptions } from "./ai.interface";

export class GeminiService implements AIService {
    private ai: GoogleGenAI;
    private modelName = "gemini-2.5-flash"; // Быстрая, дешевая и идеальная для текста модель в 2026

    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error(
                "Критическая ошибка: GEMINI_API_KEY не установлен в переменных окружения .env"
            );
        }
        // Инициализируем актуальный SDK
        this.ai = new GoogleGenAI({ apiKey });
    }

    private buildSystemPrompt(options: GenerateEmailOptions): string {
        return `You are a professional AI Email Writer. 
Generate an email based on the user request.
Strictly follow these constraints:
- Tone of voice: ${options.tone}
- Approximate length: ${options.length}
- Language of the response: ${options.language}

Output ONLY the final email text. Do not include any intros, outros, markdown code blocks (like \`\`\`text), or explanations.`;
    }

    async generateEmail(options: GenerateEmailOptions): Promise<string> {
        try {
            const response = await this.ai.models.generateContent({
                model: this.modelName,
                contents: options.prompt,
                config: {
                    systemInstruction: this.buildSystemPrompt(options),
                    temperature: 0.7,
                },
            });

            if (!response.text) {
                throw new Error("Модель вернула пустой ответ");
            }

            return response.text.trim();
        } catch (error) {
            console.error("Ошибка генерации в GeminiService:", error);
            throw new Error("Не удалось сгенерировать письмо через ИИ.");
        }
    }
}
