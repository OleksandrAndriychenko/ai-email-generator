// Единый источник правды для допустимых параметров генерации.
// Используется и на клиенте (нормализация формы), и на сервере (валидация экшена).

export const TONES = ["professional", "casual", "friendly"] as const;
export const LENGTHS = ["short", "medium", "long"] as const;
export const LANGUAGES = ["english", "ukrainian", "spanish"] as const;

export type Tone = (typeof TONES)[number];
export type Length = (typeof LENGTHS)[number];
export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_TONE: Tone = "professional";
export const DEFAULT_LENGTH: Length = "medium";
export const DEFAULT_LANGUAGE: Language = "english";

// Лимит генераций в сутки на бесплатном тарифе (согласован с лендингом и настройками).
export const DAILY_FREE_LIMIT = 5;

// Возвращает список значений с нормализацией к нижнему регистру и безопасным фолбэком.
export const normalizeOption = <T extends string>(
    value: string | undefined,
    allowed: readonly T[],
    fallback: T
): T => {
    const normalized = (value || fallback).toLowerCase();
    return (allowed as readonly string[]).includes(normalized) ? (normalized as T) : fallback;
};
