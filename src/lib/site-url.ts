/**
 * Определяет публичный адрес приложения для ссылок в письмах подтверждения.
 *
 * Приоритет:
 * 1. NEXT_PUBLIC_SITE_URL          — явно заданный стабильный домен (рекомендуется)
 * 2. VERCEL_PROJECT_PRODUCTION_URL — стабильный прод-домен, Vercel проставляет сам
 * 3. VERCEL_URL                    — адрес конкретного деплоя (preview), fallback
 * 4. http://localhost:3000         — локальная разработка
 */
export function getSiteUrl(): string {
    const raw =
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.VERCEL_PROJECT_PRODUCTION_URL ||
        process.env.VERCEL_URL ||
        "http://localhost:3000";

    // Переменные Vercel приходят без протокола (например, "my-app.vercel.app")
    const withProtocol = raw.startsWith("http") ? raw : `https://${raw}`;

    // Убираем завершающий слэш, чтобы избежать двойного "//" при конкатенации
    return withProtocol.replace(/\/$/, "");
}
