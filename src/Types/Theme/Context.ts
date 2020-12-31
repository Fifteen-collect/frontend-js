import * as React from "react";
import {Theme} from "Types/Theme";
import {scheme as ColorScheme, IThemeProps} from "Types/Theme/IColorScheme";

export const Context: React.Context<IThemeProps> = React.createContext(ColorScheme[Theme.LIGHT]);
