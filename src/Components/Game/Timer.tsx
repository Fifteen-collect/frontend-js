import React, {useEffect, useMemo, useState} from "react";
import useGameContext from "Contexts/Game/useGameContext";
import clsx from "clsx";
import {useTheme} from "Contexts/App/useTheme";

const styles = {
  timer: {
    container: clsx([
      'noselect',
      'col-12',
      'd-flex',
      'justify-content-center',
      'text-center',
      'text-primary',
    ]),
  },
  stats: {
    moves: {
      text: clsx([
        'noselect',
        'col-6',
        'text-left'
      ])
    },
    clicks: {
      text: clsx([
        'noselect',
        'col-6',
        'text-right'
      ]),
    },
    mps: {
      text: clsx([
        'noselect',
        'col-6',
        'text-left',
      ]),
    },
    cps: {
      text: clsx([
        'noselect',
        'col-6',
        'text-right',
      ])
    }
  },
}

export default () => {
  const [tickId, setTickId] = useState(undefined);
  const [lastSolveTime, setLastSolveTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const {theme} = useTheme();
  const game = useGameContext();

  const calculateManipulationPerSecond = (
    manipulation: number,
    seconds: number
  ): number => manipulation / (seconds || 1) * (seconds ? 1000 : 0);

  useEffect(() => {
    setTickId(setInterval(() => {
      setCurrentTime(game.run ? Date.now : 0);

      if (!game.solved && currentTime !== 0) {
        setLastSolveTime(currentTime - game.startTime);
      }
    }, 10));

    return clearInterval(tickId);
  }, [game, lastSolveTime, currentTime]);

  let time: Date = new Date(0, 0, 0, 0, 0, 0, 0);

  if (!game.run && game.solved) {
    time = new Date(0, 0, 0, 0, 0, 0, lastSolveTime);
  } else if (currentTime !== 0 && game.run) {
    const milliseconds = currentTime - game.startTime;

    time = new Date(0, 0, 0, 0, 0, 0, milliseconds);
  }

  return <>
    <div className={styles.timer.container}>
      <h3>
        <b>
          {time.getHours() ? `${time.getHours().toString()}:` : ''}
          {time.getMinutes() ? `${time.getMinutes().toString()}:` : ''}
          {time.getSeconds()}.
          {time.getMilliseconds()}
        </b>
      </h3>
    </div>
    {useMemo(() => <b className={styles.stats.moves.text} style={{color: theme.styles.timerTextColor}}>
      moves: {game.moves}
    </b>, [game.moves])}
    {useMemo(() => <b className={styles.stats.clicks.text} style={{color: theme.styles.timerTextColor}}>
      clicks: {game.clicks}
    </b>, [game.clicks])}
    <b className={styles.stats.mps.text} style={{color: theme.styles.timerTextColor}}>
      mps: {calculateManipulationPerSecond(game.moves, lastSolveTime).toFixed(2)}
    </b>
    <b className={styles.stats.cps.text} style={{color: theme.styles.timerTextColor}}>
      cps: {calculateManipulationPerSecond(game.clicks, lastSolveTime).toFixed(2)}
    </b>
  </>
}
