/**
 * DEBTS:
 * - image should have a default image that probably comes from db.
 *   Will use a generic placeholder for now.
 */
import { useRef } from "react";
import { Card, CardDTO } from "../../../api/entities/Card";
import classes from "./CardForm.module.css";
import { useCardForm } from "./useCardForm";

export interface CardFormProps {
  submitHandler: (card: CardDTO) => void;
  submitLabel: string;
  cardDefaults?: Card;
}

export const CardForm = ({ submitHandler, submitLabel, cardDefaults }: CardFormProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const soundInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    card,
    handleChange,
    handleAddSound,
    handleChangeImage,
    handlePreview,
    localHandleChange,
    localSubmitHanlder,
  } = useCardForm({
    submitHandler,
    cardDefaults,
    audioRef,
    imageInputRef,
    soundInputRef,
  });

  return (
    <form onSubmit={localSubmitHanlder} className={classes.form}>
      <button onClick={handleChangeImage} className={classes.imageContainer}>
        <img
          id="image"
          src={
            !card.image?.url || card.image?.url === "" ? "https://f4.bcbits.com/img/a0082454319_65" : card.image?.url
          }
          alt="flashcard image"
        />
        <label htmlFor="image">Alter image</label>
        <input
          ref={imageInputRef}
          hidden
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={localHandleChange}
        />
      </button>

      <label htmlFor="sound">Sound:</label>
      <div className={classes.soundContainer}>
        <input
          onClick={handleAddSound}
          readOnly
          type="text"
          value={card.sound?.name || ""}
          placeholder="tap to add a sound"
        />
        <button disabled={card.sound?.url === ""} onClick={handlePreview}>
          Preview
        </button>

        <input
          ref={soundInputRef}
          hidden
          type="file"
          accept="audio/*"
          id="sound"
          name="sound"
          onChange={localHandleChange}
        />
        <audio autoPlay={false} ref={audioRef} src={card.sound?.url}></audio>
      </div>

      <label htmlFor="tip">Tip:</label>
      <input type="text" id="tip" name="tip" value={card.tip} onChange={handleChange} required />

      <label htmlFor="answer">Answer:</label>
      <input type="text" id="answer" name="answer" value={card.answer} onChange={handleChange} required />

      <label htmlFor="explanation">Explanation:</label>
      <input
        type="text"
        id="explanation"
        name="explanation"
        value={card.explanation}
        onChange={handleChange}
        required
      />

      <input type="submit" value={submitLabel} />
    </form>
  );
};
