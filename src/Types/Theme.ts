export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export type ThemeType = string;

export interface ITheme {
  main: {
    backGroundColor: string,
  },
  content: {

  },
  navbar: {
    container: string,
    bars: {
      settings: {
        position: 0 | 1 | 2,
        backgroundColor: string,
        icon: {
          relative: 'left' | 'center' | 'right',
          color: string,
        }
      },
      game: {
        position: 0 | 1 | 2,
        backgroundColor: string,
        icon: {
          relative: 'left' | 'center' | 'right',
          color: string,
        }
      },
      statistic: {
        position: 0 | 1 | 2,
        backgroundColor: string,
        icon: {
          relative: 'left' | 'center' | 'right',
          color: string,
        }
      }
    }
  }
}
