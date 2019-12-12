import * as React from "react";
import * as PropTypes from "prop-types";

import {Context as ThemeContext} from "Types/Theme/Context";
import {Size} from "Types/Block/Size";

export interface SizesProps {
    changeSize: (size: Size) => void;
    size: Size,
    sizes: Size[],
}

Sizes.propTypes = {
    changeSize: PropTypes.func,
    size: PropTypes.number,
    sizes: PropTypes.array,
} as { [T in keyof SizesProps]: PropTypes.Validator<any> };

export default function Sizes(props: SizesProps) {
    const currentTheme = React.useContext(ThemeContext);

    return <div className="row">
        {props.sizes.map(size => {
            const active = props.size === size ? 'active' : '';

            return <button
                type="button"
                key={size}
                className={`btn col-2 noselect ${currentTheme.button.classColor} ${active}`}
                style={{
                    color: props.size === size ? currentTheme.button.selectedText : currentTheme.button.text,
                }}
                onClick={() => props.changeSize(size)}
            >
                {size}
            </button>
        })}
    </div>
}
