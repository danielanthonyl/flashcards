import { Deck } from "../../api/entities/Deck";

export interface DeckDefaultValue {
    createDeck(deck: Deck): Promise<void>;
    decks: Deck[]
}

export const deckDefaultValue: DeckDefaultValue ={
    createDeck() {return new Promise((resolve) => resolve())}, 
    decks: []
}