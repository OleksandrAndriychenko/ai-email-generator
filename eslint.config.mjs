import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
    // 1. Глобальные игноры (должны быть в самом начале отдельным объектом!)
    {
        ignores: [
            ".next/**/*",
            "node_modules/**/*",
            "dist/**/*",
            "prettier.config.js",
            "lint-staged.config.js"
        ],
    },
    // 2. Базовые рекомендуемые правила для JS и TypeScript
    ...tseslint.configs.recommended,
    {
        // 3. Настройки для файлов проекта
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            "@next/next": nextPlugin,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,
            
            // Разрешаем намеренное серверное логирование ошибок, но ловим случайные console.log
            "no-console": ["warn", { allow: ["error", "warn"] }],
            "@typescript-eslint/no-unused-vars": "error",
            "@typescript-eslint/no-explicit-any": "error",
        },
    },
    // 4. Отключаем конфликты с Prettier
    eslintConfigPrettier
);