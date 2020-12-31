import {Theme} from "Types/Theme";
import {Color} from "Types/Color";

export interface IThemeProps {
  block: {
    border: Color,
    solved: Color,
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
    modal: {
      body: Color,
      closeButton: Color,
      header: Color,
      text: Color,
    }
  },
  table: {
    backgroundClass: string
  },
  text: Color,
  timerTextColor: Color,
}

export type IColorScheme = {
  [theme in Theme]: IThemeProps
}

export const scheme: IColorScheme = {
  [Theme.LIGHT]: {
    block: {
      border: Color.LIGHT,
      solved: Color.GREEN,
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
      modal: {
        body: Color.WHITE,
        closeButton: Color.BLACK,
        header: Color.LIGHT,
        text: Color.BLACK,
      }
    },
    table: {
      backgroundClass: 'table-light'
    },
    text: Color.LIGHT,
    timerTextColor: Color.BLACK,
  },
  [Theme.DARK]: {
    block: {
      border: Color.LIGHTSTATEGREY,
      solved: Color.DEEPGREEN,
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
      modal: {
        body: Color.NIGHTDARK,
        closeButton: Color.WHITE,
        header: Color.NIGHTDARK,
        text: Color.WHITE,
      }
    },
    table: {
      backgroundClass: 'table-dark'
    },
    text: Color.WHITE,
    timerTextColor: Color.WHITE,
  }
};
