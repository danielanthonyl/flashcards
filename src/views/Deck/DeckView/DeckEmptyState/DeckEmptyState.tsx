import { useNavigate } from "react-router-dom";

export const DeckEmptyState = () => {
  const navigate = useNavigate();

  const handleCreateDeck = () => {
    navigate("/decks/create");
  };

  return (
    <div>
      <p>You do not have any decks.</p>
      <button onClick={handleCreateDeck}>Create Deck</button>
    </div>
  );
};
