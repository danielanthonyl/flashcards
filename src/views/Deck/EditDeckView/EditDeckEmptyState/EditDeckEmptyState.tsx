import { useNavigate } from "react-router-dom";

export const EditDeckEmptyState = ({ deckId }: { deckId: string }) => {
  const navigate = useNavigate();

  const handleCreateCard = () => {
    navigate(`/decks/${deckId}/cards/create`);
  };

  return (
    <div>
      <p>You do not have any cards on your deck.</p>
      <button onClick={handleCreateCard}>Create Cards</button>
    </div>
  );
};
