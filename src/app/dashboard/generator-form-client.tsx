"use client";

import { useRef } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    DEFAULT_LANGUAGE,
    DEFAULT_LENGTH,
    DEFAULT_TONE,
    LANGUAGES,
    LENGTHS,
    normalizeOption,
    TONES,
} from "@/lib/constants";
import { useGeneratorStore } from "@/lib/store";

import { SubmitButton } from "./submit-button";

interface GeneratorFormClientProps {
    generateAction: (formData: FormData) => Promise<void>;
}

export function GeneratorFormClient({ generateAction }: GeneratorFormClientProps) {
    const { formValues, setFormValues } = useGeneratorStore();
    const formRef = useRef<HTMLFormElement>(null);

    const handleAction = async (formData: FormData) => {
        await generateAction(formData);
        // Мягко очищаем только поле промпта после отправки, сохраняя настройки тона и языка
        setFormValues({ prompt: "" });
        formRef.current?.reset();
    };

    // Нормализуем значения из стора к допустимым (единый источник — @/lib/constants)
    const currentTone = normalizeOption(formValues.tone, TONES, DEFAULT_TONE);
    const currentLength = normalizeOption(formValues.length, LENGTHS, DEFAULT_LENGTH);
    const currentLanguage = normalizeOption(formValues.language, LANGUAGES, DEFAULT_LANGUAGE);

    return (
        <Card className="border-muted bg-card sticky top-6">
            <CardHeader>
                <CardTitle className="text-xl">Generator Options</CardTitle>
                <CardDescription>Customize your AI email parameters</CardDescription>
            </CardHeader>
            <CardContent>
                <form ref={formRef} action={handleAction} className="space-y-5">
                    {/* ПОЛЕ 1: ПРОМПТ */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            What should the email be about?
                        </label>
                        <Textarea
                            name="prompt"
                            placeholder="Ask client for a feedback regarding our last meeting..."
                            required
                            value={formValues.prompt}
                            onChange={(e) => setFormValues({ prompt: e.target.value })}
                            className="bg-background min-h-[100px]"
                        />
                    </div>

                    {/* ПОЛЕ 2: ТОН */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tone</label>
                        <Select
                            name="tone"
                            value={currentTone}
                            onValueChange={(value) => setFormValues({ tone: value })}
                        >
                            <SelectTrigger className="bg-background w-full">
                                <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="professional">Professional</SelectItem>
                                <SelectItem value="casual">Casual</SelectItem>
                                <SelectItem value="friendly">Friendly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* ПОЛЕ 3: ДЛИНА ПИСЬМА */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Length</label>
                        <Select
                            name="length"
                            value={currentLength}
                            onValueChange={(value) => setFormValues({ length: value })}
                        >
                            <SelectTrigger className="bg-background w-full">
                                <SelectValue placeholder="Select length" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="short">Short</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="long">Long</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* ПОЛЕ 4: ЯЗЫК */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Language</label>
                        <Select
                            name="language"
                            value={currentLanguage}
                            onValueChange={(value) => setFormValues({ language: value })}
                        >
                            <SelectTrigger className="bg-background w-full">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* Перевели значения value в нижний регистр для точного совпадения со стором */}
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="ukrainian">Ukrainian</SelectItem>
                                <SelectItem value="spanish">Spanish</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    );
}
