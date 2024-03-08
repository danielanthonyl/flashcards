import { useNavigate, useParams } from "react-router-dom";

export const FinishView = () => {
  const navigate = useNavigate();
  const { deckId } = useParams<{ deckId: string }>();

  const handlePracticeAgain = () => {
    navigate(`/practice/start/${deckId}`);
  };

  const handleGoHome = () => {
    navigate(`/decks`);
  };

  return (
    <section>
      <p>Congrats! your training is over.</p>
      <p>You've got x/x cards!</p>

      <button onClick={handlePracticeAgain}>Practice again</button>
      <button onClick={handleGoHome}>Go home</button>
    </section>
  );
};
