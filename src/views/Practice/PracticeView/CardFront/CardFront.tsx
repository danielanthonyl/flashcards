import { MouseEvent, useRef } from "react";
import { Card } from "../../../../api/entities/Card";
import classes from "./CardFront.module.css";

export const CardFront = ({ onFrontCardClick, card }: { card: Card; onFrontCardClick: () => void }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayAudio = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    if (audioRef.current.paused) return audioRef.current.play();

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div role="button" onClick={onFrontCardClick}>
      <div className={classes.header}>
        <p>{card?.tip}</p>
        {card?.sound?.url ? (
          <>
            <button onClick={handlePlayAudio}>
              <i>🔊</i>
            </button>

            <audio ref={audioRef} src={card?.sound?.url}></audio>
          </>
        ) : null}
      </div>
      <img width={90} src={card?.image?.url} />
    </div>
  );
};
