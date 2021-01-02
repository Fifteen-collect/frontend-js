import React, {useEffect} from "react";
import * as Helpers from "Helpers";
import {Context as ThemeContext} from "Types/Theme/Context";
import {Size} from "Types/Block/Size";
import useWindowSettings from "Components/useWindowSettings";
import useGameContext from "Components/Game/useGameContext";

export default () => {
  const appTheme = React.useContext(ThemeContext);
  const game = useGameContext();
  const windowSettings = useWindowSettings(game.size);

  useEffect(() => {
    if (game.matrix.length === 0) {
      const {matrix: randomMatrix, buffer: randomBuffer} = Helpers.matrixHelper.randomizeMatrix(
        Helpers.matrixHelper.createDefaultMatrix(game.size, game.method, game.theme),
        {
          x: game.size - 1,
          y: game.size - 1,
        }
      );

      game.setMatrix(randomMatrix);
      game.setBuffer(randomBuffer);
    }

    window.onkeydown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowLeft':
          if (game.buffer.x !== game.size - 1) {
            game.moveBlock(game.buffer.y, game.buffer.x + 1)
          }

          break;
        case 'ArrowRight':
          if (game.buffer.x !== 0) {
            game.moveBlock(game.buffer.y, game.buffer.x - 1)
          }

          break;
        case 'ArrowUp':
          if (game.buffer.y !== game.size - 1) {
            game.moveBlock(game.buffer.y + 1, game.buffer.x)
          }

          break;
        case 'ArrowDown':
          if (game.buffer.y !== 0) {
            game.moveBlock(game.buffer.y - 1, game.buffer.x)
          }

          break;
        default:
          break;
      }
    }
  }, [game.matrix]);

  return <React.Profiler id="Game container" onRender={Helpers.profilerHandler}>
    <div style={{height: windowSettings.windowSize.toString(10)}}>
      {game.matrix.map((row, currentRow) => <div key={currentRow} className="block-row">
        {row.map((block, currentColumn) => <div
          key={currentColumn}
          className="noselect block-node rounded-0 d-flex align-items-center justify-content-center border border-primary"
          onClick={() => game.moveBlock(currentRow, currentColumn)}
          onTouchStart={() => game.moveBlock(currentRow, currentColumn)}
          style={{
            height: `${Math.floor(windowSettings.relativeSize)}px`,
            color: appTheme.block.text,
            backgroundColor: !game.solved
              ? block.Color
              : (block.Value !== 0 ? appTheme.block.solved : block.Color),
            fontSize: game.size === Size.X6 || Size.X7 ? "2.2rem" : "2.5rem",
          }}
        >
          {block.Value !== 0 ? block.Value : ''}
        </div>)}
      </div>)}
    </div>
  </React.Profiler>
}
