"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProfileClientProps {
    user: User;
    subscription: {
        plan: string;
        usage: number;
        limit: number;
        resetDate: string;
    };
}

import { updatePasswordAction } from "./actions";

export function ProfileClient({ user, subscription }: ProfileClientProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        try {
            await updatePasswordAction(formData);
            toast.success("Пароль успешно обновлен");
            (e.target as HTMLFormElement).reset();
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : "Ошибка при обновлении пароля";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const usagePercentage = (subscription.usage / subscription.limit) * 100;

    return (
        <Tabs defaultValue="profile" className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            {/* Левая колонка: Вертикальное навигационное меню */}
            <div className="md:col-span-1 space-y-4">
                <TabsList className="flex flex-col h-auto w-full bg-muted/30 border border-muted p-1 space-y-1 items-stretch justify-start">
                    <TabsTrigger
                        value="profile"
                        className="justify-start px-4 py-2.5 data-[state=active]:bg-card data-[state=active]:text-foreground"
                    >
                        Мой профиль
                    </TabsTrigger>
                    <TabsTrigger
                        value="subscription"
                        className="justify-start px-4 py-2.5 data-[state=active]:bg-card data-[state=active]:text-foreground"
                    >
                        Подписка и лимиты
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        className="justify-start px-4 py-2.5 data-[state=active]:bg-card data-[state=active]:text-foreground"
                    >
                        Безопасность
                    </TabsTrigger>
                </TabsList>

                <Link href="/dashboard" className="block">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-muted-foreground hover:text-foreground"
                    >
                        ← К генератору
                    </Button>
                </Link>
            </div>

            {/* Правая колонка: Контент вкладок (занимает 3/4 ширины) */}
            <div className="md:col-span-3">
                {/* ВКЛАДКА 1: ПРОФИЛЬ */}
                <TabsContent value="profile" className="mt-0">
                    <Card className="border-muted bg-card">
                        <CardHeader>
                            <CardTitle className="text-xl">Информация о пользователе</CardTitle>
                            <CardDescription>Основная информация вашего аккаунта</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-2">
                                <span className="text-sm font-medium text-muted-foreground">
                                    Email адрес
                                </span>
                                <Input value={user.email ?? ""} disabled className="bg-muted/30" />
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                <span className="text-sm font-medium text-muted-foreground">
                                    ID аккаунта
                                </span>
                                <span className="text-xs font-mono bg-muted p-2 rounded text-muted-foreground select-all break-all">
                                    {user.id}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                <span className="text-sm font-medium text-muted-foreground">
                                    Дата регистрации
                                </span>
                                <span className="text-sm text-foreground">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ВКЛАДКА 2: ПОДПИСКА */}
                <TabsContent value="subscription" className="mt-0">
                    <Card className="border-muted bg-card">
                        <CardHeader>
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <CardTitle className="text-xl">Тарифный план</CardTitle>
                                    <CardDescription>
                                        Управление лимитами и подпиской вашего SaaS
                                    </CardDescription>
                                </div>
                                <span className="text-xs font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full uppercase shrink-0">
                                    {subscription.plan}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Лимит генераций писем
                                    </span>
                                    <span className="font-medium">
                                        {subscription.usage} / {subscription.limit}
                                    </span>
                                </div>
                                <Progress value={usagePercentage} className="h-2" />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Лимиты обновятся автоматически: {subscription.resetDate}
                                </p>
                            </div>
                        </CardContent>
                        {subscription.plan === "Free" && (
                            <CardFooter className="border-t border-muted/50 pt-6">
                                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            Хотите снять ограничения?
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Перейдите на PRO план для безлимитной генерации и умных
                                            настроек тона.
                                        </p>
                                    </div>
                                    <Button className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-primary-foreground shrink-0">
                                        Активировать PRO
                                    </Button>
                                </div>
                            </CardFooter>
                        )}
                    </Card>
                </TabsContent>

                {/* ВКЛАДКА 3: БЕЗОПАСНОСТЬ */}
                <TabsContent value="security" className="mt-0">
                    <form onSubmit={handlePasswordUpdate}>
                        <Card className="border-muted bg-card">
                            <CardHeader>
                                <CardTitle className="text-xl">Смена пароля</CardTitle>
                                <CardDescription>
                                    Задайте новый пароль для доступа к личному кабинету
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-medium text-muted-foreground"
                                    >
                                        Новый пароль
                                    </label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Минимум 6 символов"
                                        required
                                        className="bg-background"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="text-sm font-medium text-muted-foreground"
                                    >
                                        Подтвердите пароль
                                    </label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Повторите пароль"
                                        required
                                        className="bg-background"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="border-t border-muted/50 pt-6 justify-end">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? "Обновление..." : "Сохранить пароль"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>
            </div>
        </Tabs>
    );
}
