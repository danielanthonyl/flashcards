import { useEffect, useState } from "react";

import { CardDTO } from "../../../api/entities/Card";
import { useCardContext } from "../../../contexts/CardContext/useCardContext";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/Header/Header";
import { Deck } from "../../../api/entities/Deck";
import { useDeckContext } from "../../../contexts/DeckContext/useDeckContext";
import { CardForm } from "../CardForm/CardForm";

export const CreateCardView = () => {
  const navigate = useNavigate();
  const { deckId } = useParams<{ deckId: string }>();
  const { createCard } = useCardContext();
  const { readDeckById } = useDeckContext();

  const [deck, setDeck] = useState<Deck | null>(null);

  const submitHandler = async (card: CardDTO) => {
    await createCard(card, deckId);

    navigate(`/decks/${deckId}`);
  };

  useEffect(() => {
    (async () => setDeck(await readDeckById(deckId)))();
  }, [readDeckById, deckId]);

  return (
    <section>
      <Header
        title="Create Card"
        subHeadline={deck?.name}
        navigationLabel="Edit Deck"
        navigationPath={`/decks/${deckId}`}
      />

      <CardForm {...{ submitHandler, submitLabel: "Create" }} />
    </section>
  );
};
