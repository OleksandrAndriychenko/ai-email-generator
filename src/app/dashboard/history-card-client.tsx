"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useGeneratorStore } from "@/lib/store";
import type { Tables } from "@/lib/supabase/database.types";

import { CopyButton } from "./copy-button";

type EmailRecord = Tables<"emails">;

interface HistoryCardClientProps {
    email: EmailRecord;
}

export function HistoryCardClient({ email }: HistoryCardClientProps) {
    const setFormValues = useGeneratorStore((state) => state.setFormValues);
    const router = useRouter();

    const [isDeleting, setIsDeleting] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleRegenerate = () => {
        setFormValues({
            prompt: email.prompt,
            tone: email.tone,
            length: email.length || "medium",
            language: email.language,
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
        toast.info("Параметры успешно перенесены в генератор");
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`/api/emails/${email.id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error();

            toast.success("Письмо успешно удалено");
            setIsDialogOpen(false);

            // Сообщаем Next.js, что серверные данные изменились, и нужно переотрендерить историю
            router.refresh();
        } catch {
            toast.error("Не удалось удалить письмо. Попробуйте еще раз.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Card className="border-muted bg-card">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-base font-medium line-clamp-1">
                        Prompt: {email.prompt}
                    </CardTitle>
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="flex gap-2">
                            <span className="text-[11px] font-medium bg-muted px-2 py-0.5 rounded uppercase">
                                {email.tone}
                            </span>
                            <span className="text-[11px] font-medium bg-muted px-2 py-0.5 rounded uppercase">
                                {email.language}
                            </span>
                        </div>
                        <CopyButton text={email.result} />
                    </div>
                </div>
                <CardDescription className="flex justify-between items-center mt-1">
                    <span>
                        {email.created_at ? new Date(email.created_at).toLocaleString() : "—"}
                    </span>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
                            onClick={handleRegenerate}
                        >
                            Regenerate
                        </Button>

                        {/* Модальное окно подтверждения удаления */}
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-auto p-0 text-xs text-destructive hover:text-destructive/85 underline underline-offset-2"
                                >
                                    Delete
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete
                                        your generated email from our servers.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsDialogOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? "Deleting..." : "Delete"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <pre className="whitespace-pre-wrap font-sans text-sm text-foreground bg-background p-4 rounded-md border border-muted/50">
                    {email.result}
                </pre>
            </CardContent>
        </Card>
    );
}
