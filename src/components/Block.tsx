import * as React from "react";
import * as PropTypes from "prop-types";
import {ReactElement} from "react";

export interface BlockProps {
    value: number,
    size: number,
    clickHandler: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    touchHandler: (event: React.TouchEvent<HTMLDivElement>) => void,
    color: string,
}

Block.propTypes = {
    value: PropTypes.number,
    size: PropTypes.number,
    clickHandler: PropTypes.func,
    touchHandler: PropTypes.func,
    color: PropTypes.string,
};

function Block({size, clickHandler, touchHandler, color, value}: BlockProps): ReactElement {
    const relativeSize = Math.floor(size);

    return <div
        className={`noselect border rounded text-light d-flex align-items-center justify-content-center`}
        onMouseDown={clickHandler}
        onTouchStart={touchHandler}
        style={{
            flex: `0 0 ${relativeSize}px`,
            fontSize: '3rem',
            cursor: 'pointer',
            backgroundColor: color,
        }}
    >
        {value}
    </div>
}

export default Block;
