"use server";

import { createClient } from "@/lib/supabase/server";
import { GoogleGenAI } from "@google/genai";
import { revalidatePath } from "next/cache";

// Инициализируем клиент Gemini, передавая ключ из переменных окружения
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateEmail(formData: FormData) {
    const supabase = await createClient();

    // Проверяем авторизацию пользователя
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const prompt = formData.get("prompt") as string;
    const tone = formData.get("tone") as string;
    const length = formData.get("length") as string;
    const language = formData.get("language") as string;

    let aiResult = "";

    try {
        // Запрос к модели gemini-2.5-flash
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Write an email based on this prompt: "${prompt}"`,
            config: {
                // Инструкции, определяющие контекст поведения ИИ
                systemInstruction: `You are an expert AI Email Generator. Your task is to write a high-quality email strictly matching these constraints:
- Tone: ${tone}
- Length/Structure: ${length}
- Output Language: ${language}
Do not include any explanations, alternative versions, or markdown wrappers like \`\`\`html. Output only the final email text with Subject and Body.`,
                temperature: 0.7,
            },
        });

        if (!response.text) {
            throw new Error("AI returned an empty response");
        }

        aiResult = response.text;
    } catch (aiError) {
        // eslint-disable-next-line no-console
        console.error("Gemini API Error:", aiError);
        throw new Error("Failed to generate email content via AI.");
    }

    // Сохраняем результат реальной генерации в базу данных Supabase
    const { error } = await supabase.from("emails").insert({
        user_id: user.id,
        prompt,
        tone,
        length,
        language,
        result: aiResult,
    });

    if (error) {
        throw new Error(error.message);
    }

    // Инвалидируем кэш дашборда для мгновенного обновления истории на клиенте
    revalidatePath("/dashboard");
}
