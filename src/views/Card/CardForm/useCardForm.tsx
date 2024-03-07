import { ChangeEvent, FormEvent, MutableRefObject, useEffect, useState } from "react";
import { Card } from "../../../api/entities/Card";
import { CardFormProps } from "./CardForm";

const newCardDefaults: Omit<Card, "id"> = {
  tip: "",
  answer: "",
  explanation: "",
  deckId: "",
};

export interface UseCardFormProps extends Omit<CardFormProps, "submitLabel"> {
  imageInputRef: MutableRefObject<HTMLInputElement>;
  soundInputRef: MutableRefObject<HTMLInputElement>;
  audioRef: MutableRefObject<HTMLAudioElement>;
}

export const useCardForm = ({
  submitHandler,
  cardDefaults,
  audioRef,
  imageInputRef,
  soundInputRef,
}: UseCardFormProps) => {
  const [card, setCard] = useState<Omit<Card, "id">>(newCardDefaults);

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

  return {
    handlePreview,
    localHandleChange,
    handleAddSound,
    handleChangeImage,
    handleChange,
    localSubmitHanlder,
    card,
  };
};
