import {Theme} from "../../Types/Theme";

const THEME_KEY = 'theme';

export class ThemeStorage {
    public static get(): Theme {
        return <Theme>(localStorage.getItem(THEME_KEY) || Theme.LIGHT);
    }

    public static set(theme: Theme) {
        localStorage.removeItem(THEME_KEY);
        localStorage.setItem(THEME_KEY, theme);
    }
}
