import { z } from "zod";

// Схема валидации для запроса генерации письма
export const generateEmailSchema = z.object({
    prompt: z
        .string()
        .min(1, "Опишите, о чем должно быть письмо")
        .max(1000, "Описание слишком длинное (максимум 1000 символов)"),
    tone: z.string().min(1, "Выберите тон письма"),
    length: z.string().min(1, "Выберите длину письма"),
    language: z.string().min(1, "Выберите язык письма"),
});

// Выводим TypeScript тип из схемы Zod для использования на фронтенде
export type GenerateEmailInput = z.infer<typeof generateEmailSchema>;
