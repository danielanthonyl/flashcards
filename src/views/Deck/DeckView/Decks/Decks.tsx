import { useEffect } from "react";
import { useDeckContext } from "../../../../contexts/DeckContext/useDeckContext";
import { DeckEmptyState } from "../DeckEmptyState/DeckEmptyState";
import { useNavigate } from "react-router-dom";

export const Decks = () => {
  const navigate = useNavigate();
  const { decks, readDecks } = useDeckContext();

  const handleDeckClick = (deckId: string) => {
    navigate(`/decks/${deckId}`);
  };

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
