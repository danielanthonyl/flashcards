import { Card } from "../../api/entities/Card";

export interface CardContextDefaults {
  cards: Card[];
  readCards: () => Promise<Card[]>;
  createCard: (card: Omit<Card, "id">) => Promise<Card | null>;
  readCardById: (cardId: string) => Promise<Card | null>;
  updateCardById: (cardId: string, updateObject: Omit<Partial<Card>, 'id'>) => Promise<Card | null>;
}

export const cardContextDefaults: CardContextDefaults = {
  cards: [],
  readCards: () => new Promise((resolve) => resolve([])),
  createCard: () => new Promise((resolve) => resolve(null)),
  readCardById: () => new Promise((resolve) => resolve(null)),
  updateCardById: () => new Promise((resolve) => resolve(null)),
};
