import { MediaDTO } from "./Media";

export interface Card {
  id: string;
  deckId: string;
  explanation?: string;
  tip?: string;
  soundId?: string;
  imageId?: string;
  answer: string;
}

export interface CardDTO {
  explanation?: string;
  tip?: string;
  sound?: MediaDTO;
  image?: MediaDTO;
  answer: string;
}

