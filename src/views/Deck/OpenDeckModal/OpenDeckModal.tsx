import { MouseEvent } from "react";
import classes from "./OpenDeckModal.module.css";
import { useNavigate } from "react-router-dom";

export const OpenDeckModal = ({
  visible,
  setVisible,
  deckId,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  deckId: string;
}) => {
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setVisible(false);
  };

  const handlePracticeFlashcard = () => {
    navigate(`/practice/start/${deckId}`);
  };

  const handleParcticeMultipleChoices = () => {};

  const handleEditDeck = () => {
    navigate(`/decks/${deckId}`);
  };

  return (
    <div className={visible ? undefined : classes.hidden}>
      <div className={classes.content}>
        <button className={classes.closeButton} onClick={handleClick}>
          X
        </button>

        <button onClick={handlePracticeFlashcard} className={classes.option}>
          Practice Flashcard
        </button>

        <button disabled onClick={handleParcticeMultipleChoices} className={classes.option}>
          Practice Multiple Choices
        </button>

        <button onClick={handleEditDeck} className={classes.option}>
          Edit Deck
        </button>
      </div>

      <div onClick={() => setVisible(false)} className={classes.overlay} />
    </div>
  );
};
