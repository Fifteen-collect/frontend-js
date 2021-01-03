import {useState} from "react";
import * as Storage from "Storage";
import {scheme} from "Types/Theme/ColorScheme";

export default () => {
  const [theme, setTheme] = useState(Storage.Themes.getThemeFromStorage());

  return {
    setTheme,
    theme: {
      current: theme,
      styles: scheme[theme],
    },
  }
}
