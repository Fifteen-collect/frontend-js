import * as React from "react";
import {CSSProperties} from "react";
import * as PropTypes from "prop-types";
import Bar from "Components/Bar";
import {Context as ThemeContext} from "Types/Theme/Context";
import {GameContext} from "Types/GameContext";
import {ThemeProps} from "Types/Theme/ColorScheme";

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
        {(theme: ThemeProps) => <GameContext.Consumer>
            {({solved}) => <div style={props.style}>
                {props.matrix.map((row: Bar[], currentRow: number) => {
                    return <div key={currentRow} className="block-row">
                        {row.map((block: Bar, currentColumn: number) => {
                            return <div
                                key={`${currentRow}-${currentColumn}`}
                                className={`noselect block-node rounded d-flex align-items-center justify-content-center`}
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
            </div>}
        </GameContext.Consumer>}
    </ThemeContext.Consumer>
}
