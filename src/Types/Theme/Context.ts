import * as React from "react";
import {Theme} from "../Theme";
import {scheme as ColorScheme, ThemeProps} from "./ColorScheme";

export const Context: React.Context<ThemeProps> = React.createContext(ColorScheme[Theme.LIGHT]);
