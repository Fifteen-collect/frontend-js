import * as React from "react";
import * as PropTypes from "prop-types";
import {ReactElement} from "react";
import {Theme} from "../Types/Theme";
import {Color} from "../Types/Color";

export interface BlockProps {
    value: number,
    size: number,
    clickHandler: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    touchHandler: (event: React.TouchEvent<HTMLDivElement>) => void,
    color: Color,
    theme: Theme,
}

Block.propTypes = {
    value: PropTypes.number,
    size: PropTypes.number,
    clickHandler: PropTypes.func,
    touchHandler: PropTypes.func,
    color: PropTypes.string,
};

function Block({size, clickHandler, touchHandler, color, value, theme}: BlockProps): ReactElement {
    const relativeSize = Math.floor(size);

    return <div
        className={`noselect block-node border rounded text-light d-flex align-items-center justify-content-center`}
        onMouseDown={clickHandler}
        onTouchStart={touchHandler}
        style={{
            height: `${relativeSize}px`,
            backgroundColor: color,
        }}
    >
        {value}
    </div>
}

export default Block;
