import { Card } from "./Card";

export interface Deck {
    id: string;
    name: string;
    cards: string[],
    configuration: object
}

export interface DeckDTO {
    id: string;
    name: string;
    cards: Card[],
    configuration: object
}