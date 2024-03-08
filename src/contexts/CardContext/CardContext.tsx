import { ReactNode, createContext, useCallback, useMemo, useState } from "react";
import { CardContextDefaults, cardContextDefaults } from "./CardContextDefaults";
import { readCollection } from "../../api/repository/readCollection";
import { ECollectionNames } from "../../api/repository/enums/ECollectionNames";
import { Card, CardDTO } from "../../api/entities/Card";
import { uploadMedia } from "../../api/repository/uploadMedia";
import { EBucketDirectories } from "../../api/repository/enums/EBucketDirectories";
import { createDocument } from "../../api/repository/createDocument";
import { readDocument } from "../../api/repository/readDocument";
import { updateDocument } from "../../api/repository/updateDocument";
import { Media, Medias } from "../../api/entities/Media";
import { Deck } from "../../api/entities/Deck";

export interface CardContextProviderProps {
  children: ReactNode;
}

export const CardContext = createContext(cardContextDefaults);

export const CardContextProvider = ({ children }: CardContextProviderProps) => {
  const [cards, setCards] = useState<Card[]>([]);

  const updateMediasUrl = async ({ image, sound }: Partial<Omit<Card, "id">>) => {
    const createdMedias: Medias = {
      sound: null,
      image: null,
    };

    if (sound) {
      const { file, ...soundRest } = sound;
      const url = await uploadMedia(file, EBucketDirectories.SOUND);
      createdMedias.sound = await createDocument<Omit<Media, "id">, Media>(ECollectionNames.MEDIA, {
        ...soundRest,
        url,
      });
    }

    if (image) {
      const { file, ...imageRest } = image;
      const url = await uploadMedia(file, EBucketDirectories.IMAGE);
      createdMedias.image = await createDocument<Omit<Media, "id">, Media>(ECollectionNames.MEDIA, {
        ...imageRest,
        url,
      });
    }

    return createdMedias;
  };

  const readCards = useCallback(async () => {
    const cardCollection = await readCollection<Card>(ECollectionNames.CARD);
    setCards(cardCollection);

    return cardCollection;
  }, []);

  const createCard = useCallback(async (card: Omit<Card, "id">, deckId: string): Promise<Card> => {
    const { image, sound, ...rest } = card;
    const { sound: updatedSound, image: updatedImage } = await updateMediasUrl({ image, sound });

    const createdCard = await createDocument<CardDTO, CardDTO>(ECollectionNames.CARD, {
      ...rest,
      soundId: updatedSound.id,
      imageId: updatedImage.id,
      deckId,
    });

    const deck = await readDocument<Deck>(ECollectionNames.DECK, deckId);
    await updateDocument<Deck>(ECollectionNames.DECK, deckId, { cards: [...deck.cards, createdCard.id] });

    return {
      image,
      sound,
      ...createdCard,
    };
  }, []);

  const readCardById = useCallback(async (cardId: string): Promise<Card> => {
    const readCard = await readDocument<CardDTO>(ECollectionNames.CARD, cardId);
    if(!readCard) return;

    const {imageId, soundId, ...rest} = readCard

    const image = await readDocument<Media>(ECollectionNames.MEDIA, imageId);
    const sound = await readDocument<Media>(ECollectionNames.MEDIA, soundId);

    return {
      ...rest,
      image,
      sound
    };
  }, []);

  const updateCardById = useCallback(async (cardId: string, card: Omit<Partial<Card>, "id">): Promise<Card> => {
    const { sound, image } = await updateMediasUrl(card);

    return await updateDocument<Card>(ECollectionNames.CARD, cardId, { ...card, sound, image });
  }, []);

  const value: CardContextDefaults = useMemo(
    () => ({
      cards,
      readCards,
      createCard,
      readCardById,
      updateCardById,
    }),
    [cards, readCards, createCard, readCardById, updateCardById]
  );

  return <CardContext.Provider {...{ value }}>{children}</CardContext.Provider>;
};
