import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Deck } from "../../../api/entities/Deck";
import { useDeckContext } from "../../../contexts/DeckContext/useDeckContext";
import { Header } from "../../../components/Header/Header";

import classes from "./CreateDeckView.module.css";

const newDeckDefaultValue: Omit<Deck, 'id'> = {
  cards: [],
  configuration: {
    maxNewCardsDay: "20",
    practiceTimeReminder: "weekly, 03:00pm",
    flowType: "Random",
    practiceType: "Flashcards",
  },
  name: "",
};

export const CreateDeckView = () => {
  const navigate = useNavigate();
  const { createDeck } = useDeckContext();
  const [newDeck, setNewDeck] = useState<Omit<Deck, "id">>(newDeckDefaultValue);

  const handleNameInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setNewDeck({ ...newDeck, name: value });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const createdDeck = await createDeck(newDeck);

      navigate(`/decks/${createdDeck?.id}`);
    } catch (error) {
      console.error("ui error: ", error);
    }
  };

  return (
    <section>
      <Header title="Create Deck" navigationLabel="Decks" navigationPath="/decks" />

      <form onSubmit={handleSubmit} className={classes.form}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Name" onChange={handleNameInput} required />

        <label htmlFor="maxNewCardsDay">Max New Cards/Day</label>
        <input disabled type="text" id="maxNewCardsDay" name="maxNewCardsDay" placeholder="Max New Cards/Day" />

        <label htmlFor="practiceTimeReminder">Practice Time Reminder</label>
        <input
          disabled
          type="text"
          id="practiceTimeReminder"
          name="practiceTimeReminder"
          placeholder="Practice Time Reminder"
        />

        <label htmlFor="flowType">Flow Type</label>
        <input disabled type="text" id="flowType" name="flowType" placeholder="Flow Type" />

        <label htmlFor="practiceType">Practice Type</label>
        <input disabled type="text" id="practiceType" name="practiceType" placeholder="Practice Type" />

        <input type="submit" value="Create" />
      </form>
    </section>
  );
};
