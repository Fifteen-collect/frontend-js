import {Theme} from "Types/Theme";
import {Color} from "Types/Color";

export interface IThemeProps {
  block: {
    border: Color,
    solved: Color,
    text: Color,
  },
  button: {
    background: Color,
    classColor: string,
    selectedText: Color,
    text: Color,
  },
  main: {
    background: Color,
    header: {
      background: Color,
    },
  },
  table: {
    backgroundClass: string
  },
  text: Color,
  timerTextColor: Color,
}

export type ColorScheme = {
  [theme in Theme]: IThemeProps
}

export const scheme: ColorScheme = {
  [Theme.LIGHT]: {
    block: {
      border: Color.PRIMARY,
      solved: Color.GREEN,
      text: Color.PRIMARY,
    },
    button: {
      background: Color.PRIMARY,
      classColor: 'btn-outline-primary',
      text: Color.BLACK,
      selectedText: Color.WHITE,
    },
    main: {
      background: Color.WHITE,
      header: {
        background: Color.LIGHT,
      },
    },
    table: {
      backgroundClass: 'table-light'
    },
    text: Color.DARK,
    timerTextColor: Color.BLACK,
  },
  [Theme.DARK]: {
    block: {
      border: Color.LIGHTSTATEGREY,
      solved: Color.DEEPGREEN,
      text: Color.LIGHT,
    },
    button: {
      background: Color.COMPOSITIVEDARK,
      classColor: 'btn-outline-dark',
      text: Color.WHITE,
      selectedText: Color.WHITE,
    },
    main: {
      background: Color.NIGHTDARK,
      header: {
        background: Color.NIGHTDARK,
      },
    },
    table: {
      backgroundClass: 'table-dark'
    },
    text: Color.WHITE,
    timerTextColor: Color.WHITE,
  }
};
