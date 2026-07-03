# AI Email Generator

Генератор деловых писем на базе Google Gemini. Пользователь описывает задачу,
выбирает тон, длину и язык — приложение генерирует готовое письмо и сохраняет
его в историю с возможностью копирования, повторной генерации и удаления.

## Стек

- **Next.js 16** (App Router, Server Actions, Proxy) + **React 19**
- **TypeScript** (strict)
- **Supabase** — авторизация (email/password) и хранение писем (Postgres + RLS)
- **Google Gemini** (`@google/genai`, модель `gemini-2.5-flash`)
- **Zustand** — состояние формы генератора
- **TanStack Query**, **Zod**, **Tailwind CSS 4** + **shadcn/ui**, **sonner**

## Структура

```
src/
├─ app/
│  ├─ page.tsx                 # Лендинг
│  ├─ login/ · register/       # Аутентификация
│  ├─ auth/actions.ts          # Server Actions: login / signup / signOut
│  ├─ dashboard/               # Генератор писем + история
│  │  ├─ actions.ts            # Server Action генерации (валидация + лимит)
│  │  └─ settings/             # Профиль, лимиты, смена пароля
│  └─ api/emails/[id]/route.ts # DELETE письма
├─ services/ai/                # Абстракция ИИ (AIService → GeminiService)
├─ lib/
│  ├─ supabase/                # browser / server / proxy клиенты + типы БД
│  ├─ constants.ts             # Тоны, длины, языки, дневной лимит
│  ├─ validations.ts           # Zod-схемы
│  └─ store.ts                 # Zustand store формы
└─ proxy.ts                    # Обновление сессии Supabase на каждом запросе
```

## Запуск

1. Установите зависимости:

    ```bash
    npm install
    ```

2. Создайте `.env.local` на основе `.env.example` и заполните значения:

    ```bash
    cp .env.example .env.local
    ```

    | Переменная                      | Назначение                                                  |
    | ------------------------------- | ----------------------------------------------------------- |
    | `NEXT_PUBLIC_SUPABASE_URL`      | URL проекта Supabase                                        |
    | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Публичный anon-ключ Supabase                                |
    | `GEMINI_API_KEY`                | Ключ Google Gemini (серверный, обязателен)                  |
    | `NEXT_PUBLIC_SITE_URL`          | Публичный адрес приложения (для ссылок подтверждения email) |

3. В Supabase должны существовать таблицы `emails` и `profiles` с включённым
   **RLS** (пользователь видит и изменяет только свои строки).

4. Запустите dev-сервер:

    ```bash
    npm run dev
    ```

    Откройте [http://localhost:3000](http://localhost:3000).

## Скрипты

| Команда         | Действие                 |
| --------------- | ------------------------ |
| `npm run dev`   | Dev-сервер (Turbopack)   |
| `npm run build` | Production-сборка        |
| `npm run start` | Запуск production-сборки |
| `npm run lint`  | ESLint                   |

## Лимиты

Бесплатный тариф ограничен `DAILY_FREE_LIMIT` генерациями в сутки
(см. [src/lib/constants.ts](src/lib/constants.ts)). Лимит проверяется на сервере
в экшене генерации и отображается в настройках.
