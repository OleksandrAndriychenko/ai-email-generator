import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { generateEmail } from "./actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default async function DashboardPage() {
    const supabase = await createClient();

    // Проверяем авторизацию. Если сессии нет — редирект на логин
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    // Запрашиваем историю писем текущего пользователя (сортируем по новизне)
    const { data: emails } = await supabase
        .from("emails")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="min-h-screen bg-background text-foreground p-6 sm:p-10">
            <header className="max-w-6xl mx-auto mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">AI Email Generator</h1>
                    <p className="text-muted-foreground text-sm mt-1">Logged in as {user.email}</p>
                </div>
                <form action="/auth/signout" method="post">
                    <Button variant="outline" size="sm">
                        Sign Out
                    </Button>
                </form>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Левая колонка: Форма генерации */}
                <div className="lg:col-span-1">
                    <Card className="border-muted bg-card sticky top-6">
                        <CardHeader>
                            <CardTitle className="text-xl">Generator Options</CardTitle>
                            <CardDescription>Customize your AI email parameters</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action={generateEmail} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        What should the email be about?
                                    </label>
                                    <Textarea
                                        name="prompt"
                                        placeholder="Ask client for a feedback regarding our last meeting..."
                                        required
                                        className="bg-background min-h-[100px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Tone</label>
                                    <Select name="tone" defaultValue="professional">
                                        <SelectTrigger className="bg-background">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="professional">
                                                Professional
                                            </SelectItem>
                                            <SelectItem value="friendly">Friendly</SelectItem>
                                            <SelectItem value="urgent">Urgent</SelectItem>
                                            <SelectItem value="apologetic">Apologetic</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Length</label>
                                    <Select name="length" defaultValue="medium">
                                        <SelectTrigger className="bg-background">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="short">Short</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="long">Long</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Language</label>
                                    <Select name="language" defaultValue="English">
                                        <SelectTrigger className="bg-background">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="English">English</SelectItem>
                                            <SelectItem value="Ukrainian">Ukrainian</SelectItem>
                                            <SelectItem value="Spanish">Spanish</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button type="submit" className="w-full font-medium">
                                    Generate Email
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Правая колонка: История генераций */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-semibold tracking-tight">Generation History</h2>

                    {!emails || emails.length === 0 ? (
                        <Card className="border-dashed border-muted bg-transparent p-10 text-center text-muted-foreground">
                            No emails generated yet. Fill out the form to start.
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {emails.map((email) => (
                                <Card key={email.id} className="border-muted bg-card">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start gap-4">
                                            <CardTitle className="text-base font-medium line-clamp-1">
                                                Prompt: {email.prompt}
                                            </CardTitle>
                                            <div className="flex gap-2 shrink-0">
                                                <span className="text-[11px] font-medium bg-muted px-2 py-0.5 rounded uppercase">
                                                    {email.tone}
                                                </span>
                                                <span className="text-[11px] font-medium bg-muted px-2 py-0.5 rounded uppercase">
                                                    {email.language}
                                                </span>
                                            </div>
                                        </div>
                                        <CardDescription>
                                            {new Date(email.created_at).toLocaleString()}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <pre className="whitespace-pre-wrap font-sans text-sm text-foreground bg-background p-4 rounded-md border border-muted/50">
                                            {email.result}
                                        </pre>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
