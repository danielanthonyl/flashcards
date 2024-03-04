import { useDeckContext } from "../../contexts/DeckContext/useDeckContext";
import "./Deck.css";
import { DeckEmptyState } from "./EmptyState";

export const Deck = () => {
  const { decks } = useDeckContext();

  if (decks.length <= 0) {
    return <DeckEmptyState />;
  }

  return (
    <div className="container">
      {decks.map(({ id, name}) => (
        <div key={id}>
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
};
