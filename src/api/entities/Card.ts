import { Media } from "./Media";

export interface Card {
  id: string;
  deckId: string;
  explanation?: string;
  tip?: string;
  sound?: Media;
  image?: Media;
  answer: string;
}

export interface CardDTO {
  deckId: string;
  explanation?: string;
  tip?: string;
  soundId?: string;
  imageId?: string;
  answer: string;
}

