import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Навигационная панель */}
            <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-background/95 backdrop-blur sticky top-0 z-50">
                <Link
                    className="flex items-center justify-center font-mono font-bold text-lg tracking-tight"
                    href="#"
                >
                    ⚡ AI.Email
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4 text-muted-foreground hover:text-foreground"
                        href="#features"
                    >
                        Возможности
                    </Link>
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4 text-muted-foreground hover:text-foreground"
                        href="#pricing"
                    >
                        Тарифы
                    </Link>
                    <Link
                        className="text-sm font-medium hover:underline underline-offset-4 text-muted-foreground hover:text-foreground"
                        href="#faq"
                    >
                        FAQ
                    </Link>
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/login">Войти</Link>
                    </Button>
                    <Button asChild size="sm">
                        <Link href="/register">Начать бесплатно</Link>
                    </Button>
                </nav>
            </header>

            <main className="flex-1">
                {/* 1. HERO SECTION */}
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex flex-col items-center justify-center border-b">
                    <div className="container px-4 md:px-6 flex flex-col items-center gap-6 text-center max-w-4xl">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
                            Генерируйте идеальные письма за секунды с Gemini AI
                        </h1>
                        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl">
                            Забудьте о писательском блоке. Наш умный ассистент мгновенно адаптирует
                            тон, длину и язык письма под любые бизнес-задачи.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 min-w-[200px]">
                            <Button asChild size="lg" className="h-12 px-8 text-base">
                                <Link href="/register">Начать бесплатно</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="h-12 px-8 text-base"
                            >
                                <Link href="#features">Узнать больше</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* 2. FEATURES SECTION */}
                <section
                    id="features"
                    className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 border-b flex flex-col items-center"
                >
                    <div className="container px-4 md:px-6 max-w-5xl">
                        <div className="text-center space-y-4 mb-12">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Почему именно AI.Email?
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Все необходимые инструменты для ускорения вашей деловой переписки в
                                одном интерфейсе.
                            </p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <Card className="bg-background">
                                <CardHeader>
                                    <CardTitle className="text-xl">Мгновенный стриминг</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">
                                        На базе передовой модели Gemini 2.5 Flash текст генерируется
                                        плавно и без задержек.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-background">
                                <CardHeader>
                                    <CardTitle className="text-xl">Гибкая стилизация</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">
                                        Выбирайте деловой, дружелюбный или извиняющийся тон.
                                        Настраивайте длину под контекст.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-background">
                                <CardHeader>
                                    <CardTitle className="text-xl">История и регенерация</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">
                                        Ни одно письмо не потеряется. Восстанавливайте старые
                                        промпты и перегенерируйте в один клик.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* 3. PRICING SECTION */}
                <section
                    id="pricing"
                    className="w-full py-12 md:py-24 lg:py-32 border-b flex flex-col items-center"
                >
                    <div className="container px-4 md:px-6 max-w-4xl">
                        <div className="text-center space-y-4 mb-12">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Простые и честные тарифы
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Начните бесплатно, переходите на Pro, когда потребуется безлимит.
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2">
                            {/* Free Plan */}
                            <Card className="relative flex flex-col justify-between">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Free</CardTitle>
                                    <CardDescription>Идеально для теста</CardDescription>
                                    <div className="text-3xl font-bold mt-4">
                                        0 ₽{" "}
                                        <span className="text-sm font-normal text-muted-foreground">
                                            / всегда
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1 space-y-4">
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li>✓ 5 генераций писем в сутки</li>
                                        <li>✓ Модель Gemini 2.5 Flash</li>
                                        <li>✓ Базовая история сохранений</li>
                                    </ul>
                                </CardContent>
                                <div className="p-6 pt-0">
                                    <Button asChild variant="outline" className="w-full">
                                        <Link href="/register">Выбрать Free</Link>
                                    </Button>
                                </div>
                            </Card>
                            {/* Pro Plan */}
                            <Card className="relative flex flex-col justify-between border-primary shadow-md">
                                <CardHeader className="pt-6 relative">
                                    <div className="absolute top-6 right-6 bg-primary text-primary-foreground text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold shadow-sm">
                                        Популярно
                                    </div>
                                    <CardTitle className="text-2xl">Pro</CardTitle>
                                    <CardDescription>Для активной переписки</CardDescription>
                                    <div className="text-3xl font-bold mt-4">
                                        490 ₽{" "}
                                        <span className="text-sm font-normal text-muted-foreground">
                                            / месяц
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1 space-y-4">
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li>✓ Безлимитные генерации писем</li>
                                        <li>✓ Приоритетная скорость Gemini</li>
                                        <li>
                                            ✓ Полное управление историей (удаление и регенерация)
                                        </li>
                                        <li>✓ Поддержка 24/7</li>
                                    </ul>
                                </CardContent>
                                <div className="p-6 pt-0">
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full border-foreground/20 hover:border-foreground/40 bg-background text-foreground hover:bg-muted font-medium transition-colors"
                                    >
                                        <Link href="/register">Стать Pro</Link>
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* 4. FAQ SECTION */}
                <section
                    id="faq"
                    className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 flex flex-col items-center"
                >
                    <div className="container px-4 md:px-6 max-w-3xl">
                        <div className="text-center space-y-4 mb-12">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Часто задаваемые вопросы
                            </h2>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h4 className="font-semibold text-lg">
                                    Как работает кнопка «Перегенерировать»?
                                </h4>
                                <p className="text-muted-foreground text-sm">
                                    Она мгновенно возвращает все настройки выбранного ранее письма
                                    (текст запроса, тон, длину) обратно в форму генератора и плавно
                                    скроллит вас наверх. Вам остается только нажать кнопку отправки.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold text-lg">
                                    Какие лимиты на бесплатном тарифе?
                                </h4>
                                <p className="text-muted-foreground text-sm">
                                    Вы можете делать до 5 генераций в день. Счетчик обновляется
                                    каждые 24 часа. Каждое сгенерированное письмо можно скопировать
                                    или удалить из истории.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 lg:px-6 border-t bg-background">
                <p className="text-xs text-muted-foreground">
                    &copy; 2026 AI.Email Generator MVP. Все права защищены.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link
                        className="text-xs hover:underline underline-offset-4 text-muted-foreground"
                        href="#"
                    >
                        Условия использования
                    </Link>
                    <Link
                        className="text-xs hover:underline underline-offset-4 text-muted-foreground"
                        href="#"
                    >
                        Конфиденциальность
                    </Link>
                </nav>
            </footer>
        </div>
    );
}
