import { create } from "zustand";

import { DEFAULT_LANGUAGE, DEFAULT_LENGTH, DEFAULT_TONE } from "@/lib/constants";
import { GenerateEmailInput } from "@/lib/validations";

interface GeneratorState {
    // Состояние полей формы
    formValues: GenerateEmailInput;
    // Флаг того, идет ли генерация прямо сейчас
    isGenerating: boolean;

    // Экшены для изменения состояния
    setFormValues: (values: Partial<GenerateEmailInput>) => void;
    setIsGenerating: (generating: boolean) => void;
    resetForm: () => void;
}

const defaultValues: GenerateEmailInput = {
    prompt: "",
    tone: DEFAULT_TONE,
    length: DEFAULT_LENGTH,
    language: DEFAULT_LANGUAGE,
};

export const useGeneratorStore = create<GeneratorState>((set) => ({
    formValues: defaultValues,
    isGenerating: false,

    // Позволяет обновлять как всю форму, так и отдельные поля (например, только prompt)
    setFormValues: (values) =>
        set((state) => ({
            formValues: { ...state.formValues, ...values },
        })),

    setIsGenerating: (generating) => set({ isGenerating: generating }),

    resetForm: () => set({ formValues: defaultValues, isGenerating: false }),
}));
