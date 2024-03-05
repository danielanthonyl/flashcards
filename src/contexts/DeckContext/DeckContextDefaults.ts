import { Deck } from "../../api/entities/Deck";

export interface DeckDefaultValue {
  createDeck(deck: Omit<Deck, "id">): Promise<Deck | null>;
  readDeckById(deckId: string): Promise<Deck | null>;
  readDecks(): Promise<Deck[] | null>;
  syncReadDeckById(deckId: string): Deck | null;
  decks: Deck[];
}

export const deckDefaultValue: DeckDefaultValue = {
  createDeck: () => new Promise((resolve) => resolve(null)),
  readDeckById: () => new Promise((resolve) => resolve(null)),
  readDecks: () => new Promise((resolve) => resolve(null)),
  syncReadDeckById: () => null,
  decks: [],
};
