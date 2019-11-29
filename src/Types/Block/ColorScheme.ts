import {Theme} from "../Theme";
import {Theme as BlockTheme} from "./Theme";
import {Dark as BlockDarkTheme} from "./BackgroundTheme/Dark";
import {Light as BlockLightTheme} from "./BackgroundTheme/Light";

export type ColorScheme = {
    [theme in Theme]: BlockTheme
}

export const scheme: ColorScheme = {
    [Theme.LIGHT]: BlockLightTheme,
    [Theme.DARK]: BlockDarkTheme,
};
