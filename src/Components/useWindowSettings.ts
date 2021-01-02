import {useState} from "react";
import useGameContext from "Components/Game/useGameContext";

export default (relative: number) => {
  const game = useGameContext();
  const windowSize = innerWidth > innerHeight ? (innerHeight - innerHeight / 10) : innerWidth;
  const [relativeSize, setRelativeSize] = useState(windowSize / relative);
  const updateRelativeSize = () => setRelativeSize(windowSize / game.size)

  return {
    windowSize,
    relativeSize,
    updateRelativeSize,
  }
}
