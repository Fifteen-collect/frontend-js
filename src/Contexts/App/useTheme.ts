import {Dispatch, createContext, useContext} from "react";
import * as Storage from "Storage";
import {Theme} from "Types";
import {ITheme} from "Types/Theme/ColorScheme";

export interface IThemeContext {
  theme: {
    current: Theme,
    styles: ITheme
  },
  setTheme: Dispatch<Theme>,
}

const {theme, styles} = Storage.Themes.getTheme();

export const UseTheme = createContext({theme: {current: theme, styles: styles}} as IThemeContext);

export function useTheme(): IThemeContext {
  return useContext(UseTheme);
}
