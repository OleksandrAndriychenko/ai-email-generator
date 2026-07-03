"use client";

import { useState, ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    // Гарантируем создание QueryClient один раз на стороне клиента
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Отключаем автоматический перезапрос при фокусе окна, чтобы экономить ресурсы
                        refetchOnWindowFocus: false,
                        retry: 1,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* Настраиваем тостер для красивых уведомлений */}
            <Toaster position="top-right" richColors closeButton />
        </QueryClientProvider>
    );
}
