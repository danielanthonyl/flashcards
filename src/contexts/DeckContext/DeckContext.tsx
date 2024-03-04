import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react";
import { DeckDefaultValue, deckDefaultValue } from "./defaultValue";
import { createDocument } from "../../api/repository/createDocument";
import { ECollectionNames } from "../../api/repository/ECollectionNames";
import { Deck } from "../../api/entities/Deck";
import { readCollection } from "../../api/repository/readCollection";

export interface DeckProviderProps {
  children: ReactNode;
}

export const DeckContext = createContext(deckDefaultValue);

export const DeckProvider = ({ children }: DeckProviderProps) => {
  const [localDecks, setLocalDecks] = useState<Deck[]>([]);

  const createDeck = useCallback(async (deck: Deck) => {
    await createDocument(ECollectionNames.DECK, deck);
  }, []);

  const readDecks = useCallback(async () => {
    setLocalDecks(await readCollection<Deck>(ECollectionNames.DECK));
  }, []);

  const value: DeckDefaultValue = useMemo(
    () => ({
      createDeck,
      decks: localDecks,
    }),
    [createDeck, localDecks]
  );

  useEffect(() => {
    readDecks();
  }, [readDecks]);

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
};
