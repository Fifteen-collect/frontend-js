import * as React from "react";
import {CSSProperties} from "react";
import * as Helpers from "Helpers";
import Bar from "Components/Bar";
import {Context as ThemeContext} from "Types/Theme/Context";
import {GameContext} from "Types/GameContext";
import {Size} from "Types/Block/Size";

export interface IContainerProps {
  buffer: Helpers.matrixHelper.IBuffer,
  matrix: Bar[][],
  moveHandler: (row: number, column: number) => void,
  relativeSize: number,
  style: CSSProperties,
}

export default (props: IContainerProps) => {
  const theme = React.useContext(ThemeContext);
  const {solved, size} = React.useContext(GameContext);
  const relativeSize = Math.floor(props.relativeSize);

  React.useEffect(() => {
    window.onkeydown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowLeft':
          if (props.buffer.x !== size - 1) {
            props.moveHandler(props.buffer.y, props.buffer.x + 1)
          }

          break;
        case 'ArrowRight':
          if (props.buffer.x !== 0) {
            props.moveHandler(props.buffer.y, props.buffer.x - 1)
          }

          break;
        case 'ArrowUp':
          if (props.buffer.y !== size - 1) {
            props.moveHandler(props.buffer.y + 1, props.buffer.x)
          }

          break;
        case 'ArrowDown':
          if (props.buffer.y !== 0) {
            props.moveHandler(props.buffer.y - 1, props.buffer.x)
          }

          break;
        default:
          break;
      }
    }
  }, [props]);

  return <div style={props.style}>
    {props.matrix.map((
      row,
      currentRow
      ) => <div
        key={currentRow}
        className="block-row"
      >
        {row.map((block, currentColumn) => <div
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
        </div>)}
      </div>
    )}
  </div>
}
