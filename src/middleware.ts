import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
    return await updateSession(request);
}

export const config = {
    matcher: [
        /*
         * Соответствует всем путям запросов, кроме:
         * - _next/static (статические файлы)
         * - _next/image (оптимизированные изображения)
         * - favicon.ico (иконка сайта)
         * - все файлы с расширениями (например, .svg, .png)
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
