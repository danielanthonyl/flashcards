import { useEffect } from "react";
import { useDeckContext } from "../../../../contexts/DeckContext/useDeckContext";
import { DeckEmptyState } from "../DeckEmptyState/DeckEmptyState";

export const Decks = ({ handleDeckClick }: { handleDeckClick: (deckId: string) => void }) => {
  const { decks, readDecks } = useDeckContext();

  useEffect(() => {
    (async () => await readDecks())();
  }, [readDecks]);

  if (decks.length <= 0) {
    return <DeckEmptyState />;
  }

  return decks.map(({ id, name }) => (
    <button onClick={() => handleDeckClick(id)} key={id}>
      {name}
    </button>
  ));
};
