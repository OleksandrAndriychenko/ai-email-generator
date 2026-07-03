"use server";

import { revalidatePath } from "next/cache";

import {
    DAILY_FREE_LIMIT,
    DEFAULT_LANGUAGE,
    DEFAULT_LENGTH,
    DEFAULT_TONE,
    LANGUAGES,
    LENGTHS,
    normalizeOption,
    TONES,
} from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { generateEmailSchema } from "@/lib/validations";
import { aiService } from "@/services";

export async function generateEmail(formData: FormData) {
    const supabase = await createClient();

    // 1. Проверяем авторизацию
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    // 2. Валидируем вход единой Zod-схемой (та же, что использует фронтенд)
    const parsed = generateEmailSchema.safeParse({
        prompt: formData.get("prompt"),
        tone: formData.get("tone"),
        length: formData.get("length"),
        language: formData.get("language"),
    });
    if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message ?? "Некорректные данные формы");
    }

    // 3. Нормализуем параметры к допустимому множеству (защита от подделки значений select)
    const prompt = parsed.data.prompt;
    const tone = normalizeOption(parsed.data.tone, TONES, DEFAULT_TONE);
    const length = normalizeOption(parsed.data.length, LENGTHS, DEFAULT_LENGTH);
    const language = normalizeOption(parsed.data.language, LANGUAGES, DEFAULT_LANGUAGE);

    // 4. Проверяем суточный лимит генераций (бесплатный тариф)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const { count } = await supabase
        .from("emails")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", startOfDay.toISOString());

    if ((count ?? 0) >= DAILY_FREE_LIMIT) {
        throw new Error(
            `Достигнут дневной лимит (${DAILY_FREE_LIMIT} писем). Попробуйте снова завтра.`
        );
    }

    // 5. Генерируем письмо через сервисный слой (единственный путь к ИИ)
    const result = await aiService.generateEmail({ prompt, tone, length, language });

    // 6. Сохраняем результат в базу данных Supabase
    const { error } = await supabase.from("emails").insert({
        user_id: user.id,
        prompt,
        tone,
        length,
        language,
        result,
    });

    if (error) {
        throw new Error(error.message);
    }

    // 7. Инвалидируем кэш дашборда для мгновенного обновления истории
    revalidatePath("/dashboard");
}
