import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-foreground">
            <div className="z-10 max-w-md w-full items-center text-center font-mono text-sm flex flex-col gap-6 p-8 border rounded-lg bg-card shadow-sm">
                <h2 className="text-4xl font-bold tracking-tight text-primary">404</h2>
                <h3 className="text-xl font-semibold">Страница не найдена</h3>
                <p className="text-muted-foreground text-sm">
                    К сожалению, запрашиваемая страница не существует или была перемещена по другому
                    адресу.
                </p>
                <Button asChild className="w-full">
                    <Link href="/">Вернуться на главную</Link>
                </Button>
            </div>
        </main>
    );
}
