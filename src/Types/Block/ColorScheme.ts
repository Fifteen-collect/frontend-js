import {Theme} from "Types/Theme";
import {Theme as BlockTheme} from "Types/Block/Theme";
import {Dark as BlockDarkTheme} from "Types/Block/BackgroundTheme/Dark";
import {Light as BlockLightTheme} from "Types/Block/BackgroundTheme/Light";

export type ColorScheme = {
    [theme in Theme]: BlockTheme
}

export const scheme: ColorScheme = {
    [Theme.LIGHT]: BlockLightTheme,
    [Theme.DARK]: BlockDarkTheme,
};
