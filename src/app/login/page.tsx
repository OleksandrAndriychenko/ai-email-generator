import { Suspense } from "react";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Suspense
                fallback={
                    <div className="text-sm text-muted-foreground animate-pulse">
                        Loading account form...
                    </div>
                }
            >
                <LoginForm />
            </Suspense>
        </div>
    );
}
