import { useDeckContext } from "../../../contexts/DeckContext/useDeckContext";
import { DeckEmptyState } from "../DeckEmptyState/DeckEmptyState";

export const Decks = () => {
  const { decks } = useDeckContext();

  if (decks.length <= 0) {
    return <DeckEmptyState />;
  }

  return decks.map(({ id, name }) => (
    <div key={id}>
      <p>{name}</p>
    </div>
  ));
};
