import * as React from "react";
import {CSSProperties} from "react";
import * as PropTypes from "prop-types";
import {Theme} from "../Types/Theme";
import {Color} from "../Types/Color";
import Bar from "./Bar";
import {ThemeContext} from "../Types/ThemeContext";
import {GameContext} from "../Types/GameContext";

export interface ContainerProps {
    matrix: Bar[][],
    style: CSSProperties,
    size?: number,
    relativeSize: number,
    clickHandler: (row: number, column: number) => void,
    touchHandler: (row: number, column: number) => void,
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

export function Container(props: ContainerProps): React.ReactElement {
    const relativeSize = Math.floor(props.relativeSize);

    return <ThemeContext.Consumer>
        {(theme: Theme) => <GameContext.Consumer>
            {({solved}) => <div style={props.style}>
                {props.matrix.map((row: Bar[], currentRow: number) => {
                    return <div key={currentRow} className="block-row">
                        {row.map((block: Bar, currentColumn: number) => {
                            const color = theme === Theme.DARK ? Color.LIGHTSTATEGREY : Color.LIGHT;
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
                                    color: theme === Theme.DARK ? Color.LIGHTSTATEGREY : Color.LIGHT,
                                    backgroundColor: !solved
                                        ? block.Color
                                        : (block.Value !== 0 ? (theme === Theme.LIGHT ? Color.SUCCESS : Color.DARKGREEN) : block.Color),
                                    border: `1px solid ${color}`,
                                }}
                            >
                                {block.Value !== 0 ? block.Value : ''}
                            </div>
                        })}
                    </div>
                })}
            </div>}
        </GameContext.Consumer>}
    </ThemeContext.Consumer>
}
