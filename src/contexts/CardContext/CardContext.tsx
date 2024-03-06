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

  const updateMediasUrl = async ({ image, sound,  }: Pick<CardDTO, "image" | "sound">) => {
    const createdMedias: Medias = {
      sound: null,
      image: null,
    };

    if (sound) {
      const { file: soundFile, ...soundRest } = sound;
      const url = await uploadMedia(soundFile, EBucketDirectories.SOUND);
      createdMedias.sound = await createDocument<Omit<Media, "id">>(ECollectionNames.MEDIA, { ...soundRest, url });
    }

    if (image) {
      const { file: imageFile, ...imageRest } = image;
      const url = await uploadMedia(imageFile, EBucketDirectories.IMAGE);
      createdMedias.image = await createDocument<Omit<Media, "id">>(ECollectionNames.MEDIA, { ...imageRest, url });
    }

    return createdMedias;
  };

  const readCards = useCallback(async () => {
    const cardCollection = await readCollection<Card>(ECollectionNames.CARD);
    setCards(cardCollection);

    return cardCollection;
  }, []);

  const createCard = useCallback(async (card: Omit<CardDTO, "id">, deckId: string): Promise<Card> => {
    const { image, sound, ...rest } = card;
    const {
      sound: { id: soundId },
      image: { id: imageId },
    } = await updateMediasUrl({ image, sound });

    const createdCard = await createDocument<Omit<Card, "id">>(ECollectionNames.CARD, { ...rest, soundId, imageId, deckId });

    const deck = await readDocument<Deck>(ECollectionNames.DECK, deckId);
    await updateDocument<Deck>(ECollectionNames.DECK, deckId, { cards: [...deck.cards, createdCard.id] });

    return createdCard;
  }, []);

  const readCardById = useCallback(async (cardId: string): Promise<Card> => {
    return await readDocument<Card>(ECollectionNames.CARD, cardId);
  }, []);

  const updateCardById = useCallback(async (cardId: string, card: Partial<CardDTO>): Promise<Card> => {
    const { image, sound, ...rest } = card;
    const {
      sound: { id: soundId },
      image: { id: imageId },
    } = await updateMediasUrl({ image, sound });

    return await updateDocument<Card>(ECollectionNames.CARD, cardId, { ...rest, soundId, imageId });
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
