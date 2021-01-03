import {Theme} from "Types/Theme";
import {ITheme, scheme} from "Types/Theme/ColorScheme";

const THEME_KEY = 'theme';

export function getThemeFromStorage(): Theme {
  return (localStorage.getItem(THEME_KEY) || Theme.LIGHT) as Theme;
}

export function getTheme(): {theme: Theme, styles: ITheme} {
  const theme = getThemeFromStorage();

  return {
    theme,
    styles: scheme[theme]
  }
}

export function saveThemeToStorage(theme: Theme) {
  localStorage.removeItem(THEME_KEY);
  localStorage.setItem(THEME_KEY, theme);
}
