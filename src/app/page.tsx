import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col gap-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-center">
                    AI Email Generator MVP
                </h1>
                <p className="text-muted-foreground text-center max-w-md">
                    Бортовой журнал: Среда стилизации и UI-компонентов успешно настроена.
                </p>
                <Button size="lg">Начать бесплатно</Button>
            </div>
        </main>
    );
}
