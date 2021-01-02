import React from "react";
import {GameContext} from "Components/Game/useGameContext";
import useGameState from "Components/Game/useGameState";

export default (props: {children: any}) => {
  const game = useGameState();

  return <GameContext.Provider value={game}>
    {props.children}
  </GameContext.Provider>
}
