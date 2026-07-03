import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Providers from "./providers";

import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "AI Email Generator MVP",
    description: "Профессиональный генератор писем на базе ИИ",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="ru" className="dark">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
