import Link from "next/link";
import { redirect } from "next/navigation";

import { signOutAction } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

import { generateEmail } from "./actions";
import { GeneratorFormClient } from "./generator-form-client";
import { HistoryCardClient } from "./history-card-client";

export default async function DashboardPage() {
    const supabase = await createClient();

    // Проверяем авторизацию. Если сессии нет — редирект на логин
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    // Запрашиваем историю писем текущего пользователя (сортируем по новизне).
    // RLS ограничивает выборку строками самого пользователя; limit защищает от
    // раздувания payload при большой истории.
    const { data: emails } = await supabase
        .from("emails")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

    return (
        <div className="min-h-screen bg-background text-foreground p-6 sm:p-10">
            <header className="max-w-6xl mx-auto mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">AI Email Generator</h1>
                    <p className="text-muted-foreground text-sm mt-1">Logged in as {user.email}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/settings">
                        <Button variant="ghost" size="sm">
                            Settings
                        </Button>
                    </Link>
                    {/* ИСПРАВЛЕНО: Теперь форма вызывает Server Action вместо перехода на кривой URL */}
                    <form action={signOutAction}>
                        <Button variant="outline" size="sm" type="submit">
                            Sign Out
                        </Button>
                    </form>
                </div>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Левая колонка: Клиентская форма генерации */}
                <div className="lg:col-span-1">
                    <GeneratorFormClient generateAction={generateEmail} />
                </div>

                {/* Правая колонка: История генераций */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-semibold tracking-tight">Generation History</h2>

                    {!emails || emails.length === 0 ? (
                        <Card className="border-dashed border-muted bg-transparent p-10 text-center text-muted-foreground">
                            No emails generated yet. Fill out the form to start.
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {/* КРИТИЧЕСКОЕ МЕСТО: передаем управление нашему новому компоненту */}
                            {emails.map((email) => (
                                <HistoryCardClient key={email.id} email={email} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
