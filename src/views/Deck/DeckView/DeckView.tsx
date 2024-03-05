import { useNavigate } from "react-router-dom";
import { Decks } from "./Decks/Decks";

import classes from "./DeckView.module.css";
import { Header } from "../../../components/Header/Header";

export const DeckView = () => {
  const navigate = useNavigate();

  const handleAddDeck = () => {
    navigate("/decks/create");
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header title="Decks" />
        <button onClick={handleAddDeck} style={{ alignSelf: "end", marginBottom: "20px" }}>
          +
        </button>
      </div>
      <Decks />
    </div>
  );
};
