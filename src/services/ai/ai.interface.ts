export interface GenerateEmailOptions {
    prompt: string;
    tone: string;
    length: string;
    language: string;
}

export interface AIService {
    generateEmail(options: GenerateEmailOptions): Promise<string>;
}
