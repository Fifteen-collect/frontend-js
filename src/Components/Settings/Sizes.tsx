import * as React from "react";
import {ThemeProps} from "Types/Theme/ColorScheme";
import {Context as ThemeContext} from "Types/Theme/Context";
import {Size} from "Types/Block/Size";

export interface SizesProps {
    changeSize: (size: Size) => void;
    size: Size,
    sizes: Size[],
}

export function Sizes(props: SizesProps) {
    return <ThemeContext.Consumer>
        {(currentTheme: ThemeProps) => <div className="row">
            {props.sizes.map((size: number) => {
                return <button
                    type="button"
                    key={size}
                    className={`btn col-2 noselect ${currentTheme.button.classColor} ${props.size === size ? 'active' : ''}`}
                    style={{
                        color: props.size === size ? currentTheme.button.selectedText : currentTheme.button.text,
                    }}
                    onClick={() => props.changeSize(size)}
                >
                    {size}
                </button>
            })}
        </div>}
    </ThemeContext.Consumer>
}
