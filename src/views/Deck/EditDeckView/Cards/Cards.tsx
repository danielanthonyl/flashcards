import { useEffect } from "react";
import { useCardContext } from "../../../../contexts/CardContext/useCardContext";
import { EditDeckEmptyState } from "../EditDeckEmptyState/EditDeckEmptyState";
import { useNavigate } from "react-router-dom";

export const Cards = ({ deckId }: { deckId: string }) => {
  const navigate = useNavigate();
  const { cards, readCards } = useCardContext();

  const handleCardClick = (cardId: string) => {
    navigate(`/decks/${deckId}/cards/${cardId}`);
  };

  useEffect(() => {
    (async () => await readCards())();
  }, [readCards]);

  if (!cards.length) return <EditDeckEmptyState {...{deckId}} />;

  return cards.map(({ answer, id, image, tip }) => (
    <button onClick={() => handleCardClick(id)} key={id}>
      <p>{tip}</p>
      <i>🔊</i>
      <img src={image as string} alt="" />
      <p>{answer}</p>
    </button>
  ));
};
