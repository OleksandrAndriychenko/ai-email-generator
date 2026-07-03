"use server";

import { createClient } from "@/lib/supabase/server";

export async function updatePasswordAction(formData: FormData) {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!password || password.length < 6) {
        throw new Error("Пароль должен быть не менее 6 символов");
    }

    if (password !== confirmPassword) {
        throw new Error("Пароли не совпадают");
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        throw error;
    }
}
