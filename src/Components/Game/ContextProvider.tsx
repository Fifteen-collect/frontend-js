import React from "react";
import {GameContext} from "Contexts/Game/useGameContext";
import useGameState from "Hooks/Game/useGameState";

export default (props: {children: any}) => {
  const game = useGameState();

  return <GameContext.Provider value={game}>
    {props.children}
  </GameContext.Provider>
}
