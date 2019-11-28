import {Color} from "../Color";
import {Method} from "../Method";
import {Theme} from "../Theme";

export enum Size {
    X2 = 2,
    X3 = 3,
    X4 = 4,
    X5 = 5,
    X6 = 6,
    X7 = 7
}

export enum Row {
    FIRST,
    SECOND,
    THIRD,
    FOURTH,
    FIFTH,
    SIXTH,
    SEVENTH,
}

export enum Col {
    FIRST,
    SECOND,
    THIRD,
    FOURTH,
    FIFTH,
    SIXTH,
    SEVENTH,
}

export type ColorScheme = {
    [theme in Theme]: {
        [method in Method]: {
            [size: number]: {
                [row: number]: {
                    [col: number]: Color,
                },
            }
        }
    }
}

export const scheme: ColorScheme = {
    [Theme.LIGHT]: {
        [Method.DEFAULT]: {
            [Size.X2]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.LIGHT
                }
            },
            [Size.X3]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.LIGHT,
                }
            },
            [Size.X4]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.LIGHT,
                }
            },
            [Size.X5]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.LIGHT,
                }
            },
            [Size.X6]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                },
                [Row.SIXTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.LIGHT,
                }
            },
            [Size.X7]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                    [Col.SEVENTH]: Color.DARK,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                    [Col.SEVENTH]: Color.DARK,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                    [Col.SEVENTH]: Color.DARK,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                    [Col.SEVENTH]: Color.DARK,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                    [Col.SEVENTH]: Color.DARK,
                },
                [Row.SIXTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                    [Col.SEVENTH]: Color.DARK,
                },
                [Row.SEVENTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                    [Col.SEVENTH]: Color.LIGHT,
                }
            }
        },
        [Method.LAYERED]: {
            [Size.X2]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.ORANGE,
                    [Col.SECOND]: Color.LIGHT
                }
            },
            [Size.X3]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.ORANGE,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.YELLOW,
                    [Col.SECOND]: Color.YELLOW,
                    [Col.THIRD]: Color.LIGHT,
                }
            },
            [Size.X4]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                    [Col.FOURTH]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.ORANGE,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                    [Col.FOURTH]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.YELLOW,
                    [Col.SECOND]: Color.YELLOW,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.YELLOW,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.GREEN,
                    [Col.SECOND]: Color.GREEN,
                    [Col.THIRD]: Color.GREEN,
                    [Col.FOURTH]: Color.LIGHT,
                }
            },
            [Size.X5]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                    [Col.FOURTH]: Color.RED,
                    [Col.FIFTH]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.ORANGE,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                    [Col.FOURTH]: Color.ORANGE,
                    [Col.FIFTH]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.YELLOW,
                    [Col.SECOND]: Color.YELLOW,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.YELLOW,
                    [Col.FIFTH]: Color.YELLOW,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.GREEN,
                    [Col.SECOND]: Color.GREEN,
                    [Col.THIRD]: Color.GREEN,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.GREEN,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.CYAN,
                    [Col.SECOND]: Color.CYAN,
                    [Col.THIRD]: Color.CYAN,
                    [Col.FOURTH]: Color.CYAN,
                    [Col.FIFTH]: Color.LIGHT,
                }
            },
            [Size.X6]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                    [Col.FOURTH]: Color.RED,
                    [Col.FIFTH]: Color.RED,
                    [Col.SIXTH]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.ORANGE,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                    [Col.FOURTH]: Color.ORANGE,
                    [Col.FIFTH]: Color.ORANGE,
                    [Col.SIXTH]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.YELLOW,
                    [Col.SECOND]: Color.YELLOW,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.YELLOW,
                    [Col.FIFTH]: Color.YELLOW,
                    [Col.SIXTH]: Color.YELLOW,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.GREEN,
                    [Col.SECOND]: Color.GREEN,
                    [Col.THIRD]: Color.GREEN,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.GREEN,
                    [Col.SIXTH]: Color.GREEN,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.CYAN,
                    [Col.SECOND]: Color.CYAN,
                    [Col.THIRD]: Color.CYAN,
                    [Col.FOURTH]: Color.CYAN,
                    [Col.FIFTH]: Color.CYAN,
                    [Col.SIXTH]: Color.CYAN,
                },
                [Row.SIXTH]: {
                    [Col.FIRST]: Color.BLUE,
                    [Col.SECOND]: Color.BLUE,
                    [Col.THIRD]: Color.BLUE,
                    [Col.FOURTH]: Color.BLUE,
                    [Col.FIFTH]: Color.BLUE,
                    [Col.SIXTH]: Color.LIGHT,
                }
            },
            [Size.X7]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                    [Col.FOURTH]: Color.RED,
                    [Col.FIFTH]: Color.RED,
                    [Col.SIXTH]: Color.RED,
                    [Col.SEVENTH]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.ORANGE,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                    [Col.FOURTH]: Color.ORANGE,
                    [Col.FIFTH]: Color.ORANGE,
                    [Col.SIXTH]: Color.ORANGE,
                    [Col.SEVENTH]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.YELLOW,
                    [Col.SECOND]: Color.YELLOW,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.YELLOW,
                    [Col.FIFTH]: Color.YELLOW,
                    [Col.SIXTH]: Color.YELLOW,
                    [Col.SEVENTH]: Color.YELLOW,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.GREEN,
                    [Col.SECOND]: Color.GREEN,
                    [Col.THIRD]: Color.GREEN,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.GREEN,
                    [Col.SIXTH]: Color.GREEN,
                    [Col.SEVENTH]: Color.GREEN,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.CYAN,
                    [Col.SECOND]: Color.CYAN,
                    [Col.THIRD]: Color.CYAN,
                    [Col.FOURTH]: Color.CYAN,
                    [Col.FIFTH]: Color.CYAN,
                    [Col.SIXTH]: Color.CYAN,
                    [Col.SEVENTH]: Color.CYAN,
                },
                [Row.SIXTH]: {
                    [Col.FIRST]: Color.BLUE,
                    [Col.SECOND]: Color.BLUE,
                    [Col.THIRD]: Color.BLUE,
                    [Col.FOURTH]: Color.BLUE,
                    [Col.FIFTH]: Color.BLUE,
                    [Col.SIXTH]: Color.BLUE,
                    [Col.SEVENTH]: Color.BLUE,
                },
                [Row.SEVENTH]: {
                    [Col.FIRST]: Color.PURPLE,
                    [Col.SECOND]: Color.PURPLE,
                    [Col.THIRD]: Color.PURPLE,
                    [Col.FOURTH]: Color.PURPLE,
                    [Col.FIFTH]: Color.PURPLE,
                    [Col.SIXTH]: Color.PURPLE,
                    [Col.SEVENTH]: Color.LIGHT,
                }
            }
        },
        [Method.FRIDGE]: {
            [Size.X2]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.LIGHT
                }
            },
            [Size.X3]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.LIGHT,
                }
            },
            [Size.X4]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                    [Col.FOURTH]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                    [Col.FOURTH]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.YELLOW,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.LIGHT,
                }
            },
            [Size.X5]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                    [Col.FOURTH]: Color.RED,
                    [Col.FIFTH]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                    [Col.FOURTH]: Color.ORANGE,
                    [Col.FIFTH]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.YELLOW,
                    [Col.FIFTH]: Color.YELLOW,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.GREEN,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.LIGHT,
                }
            },
            [Size.X6]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                    [Col.FOURTH]: Color.RED,
                    [Col.FIFTH]: Color.RED,
                    [Col.SIXTH]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                    [Col.FOURTH]: Color.ORANGE,
                    [Col.FIFTH]: Color.ORANGE,
                    [Col.SIXTH]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.YELLOW,
                    [Col.FIFTH]: Color.YELLOW,
                    [Col.SIXTH]: Color.YELLOW,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.GREEN,
                    [Col.SIXTH]: Color.GREEN,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.CYAN,
                    [Col.SIXTH]: Color.CYAN,
                },
                [Row.SIXTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.CYAN,
                    [Col.SIXTH]: Color.LIGHT,
                }
            },
            [Size.X7]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                    [Col.FOURTH]: Color.RED,
                    [Col.FIFTH]: Color.RED,
                    [Col.SIXTH]: Color.RED,
                    [Col.SEVENTH]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                    [Col.FOURTH]: Color.ORANGE,
                    [Col.FIFTH]: Color.ORANGE,
                    [Col.SIXTH]: Color.ORANGE,
                    [Col.SEVENTH]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.YELLOW,
                    [Col.FIFTH]: Color.YELLOW,
                    [Col.SIXTH]: Color.YELLOW,
                    [Col.SEVENTH]: Color.YELLOW,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.GREEN,
                    [Col.SIXTH]: Color.GREEN,
                    [Col.SEVENTH]: Color.GREEN,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.CYAN,
                    [Col.SIXTH]: Color.CYAN,
                    [Col.SEVENTH]: Color.CYAN,
                },
                [Row.SIXTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.CYAN,
                    [Col.SIXTH]: Color.BLUE,
                    [Col.SEVENTH]: Color.BLUE,
                },
                [Row.SEVENTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.CYAN,
                    [Col.SIXTH]: Color.BLUE,
                    [Col.SEVENTH]: Color.LIGHT,
                }
            }
        },
    },
    [Theme.DARK]: {
        [Method.DEFAULT]: {
            [Size.X2]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.LIGHTSTATEGREY
                }
            },
            [Size.X3]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.LIGHTSTATEGREY,
                }
            },
            [Size.X4]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.LIGHTSTATEGREY,
                }
            },
            [Size.X5]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.LIGHTSTATEGREY,
                }
            },
            [Size.X6]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                },
                [Row.SIXTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.LIGHTSTATEGREY,
                }
            },
            [Size.X7]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                    [Col.SEVENTH]: Color.DARK,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                    [Col.SEVENTH]: Color.DARK,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                    [Col.SEVENTH]: Color.DARK,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                    [Col.SEVENTH]: Color.DARK,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                    [Col.SEVENTH]: Color.DARK,
                },
                [Row.SIXTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                    [Col.SEVENTH]: Color.DARK,
                },
                [Row.SEVENTH]: {
                    [Col.FIRST]: Color.DARK,
                    [Col.SECOND]: Color.DARK,
                    [Col.THIRD]: Color.DARK,
                    [Col.FOURTH]: Color.DARK,
                    [Col.FIFTH]: Color.DARK,
                    [Col.SIXTH]: Color.DARK,
                    [Col.SEVENTH]: Color.LIGHTSTATEGREY,
                }
            }
        },
        [Method.LAYERED]: {
            [Size.X2]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.ORANGE,
                    [Col.SECOND]: Color.LIGHT
                }
            },
            [Size.X3]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.ORANGE,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.YELLOW,
                    [Col.SECOND]: Color.YELLOW,
                    [Col.THIRD]: Color.LIGHT,
                }
            },
            [Size.X4]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                    [Col.FOURTH]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.ORANGE,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                    [Col.FOURTH]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.YELLOW,
                    [Col.SECOND]: Color.YELLOW,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.YELLOW,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.GREEN,
                    [Col.SECOND]: Color.GREEN,
                    [Col.THIRD]: Color.GREEN,
                    [Col.FOURTH]: Color.LIGHT,
                }
            },
            [Size.X5]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                    [Col.FOURTH]: Color.RED,
                    [Col.FIFTH]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.ORANGE,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                    [Col.FOURTH]: Color.ORANGE,
                    [Col.FIFTH]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.YELLOW,
                    [Col.SECOND]: Color.YELLOW,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.YELLOW,
                    [Col.FIFTH]: Color.YELLOW,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.GREEN,
                    [Col.SECOND]: Color.GREEN,
                    [Col.THIRD]: Color.GREEN,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.GREEN,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.CYAN,
                    [Col.SECOND]: Color.CYAN,
                    [Col.THIRD]: Color.CYAN,
                    [Col.FOURTH]: Color.CYAN,
                    [Col.FIFTH]: Color.LIGHT,
                }
            },
            [Size.X6]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                    [Col.FOURTH]: Color.RED,
                    [Col.FIFTH]: Color.RED,
                    [Col.SIXTH]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.ORANGE,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                    [Col.FOURTH]: Color.ORANGE,
                    [Col.FIFTH]: Color.ORANGE,
                    [Col.SIXTH]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.YELLOW,
                    [Col.SECOND]: Color.YELLOW,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.YELLOW,
                    [Col.FIFTH]: Color.YELLOW,
                    [Col.SIXTH]: Color.YELLOW,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.GREEN,
                    [Col.SECOND]: Color.GREEN,
                    [Col.THIRD]: Color.GREEN,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.GREEN,
                    [Col.SIXTH]: Color.GREEN,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.CYAN,
                    [Col.SECOND]: Color.CYAN,
                    [Col.THIRD]: Color.CYAN,
                    [Col.FOURTH]: Color.CYAN,
                    [Col.FIFTH]: Color.CYAN,
                    [Col.SIXTH]: Color.CYAN,
                },
                [Row.SIXTH]: {
                    [Col.FIRST]: Color.BLUE,
                    [Col.SECOND]: Color.BLUE,
                    [Col.THIRD]: Color.BLUE,
                    [Col.FOURTH]: Color.BLUE,
                    [Col.FIFTH]: Color.BLUE,
                    [Col.SIXTH]: Color.LIGHT,
                }
            },
            [Size.X7]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                    [Col.FOURTH]: Color.RED,
                    [Col.FIFTH]: Color.RED,
                    [Col.SIXTH]: Color.RED,
                    [Col.SEVENTH]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.ORANGE,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                    [Col.FOURTH]: Color.ORANGE,
                    [Col.FIFTH]: Color.ORANGE,
                    [Col.SIXTH]: Color.ORANGE,
                    [Col.SEVENTH]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.YELLOW,
                    [Col.SECOND]: Color.YELLOW,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.YELLOW,
                    [Col.FIFTH]: Color.YELLOW,
                    [Col.SIXTH]: Color.YELLOW,
                    [Col.SEVENTH]: Color.YELLOW,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.GREEN,
                    [Col.SECOND]: Color.GREEN,
                    [Col.THIRD]: Color.GREEN,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.GREEN,
                    [Col.SIXTH]: Color.GREEN,
                    [Col.SEVENTH]: Color.GREEN,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.CYAN,
                    [Col.SECOND]: Color.CYAN,
                    [Col.THIRD]: Color.CYAN,
                    [Col.FOURTH]: Color.CYAN,
                    [Col.FIFTH]: Color.CYAN,
                    [Col.SIXTH]: Color.CYAN,
                    [Col.SEVENTH]: Color.CYAN,
                },
                [Row.SIXTH]: {
                    [Col.FIRST]: Color.BLUE,
                    [Col.SECOND]: Color.BLUE,
                    [Col.THIRD]: Color.BLUE,
                    [Col.FOURTH]: Color.BLUE,
                    [Col.FIFTH]: Color.BLUE,
                    [Col.SIXTH]: Color.BLUE,
                    [Col.SEVENTH]: Color.BLUE,
                },
                [Row.SEVENTH]: {
                    [Col.FIRST]: Color.PURPLE,
                    [Col.SECOND]: Color.PURPLE,
                    [Col.THIRD]: Color.PURPLE,
                    [Col.FOURTH]: Color.PURPLE,
                    [Col.FIFTH]: Color.PURPLE,
                    [Col.SIXTH]: Color.PURPLE,
                    [Col.SEVENTH]: Color.LIGHT,
                }
            }
        },
        [Method.FRIDGE]: {
            [Size.X2]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.LIGHT
                }
            },
            [Size.X3]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.LIGHT,
                }
            },
            [Size.X4]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                    [Col.FOURTH]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                    [Col.FOURTH]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.YELLOW,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.LIGHT,
                }
            },
            [Size.X5]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                    [Col.FOURTH]: Color.RED,
                    [Col.FIFTH]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                    [Col.FOURTH]: Color.ORANGE,
                    [Col.FIFTH]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.YELLOW,
                    [Col.FIFTH]: Color.YELLOW,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.GREEN,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.LIGHT,
                }
            },
            [Size.X6]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                    [Col.FOURTH]: Color.RED,
                    [Col.FIFTH]: Color.RED,
                    [Col.SIXTH]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                    [Col.FOURTH]: Color.ORANGE,
                    [Col.FIFTH]: Color.ORANGE,
                    [Col.SIXTH]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.YELLOW,
                    [Col.FIFTH]: Color.YELLOW,
                    [Col.SIXTH]: Color.YELLOW,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.GREEN,
                    [Col.SIXTH]: Color.GREEN,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.CYAN,
                    [Col.SIXTH]: Color.CYAN,
                },
                [Row.SIXTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.CYAN,
                    [Col.SIXTH]: Color.LIGHT,
                }
            },
            [Size.X7]: {
                [Row.FIRST]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.RED,
                    [Col.THIRD]: Color.RED,
                    [Col.FOURTH]: Color.RED,
                    [Col.FIFTH]: Color.RED,
                    [Col.SIXTH]: Color.RED,
                    [Col.SEVENTH]: Color.RED,
                },
                [Row.SECOND]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.ORANGE,
                    [Col.FOURTH]: Color.ORANGE,
                    [Col.FIFTH]: Color.ORANGE,
                    [Col.SIXTH]: Color.ORANGE,
                    [Col.SEVENTH]: Color.ORANGE,
                },
                [Row.THIRD]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.YELLOW,
                    [Col.FIFTH]: Color.YELLOW,
                    [Col.SIXTH]: Color.YELLOW,
                    [Col.SEVENTH]: Color.YELLOW,
                },
                [Row.FOURTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.GREEN,
                    [Col.SIXTH]: Color.GREEN,
                    [Col.SEVENTH]: Color.GREEN,
                },
                [Row.FIFTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.CYAN,
                    [Col.SIXTH]: Color.CYAN,
                    [Col.SEVENTH]: Color.CYAN,
                },
                [Row.SIXTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.CYAN,
                    [Col.SIXTH]: Color.BLUE,
                    [Col.SEVENTH]: Color.BLUE,
                },
                [Row.SEVENTH]: {
                    [Col.FIRST]: Color.RED,
                    [Col.SECOND]: Color.ORANGE,
                    [Col.THIRD]: Color.YELLOW,
                    [Col.FOURTH]: Color.GREEN,
                    [Col.FIFTH]: Color.CYAN,
                    [Col.SIXTH]: Color.BLUE,
                    [Col.SEVENTH]: Color.LIGHT,
                }
            }
        },
    },
};
