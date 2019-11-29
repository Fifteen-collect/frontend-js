import {Theme} from "Types/Theme";

const THEME_KEY = 'theme';

export function getThemeFromStorage(): Theme {
    return <Theme>(localStorage.getItem(THEME_KEY) || Theme.LIGHT);
}

export function saveThemeToStorage(theme: Theme) {
    localStorage.removeItem(THEME_KEY);
    localStorage.setItem(THEME_KEY, theme);
}
