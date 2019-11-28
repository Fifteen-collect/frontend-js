import * as React from "react";
import {CSSProperties} from "react";
import * as PropTypes from "prop-types";
import {Theme} from "../Types/Theme";
import {Color} from "../Types/Color";
import Bar from "./Bar";

export interface ContainerProps {
    matrix: Bar[][],
    style: CSSProperties,
    size?: number,
    solved: boolean,
    relativeSize: number,
    theme: Theme,
    clickHandler: (row: number, column: number) => void,
    touchHandler: (row: number, column: number) => void,
}

export function Container(props: ContainerProps): React.ReactElement {
    const relativeSize = Math.floor(props.relativeSize);

    return <div style={props.style}>
        {props.matrix.map((row: Bar[], currentRow: number) => {
            return <div key={currentRow} className="block-row">
                {row.map((block: Bar, currentColumn: number) => {
                    const color = props.theme === Theme.DARK ? Color.LIGHTSTATEGREY : Color.LIGHT;
                    return <div
                        key={`${currentRow}-${currentColumn}`}
                        className={`noselect block-node rounded d-flex align-items-center justify-content-center`}
                        onMouseDown={() => {
                            props.clickHandler(currentRow, currentColumn);
                        }}
                        onTouchStart={() => {
                            props.touchHandler(currentRow, currentColumn);
                        }}
                        style={{
                            height: `${relativeSize}px`,
                            color: props.theme === Theme.DARK ? Color.LIGHTSTATEGREY : Color.LIGHT,
                            backgroundColor: !props.solved
                                ? block.Color
                                : (block.Value !== 0 ? (props.theme === Theme.LIGHT ? Color.SUCCESS : Color.DARKGREEN) : block.Color),
                            border: `1px solid ${color}`,
                        }}
                    >
                        {block.Value !== 0 ? block.Value : ''}
                    </div>
                })}
            </div>;
        })}
    </div>
}

Container.propTypes = {
    style: PropTypes.object,
    size: PropTypes.number,
    theme: PropTypes.string,
    solved: PropTypes.bool,
    relativeSize: PropTypes.number,
    color: PropTypes.string,
    clickHandler: PropTypes.func,
    touchHandler: PropTypes.func,
};
