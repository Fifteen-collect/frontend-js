import * as React from "react";
import {CSSProperties} from "react";
import * as PropTypes from "prop-types";
import Bar from "Components/Bar";
import {Context as ThemeContext} from "Types/Theme/Context";
import {GameContext} from "Types/GameContext";

export interface ContainerProps {
    matrix: Bar[][],
    style: CSSProperties,
    size?: number,
    relativeSize: number,
    clickHandler: (row: number, column: number) => void,
    touchHandler: (row: number, column: number) => void,
}

Container.propTypes = {
    matrix: PropTypes.array,
    style: PropTypes.object,
    size: PropTypes.number,
    relativeSize: PropTypes.number,
    clickHandler: PropTypes.func,
    touchHandler: PropTypes.func,
} as { [T in keyof ContainerProps]: PropTypes.Validator<any> };

export function Container(props: ContainerProps) {
    const theme = React.useContext(ThemeContext);
    const {solved} = React.useContext(GameContext);
    const relativeSize = Math.floor(props.relativeSize);

    return <div style={props.style}>
        {props.matrix.map((row, currentRow) => {
            return <div key={currentRow} className="block-row">
                {row.map((block, currentColumn) => {
                    return <div
                        key={currentColumn}
                        className="noselect block-node rounded d-flex align-items-center justify-content-center"
                        onClick={() => props.clickHandler(currentRow, currentColumn)}
                        onTouchStart={() => props.clickHandler(currentRow, currentColumn)}
                        style={{
                            height: `${relativeSize}px`,
                            color: theme.text,
                            backgroundColor: !solved
                                ? block.Color
                                : (block.Value !== 0 ? theme.block.solved : block.Color),
                            border: `1px solid ${theme.block.border}`,
                        }}
                    >
                        {block.Value !== 0 ? block.Value : ''}
                    </div>
                })}
            </div>
        })}
    </div>
}
