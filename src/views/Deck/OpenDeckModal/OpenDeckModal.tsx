import { MouseEvent } from "react";
import { useOpenDeckModalContext } from "../../../contexts/OpenDeckModalContext/useOpenDeckModalContext";
import classes from "./OpenDeckModal.module.css";

export const OpenDeckModal = () => {
  const { close, visible } = useOpenDeckModalContext();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.bubbles = false;
    close();
  };

  return (
    <div onClick={() => close()} className={visible ? undefined : classes.hidden}>
      <div className={classes.content}>
        <button className={classes.closeButton} onClick={handleClick}>
          X
        </button>

        <button className={classes.option}>Practice Flashcard</button>
        <button className={classes.option}>Practice Multiple Choices</button>
        <button className={classes.option}>Edit Deck</button>
      </div>
      <div className={classes.overlay} />
    </div>
  );
};
