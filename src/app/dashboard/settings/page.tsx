import { redirect } from "next/navigation";

import { DAILY_FREE_LIMIT } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

import { ProfileClient } from "./profile-client";

export default async function SettingsPage() {
    const supabase = await createClient();

    // 1. Проверяем авторизацию
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    // 2. Считаем количество генераций за текущие сутки (лимит бесплатного тарифа — дневной)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const { count, error } = await supabase
        .from("emails")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", startOfDay.toISOString());

    if (error) {
        console.error("Ошибка при получении лимитов:", error);
    }

    // 3. Лимит сбрасывается в начале следующих суток
    const resetDate = new Date(startOfDay);
    resetDate.setDate(resetDate.getDate() + 1);

    // 4. Формируем актуальные данные подписки (usage и limit синхронизированы с генерацией)
    const subscription = {
        plan: "Free", // В будущем будем брать из таблицы профилей/подписок
        usage: count ?? 0,
        limit: DAILY_FREE_LIMIT,
        resetDate: resetDate.toLocaleDateString(),
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-6 sm:p-10">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Шапка кабинета */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Личный кабинет</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Управление вашим профилем, подпиской и безопасностью аккаунта.
                    </p>
                </div>

                {/* Клиентская интерактивная часть */}
                <ProfileClient user={user} subscription={subscription} />
            </div>
        </div>
    );
}
