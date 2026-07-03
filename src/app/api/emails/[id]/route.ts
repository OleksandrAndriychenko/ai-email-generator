import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;
        const supabase = await createClient();

        // 1. Проверяем авторизацию пользователя
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: "Неавторизованный доступ" }, { status: 401 });
        }

        // 2. Удаляем запись, обязательно проверяя `user_id`, чтобы юзер не мог удалить чужое письмо
        const { error: dbError } = await supabase
            .from("emails")
            .delete()
            .eq("id", id)
            .eq("user_id", user.id);

        if (dbError) {
            throw dbError;
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Ошибка при удалении письма:", error);
        return NextResponse.json(
            { error: "Не удалось удалить письмо из базы данных" },
            { status: 500 }
        );
    }
}
