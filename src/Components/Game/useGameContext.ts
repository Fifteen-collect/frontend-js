import React, {createContext, useContext} from "react";
import {IGame} from "Components/Game/useGameState";
import {Size} from "Types/Block";
import {Method, Theme} from "Types";

export const GameContext = createContext({
  run: false,
  solved: false,
  size: Size.X4,
  matrix: [],
  theme: Theme.LIGHT,
  buffer: {x: 0, y: 0},
  method: Method.DEFAULT,
  moves: 0,
  clicks: 0,
  startTime: 0,
} as IGame);

export default (): IGame => {
  return useContext(GameContext);
}
