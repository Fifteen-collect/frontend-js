import {Theme} from "../Theme";
import {Color} from "../Color";

export interface ThemeProps {
    text: Color,
    timerTextColor: Color,
    block: {
        border: Color,
        solved: Color,
    },
    button: {
        background: Color,
    },
    main: {
        background: Color,
        header: {
            background: Color,
        },
        modal: {
            header: Color,
            body: Color,
            text: Color,
        }
    }
}

export type ColorScheme = {
    [theme in Theme]: ThemeProps
}

export const scheme: ColorScheme = {
    [Theme.LIGHT]: {
        text: Color.LIGHT,
        timerTextColor: Color.BLACK,
        block: {
            border: Color.LIGHT,
            solved: Color.GREEN,
        },
        button: {
            background: Color.PRIMARY,
        },
        main: {
            background: Color.WHITE,
            header: {
                background: Color.LIGHT,
            },
            modal: {
                header: Color.LIGHT,
                body: Color.WHITE,
                text: Color.BLACK,
            }
        }
    },
    [Theme.DARK]: {
        text: Color.WHITE,
        timerTextColor: Color.WHITE,
        block: {
            border: Color.LIGHTSTATEGREY,
            solved: Color.DEEPGREEN,
        },
        button: {
            background: Color.COMPOSITIVEDARK,
        },
        main: {
            background: Color.NIGHTDARK,
            header: {
                background: Color.NIGHTDARK,
            },
            modal: {
                header: Color.NIGHTDARK,
                body: Color.STRANGEDARK,
                text: Color.WHITE,
            }
        }
    }
};
