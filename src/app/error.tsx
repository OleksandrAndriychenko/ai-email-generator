"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Здесь в продакшене можно отправлять логи в Sentry / Logtail
        console.error("Глобальная ошибка приложения:", error);
    }, [error]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-foreground">
            <div className="z-10 max-w-md w-full items-center text-center font-mono text-sm flex flex-col gap-6 p-8 border rounded-lg bg-card shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight text-destructive">
                    Что-то пошло не так!
                </h2>
                <p className="text-muted-foreground text-sm">
                    Произошла непредвиденная ошибка на стороне сервера или при выполнении запроса.
                    Попробуйте обновить модуль.
                </p>
                <div className="flex gap-4 w-full justify-center">
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        Обновить страницу
                    </Button>
                    <Button onClick={() => reset()}>Повторить попытку</Button>
                </div>
            </div>
        </main>
    );
}
