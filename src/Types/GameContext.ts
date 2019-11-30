import * as React from "react";
import {Size} from "Types/Block/Size";

export const GameContext = React.createContext({
    run: false,
    solved: false,
    size: Size.X4,
});
