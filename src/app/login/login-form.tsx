"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { login } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function LoginForm() {
    const searchParams = useSearchParams();

    // Получаем параметры ошибки напрямую из URL на клиенте
    const error = searchParams.get("error");
    const message = searchParams.get("message");

    const decodedError = error ? decodeURIComponent(error) : null;
    const decodedMessage = message ? decodeURIComponent(message) : null;

    return (
        <Card className="w-full max-w-md border-muted bg-card">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
                <CardDescription>Enter your email to sign in to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={login} className="space-y-4">
                    {decodedError && (
                        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive animate-in fade-in-50 duration-200">
                            {decodedError}
                        </div>
                    )}
                    {decodedMessage && (
                        <div className="rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500 animate-in fade-in-50 duration-200">
                            {decodedMessage}
                        </div>
                    )}
                    <div className="space-y-2">
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            required
                            className="bg-background"
                        />
                    </div>
                    <div className="space-y-2">
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            className="bg-background"
                        />
                    </div>
                    <Button type="submit" className="w-full font-medium">
                        Sign In
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="underline hover:text-primary">
                        Register
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
