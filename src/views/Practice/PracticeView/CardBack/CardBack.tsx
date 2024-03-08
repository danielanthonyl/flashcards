import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { Card } from "../../../../api/entities/Card";

export const CardBack = ({ card, onBackCardClick }: { card: Card; onBackCardClick: () => void }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayAudio = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (audioRef.current.paused) return audioRef.current.play();

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const handleDifficultySelect = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDifficulty(event.target.value);
  };

  return (
    <div>
      <div role="button" onClick={onBackCardClick}>
        {card?.sound?.url ? (
          <>
            <button onClick={handlePlayAudio}>
              <i>🔊</i>
            </button>

            <audio ref={audioRef} src={card?.sound?.url}></audio>
          </>
        ) : null}

        <p>{card.answer}</p>
        <p>{card.explanation}</p>
      </div>

      <div>
        <form action="">
          <label htmlFor="easy">Easy</label>
          <input
            onChange={handleDifficultySelect}
            multiple={false}
            type="radio"
            id="easy"
            name="difficulty"
            value="easy"
          />

          <label htmlFor="medium">Medium</label>
          <input onChange={handleDifficultySelect} type="radio" id="medium" name="difficulty" value="medium" />

          <label htmlFor="hard">Hard</label>
          <input onChange={handleDifficultySelect} type="radio" id="hard" name="difficulty" value="hard" />
        </form>
      </div>
    </div>
  );
};
