import { ReactNode, createContext, useCallback, useMemo, useState } from "react";
import { DeckDefaultValue, deckDefaultValue } from "./DeckContextDefaults";
import { createDocument } from "../../api/repository/createDocument";
import { ECollectionNames } from "../../api/repository/enums/ECollectionNames";
import { Deck } from "../../api/entities/Deck";
import { readCollection } from "../../api/repository/readCollection";
import { readDocument } from "../../api/repository/readDocument";

export interface DeckProviderProps {
  children: ReactNode;
}

export const DeckContext = createContext(deckDefaultValue);

export const DeckProvider = ({ children }: DeckProviderProps) => {
  const [localDecks, setLocalDecks] = useState<Deck[]>([]);

  const createDeck = useCallback(
    async (deck: Deck) => {
      const createdDeck = await createDocument<Deck>(ECollectionNames.DECK, deck);
      const localDecksCopy = [...localDecks];

      if (createdDeck) {
        localDecksCopy.push(createdDeck);
        setLocalDecks(localDecksCopy);
      }

      return createdDeck;
    },
    [localDecks]
  );

  const readDecks = useCallback(async () => {
    const decks = await readCollection<Deck>(ECollectionNames.DECK);
    setLocalDecks(decks);

    return decks;
  }, []);

  const readDeckById = useCallback(async (deckId: string) => {
    return await readDocument<Deck>(ECollectionNames.DECK, deckId);
  }, []);

  const syncReadDeckById = useCallback(
    (deckId: string) => {
      return (
        localDecks.find((singleDeck) => {
          return singleDeck.id === deckId;
        }) || null
      );
    },
    [localDecks]
  );

  const value: DeckDefaultValue = useMemo(
    () => ({
      createDeck,
      readDeckById,
      readDecks,
      syncReadDeckById,
      decks: localDecks,
    }),
    [createDeck, localDecks, readDeckById, readDecks, syncReadDeckById]
  );

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
};
