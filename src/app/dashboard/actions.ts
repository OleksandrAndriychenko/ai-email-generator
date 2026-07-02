"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function generateEmail(formData: FormData) {
    const supabase = await createClient();

    // Получаем текущего пользователя
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const prompt = formData.get("prompt") as string;
    const tone = formData.get("tone") as string;
    const length = formData.get("length") as string;
    const language = formData.get("language") as string;

    // Временная заглушка генерации ИИ
    const mockResult = `[Generated ${tone} Email in ${language}]\n\nSubject: Regarding your request\n\nThank you for reaching out. Based on your prompt "${prompt}", we are happy to assist you with a ${length} response. Let us know if you need anything else!`;

    // Записываем в базу данных Supabase
    const { error } = await supabase.from("emails").insert({
        user_id: user.id,
        prompt,
        tone,
        length,
        language,
        result: mockResult,
    });

    if (error) {
        throw new Error(error.message);
    }

    // Сбрасываем кэш страницы дашборда, чтобы история обновилась мгновенно
    revalidatePath("/dashboard");
}
