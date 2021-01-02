import React, {useContext, useEffect, useMemo, useState} from "react";
import {Context as ThemeContext} from "Types/Theme/Context";
import * as Helpers from "Helpers";
import useGameContext from "Components/Game/useGameContext";

export default () => {
  const [tickId, setTickId] = useState(undefined);
  const [lastSolveTime, setLastSolveTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const theme = useContext(ThemeContext);
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

  return <React.Profiler id="Timer" onRender={Helpers.profilerHandler}>
    <div className="noselect col-12 d-flex justify-content-center text-primary">
      <div className="col-12 text-center">
        <h3>
          <b>
            {time.getHours() ? `${time.getHours().toString()}:` : ''}
            {time.getMinutes() ? `${time.getMinutes().toString()}:` : ''}
            {time.getSeconds()}.
            {time.getMilliseconds()}
          </b>
        </h3>
      </div>
    </div>
    {useMemo(() => <span className="noselect col-6 text-left">
      <b style={{color: theme.timerTextColor}}>Moves: {game.moves}</b>
    </span>, [game.moves])}
    {useMemo(() => <span className="noselect col-6 text-right">
      <b style={{color: theme.timerTextColor}}>Clicks: {game.clicks}</b>
    </span>, [game.clicks])}
    <span className="noselect col-6 text-left">
      <b style={{color: theme.timerTextColor}}>
        MPS: {calculateManipulationPerSecond(game.moves, lastSolveTime).toFixed(2)}
      </b>
    </span>
    <span className="noselect col-6 text-right">
      <b style={{color: theme.timerTextColor}}>
        CPS: {calculateManipulationPerSecond(game.clicks, lastSolveTime).toFixed(2)}
      </b>
    </span>
  </React.Profiler>
}
