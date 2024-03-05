/**
 * DEBTS:
 * - on line 36 (empty card handling) will be updated to a proper error screen
 */
import { useEffect, useState } from "react";
import { Card } from "../../../api/entities/Card";
import { useCardContext } from "../../../contexts/CardContext/useCardContext";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "../../../components/Header/Header";
import { useDeckContext } from "../../../contexts/DeckContext/useDeckContext";
import { Deck } from "../../../api/entities/Deck";
import { CardForm } from "../CardForm/CardForm";

export const EditCardView = () => {
  const navigate = useNavigate();
  const { deckId, cardId } = useParams<{ deckId: string; cardId: string }>();

  const { updateCardById, readCardById } = useCardContext();
  const { readDeckById } = useDeckContext();

  const [cardDefaults, setCardDefaults] = useState<Card>(null);
  const [deck, setDeck] = useState<Deck | null>(null);

  const submitHandler = async (card: Omit<Card, "id">) => {
    await updateCardById(cardId, card);

    navigate(`/decks/${deckId}`);
  };

  useEffect(() => {
    (async () => setCardDefaults(await readCardById(cardId)))();
    (async () => setDeck(await readDeckById(deckId)))();
  }, [readCardById, cardId, readDeckById, deckId]);

  if(!cardDefaults){
    return <p>card not found.</p>
  }

  return (
    <section>
      <Header
        title="Edit Card"
        subHeadline={deck?.name}
        navigationLabel="Edit Deck"
        navigationPath={`/decks/${deckId}`}
      />

      <CardForm {...{ submitHandler, submitLabel: "Create", cardDefaults }} />
    </section>
  );
};
