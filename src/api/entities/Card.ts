export interface Media {
  url?: string;
  file?: File;
  name?: string;
}

export interface Card {
  explanation?: string;
  tip?: string;
  id: string;
  sound?: Media;
  image?: Media;
  answer: string;
}
