/**
 * DEBTS:
 * - image should have a default image that probably comes from db.
 *   Will use a generic placeholder for now.
 */
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Card, CardDTO } from "../../../api/entities/Card";
import classes from "./CardForm.module.css";

export interface CardFormProps {
  submitHandler: (card: CardDTO) => void;
  submitLabel: string;
  cardDefaults?: Card;
}

const newCardDefaults: CardDTO = {
  tip: "",
  answer: "",
  explanation: "",
};

export const CardForm = ({ submitHandler, submitLabel, cardDefaults }: CardFormProps) => {
  const [card, setCard] = useState<CardDTO>(newCardDefaults);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const soundInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const localSubmitHanlder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitHandler(card);
  };

  const handleChangeImage = () => {
    imageInputRef.current.click();
  };

  const handleAddSound = () => {
    soundInputRef.current.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = event.target;

    setCard((prevState) => ({
      ...prevState,
      [name]:
        type === "file"
          ? {
              url: "",
              file: files[0],
              name: files[0].name,
            }
          : value,
    }));
  };

  const localHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event);

    const {
      files: [file],
      name,
    } = event.target as { files: FileList; name: "sound" | "image" };

    if (file) {
      const url = URL.createObjectURL(file);
      return setCard((previousState) => ({ ...previousState, [name]: { ...previousState[name], url } }));
    }

    throw new Error(`Invalid file: ${file}`);
  };

  const handlePreview = () => {
    const { current } = audioRef;

    if (current.paused) return current.play();
    current.pause();
    current.currentTime = 0;
  };

  useEffect(() => {
    if (cardDefaults) {
      setCard(cardDefaults);
    }
  }, [cardDefaults]);

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
