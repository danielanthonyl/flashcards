import { ReactNode, createContext, useCallback, useMemo, useState } from "react";
import { CardContextDefaults, cardContextDefaults } from "./CardContextDefaults";
import { readCollection } from "../../api/repository/readCollection";
import { ECollectionNames } from "../../api/repository/enums/ECollectionNames";
import { Card, Media } from "../../api/entities/Card";
import { uploadMedia } from "../../api/repository/uploadMedia";
import { EBucketDirectories } from "../../api/repository/enums/EBucketDirectories";
import { createDocument } from "../../api/repository/createDocument";
import { readDocument } from "../../api/repository/readDocument";
import { updateDocument } from "../../api/repository/updateDocument";

export interface CardContextProviderProps {
  children: ReactNode;
}

export const CardContext = createContext(cardContextDefaults);

export const CardContextProvider = ({ children }: CardContextProviderProps) => {
  const [cards, setCards] = useState<Card[]>([]);

  const updateMediasUrl = async (medias: { sound?: Media; image?: Media }) => {
    const sound: Media = medias.sound;
    const image: Media = medias.image;

    if (medias.sound) sound.url = await uploadMedia(medias.sound as File, EBucketDirectories.SOUND);
    if (medias.image) image.url = await uploadMedia(medias.image as File, EBucketDirectories.IMAGE);

    return { sound, image };
  };

  const readCards = useCallback(async () => {
    const cardCollection = await readCollection<Card>(ECollectionNames.CARD);
    setCards(cardCollection);

    return cardCollection;
  }, []);

  const createCard = useCallback(async (card: Omit<Card, "id">): Promise<Card> => {
    const { sound, image } = await updateMediasUrl(card);

    return await createDocument<Card>(ECollectionNames.CARD, { ...card, sound, image });
  }, []);

  const readCardById = useCallback(async (cardId: string): Promise<Card> => {
    return await readDocument<Card>(ECollectionNames.CARD, cardId);
  }, []);

  const updateCardById = useCallback(async (cardId: string, updateObject: Omit<Partial<Card>, "id">): Promise<Card> => {
    const { sound, image } = await updateMediasUrl(updateObject);

    return await updateDocument<Card>(ECollectionNames.CARD, cardId, { ...updateObject, sound, image });
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
