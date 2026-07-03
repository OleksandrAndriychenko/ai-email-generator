"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/site-url";

export async function login(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }

    return redirect("/dashboard");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            // Перенаправляем пользователя обратно в приложение после подтверждения email
            emailRedirectTo: `${getSiteUrl()}/login`,
        },
    });

    if (error) {
        return redirect(`/register?error=${encodeURIComponent(error.message)}`);
    }

    return redirect("/login?message=Check your email to confirm registration");
}

// Новый экшен для безопасного выхода из системы
export async function signOutAction() {
    const supabase = await createClient();

    // 1. Стираем сессию на сервере Supabase (куки очистятся автоматически)
    await supabase.auth.signOut();

    // 2. Перенаправляем пользователя на страницу входа
    return redirect("/login");
}
