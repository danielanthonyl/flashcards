import { useNavigate, useParams } from "react-router-dom";
import { useDeckContext } from "../../../contexts/DeckContext/useDeckContext";

import { Header } from "../../../components/Header/Header";
import { useEffect, useState } from "react";
import { Deck } from "../../../api/entities/Deck";
import { Cards } from "./Cards/Cards";

export const EditDeckView = () => {
  const navigate = useNavigate();
  const [deck, setDeck] = useState<Deck | null>(null);
  const { readDeckById } = useDeckContext();
  const { deckId } = useParams<{ deckId: string }>();

  const createCardHandle = () => {
    navigate(`./cards/create`)  
  };

  useEffect(() => {
    (async () => setDeck(await readDeckById(deckId || "")))();
  }, [readDeckById, deckId]);

  return (
    <section>
      <Header
        title="Deck Config"
        subHeadline={deck?.name}
        navigationLabel="Decks"
        navigationPath="/decks"
        suffixes={[
          {
            icon: "+",
            onClick: createCardHandle,
          },
          { icon: "⚙" },
        ]}
      />

      <Cards {...{ deckId }} />
    </section>
  );
};
