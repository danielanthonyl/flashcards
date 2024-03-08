import { CardFront } from "./CardFront/CardFront";
import { CardBack } from "./CardBack/CardBack";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Deck } from "../../../api/entities/Deck";
import { useDeckContext } from "../../../contexts/DeckContext/useDeckContext";
import { useCardContext } from "../../../contexts/CardContext/useCardContext";
import { Card } from "../../../api/entities/Card";
import classes from "./PracticeView.module.css";

export const PracticeView = () => {
  const navigate = useNavigate();
  const { readDeckById } = useDeckContext();
  const { deckId } = useParams<{ deckId: string }>();
  const [deck, setDeck] = useState<Deck>(null);
  const [card, setCard] = useState<Card>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { readCardById } = useCardContext();

  const [cardFlipped, setCardFlipped] = useState(false);

  const cardsLength = useMemo(() => deck?.cards?.length, [deck]);

  const onFrontCardClick = () => {
    setCardFlipped((previousState) => !previousState);
  };

  const onBackCardClick = async () => {
    if (currentCardIndex +1 >= cardsLength) {
      return navigate(`/practice/finish/${deckId}`);
    }

    setCurrentCardIndex((previousState) => previousState + 1);
    setCardFlipped((previousState) => !previousState);
  };

  useEffect(() => {
    (async () => setDeck(await readDeckById(deckId)))();
  }, [deckId, readDeckById]);

  useEffect(() => {
    if (deck) (async () => setCard(await readCardById(deck?.cards[currentCardIndex])))();
  }, [currentCardIndex, setCard, readCardById, deck]);

  return (
    <div className={classes.practice}>
      <div>
        <button>Exit</button>
      </div>

      <div>
        {!cardFlipped ? <CardFront {...{ onFrontCardClick, card }} /> : <CardBack {...{ card, onBackCardClick }} />}
      </div>

      <div>
        <p>
          Cards remaining {currentCardIndex + 1}/{cardsLength}
        </p>
      </div>
    </div>
  );
};
