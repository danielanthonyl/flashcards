export interface Media {
  id: string;
  url: string;
  name: string;
}

export interface MediaDTO {
  file: File;
  url: string;
  name: string;
}


export interface Medias {
  sound: Media;
  image: Media;
}

