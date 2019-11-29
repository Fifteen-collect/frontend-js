import {Theme} from "Types/Theme";
import {Color} from "Types/Color";

export interface ThemeProps {
    text: Color,
    timerTextColor: Color,
    block: {
        border: Color,
        solved: Color,
    },
    button: {
        background: Color,
        classColor: string,
        text: Color,
        selectedText: Color,
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
            closeButton: Color,
        }
    },
    table: {
        backgroundClass: string
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
                header: Color.LIGHT,
                body: Color.WHITE,
                text: Color.BLACK,
                closeButton: Color.BLACK,
            }
        },
        table: {
            backgroundClass: 'table-light'
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
                header: Color.NIGHTDARK,
                body: Color.NIGHTDARK,
                text: Color.WHITE,
                closeButton: Color.WHITE,
            }
        },
        table: {
            backgroundClass: 'table-dark'
        }
    }
};
