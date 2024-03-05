export interface Card {
    explanation?: string;
    tip?: string;
    id: string;
    sound?: File | string;
    image?: File | string;
    answer: string;
}