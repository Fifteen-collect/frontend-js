import * as React from "react";
import {Theme} from "Types/Theme";
import {scheme as ColorScheme, ThemeProps} from "Types/Theme/ColorScheme";

export const Context: React.Context<ThemeProps> = React.createContext(ColorScheme[Theme.LIGHT]);
