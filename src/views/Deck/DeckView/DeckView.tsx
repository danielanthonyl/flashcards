import { useNavigate } from "react-router-dom";
import { Decks } from "./Decks/Decks";

import classes from "./DeckView.module.css";
import { Header } from "../../../components/Header/Header";
import { OpenDeckModal } from "../OpenDeckModal/OpenDeckModal";
import { useState } from "react";

export const DeckView = () => {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [deckId, setDeckId] = useState<string | null>(null);

  const handleAddDeck = () => {
    navigate("/decks/create");
  };

  const handleDeckClick = (deckId: string) => {
    setVisible(true);
    setDeckId(deckId);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <Header title="Decks" />
          <button onClick={handleAddDeck} style={{ alignSelf: "end", marginBottom: "20px" }}>
            +
          </button>
        </div>
        <Decks {...{ handleDeckClick }} />
      </div>

      <OpenDeckModal {...{ visible, setVisible, deckId }} />
    </>
  );
};
