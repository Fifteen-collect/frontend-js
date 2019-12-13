import * as React from "react";
import {CSSProperties} from "react";
import * as PropTypes from "prop-types";
import Bar from "Components/Bar";
import {Context as ThemeContext} from "Types/Theme/Context";
import {GameContext} from "Types/GameContext";
import {Buffer} from "Helpers/randomizeMatrix";
import {Size} from "Types/Block/Size";

export interface ContainerProps {
    matrix: Bar[][],
    style: CSSProperties,
    buffer: Buffer,
    relativeSize: number,
    moveHandler: (row: number, column: number) => void,
}

Container.propTypes = {
    matrix: PropTypes.array,
    style: PropTypes.object,
    buffer: PropTypes.object,
    relativeSize: PropTypes.number,
    moveHandler: PropTypes.func,
} as { [T in keyof ContainerProps]: PropTypes.Validator<any> };

export function Container(props: ContainerProps) {
    const theme = React.useContext(ThemeContext);
    const {solved, size} = React.useContext(GameContext);
    const relativeSize = Math.floor(props.relativeSize);

    React.useEffect(() => {
        window.onkeydown = (event: KeyboardEvent) => {
            switch (event.code) {
                case 'ArrowLeft':
                    props.buffer.x !== size - 1 && props.moveHandler(props.buffer.y, props.buffer.x + 1);
                    break;
                case 'ArrowRight':
                    props.buffer.x !== 0 && props.moveHandler(props.buffer.y, props.buffer.x - 1);
                    break;
                case 'ArrowUp':
                    props.buffer.y !== size - 1 && props.moveHandler(props.buffer.y + 1, props.buffer.x);
                    break;
                case 'ArrowDown':
                    props.buffer.y !== 0 && props.moveHandler(props.buffer.y - 1, props.buffer.x);
                    break;
            }
        }
    }, [props]);

    return <div style={props.style}>
        {props.matrix.map((row, currentRow) => {
            return <div key={currentRow} className="block-row">
                {row.map((block, currentColumn) => {
                    return <div
                        key={currentColumn}
                        className="noselect block-node rounded d-flex align-items-center justify-content-center"
                        onClick={() => props.moveHandler(currentRow, currentColumn)}
                        onTouchStart={() => props.moveHandler(currentRow, currentColumn)}
                        style={{
                            height: `${relativeSize}px`,
                            color: theme.text,
                            backgroundColor: !solved
                                ? block.Color
                                : (block.Value !== 0 ? theme.block.solved : block.Color),
                            fontSize: size === Size.X6 || Size.X7 ? "2.2rem" : "2.5rem",
                        }}
                    >
                        {block.Value !== 0 ? block.Value : ''}
                    </div>
                })}
            </div>
        })}
    </div>
}
