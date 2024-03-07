export interface Media {
  id: string;
  url: string;
  file?: File;
  name: string;
}

export interface Medias {
  sound: Media;
  image: Media;
}
