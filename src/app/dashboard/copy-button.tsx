"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
    text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);

            // Возвращаем исходную иконку через 2 секунды
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            className={`h-8 px-2.5 transition-all duration-200 ${
                isCopied
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/15 hover:text-emerald-500"
                    : "border-muted bg-background hover:bg-muted"
            }`}
            onClick={handleCopy}
            title="Copy email to clipboard"
            aria-label="Copy email to clipboard"
        >
            {isCopied ? (
                <div className="flex items-center gap-1.5 text-xs font-medium">
                    {/* Иконка Галочки */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                        />
                    </svg>
                    <span>Copied!</span>
                </div>
            ) : (
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
                    {/* Иконка Копирования */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="h-4 w-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125h-1.125c-.621 0-1.125-.504-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.16-7.5-8.875a9.06 9.06 0 0 0-1.5-.124m7.5 10.376h-3.375a1.125 1.125 0 0 1-1.125-1.125V11.25m-1.5 1.5H3"
                        />
                    </svg>
                    <span>Copy</span>
                </div>
            )}
        </Button>
    );
}
