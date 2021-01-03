import React, {useEffect} from "react";
import * as Helpers from "Helpers";
import {Size} from "Types/Block/Size";
import useWindowSettings from "Hooks/App/useWindowSettings";
import useGameContext from "Contexts/Game/useGameContext";
import clsx from "clsx";
import {useTheme} from "Contexts/App/useTheme";

const styles = {
  blocks: {
    row: {
      container: 'block-row',
    },
    block: {
      main: [
        'noselect',
        'block-node',
        'rounded-0',
        'd-flex',
        'align-items-center',
        'justify-content-center',
        'border-primary',
        'border',
      ],
      font: {
        size: {
          small: '2.2rem',
          default: '2.5rem',
        }
      }
    }
  },
  border: {
    left: {
      none: 'border-left-0',
    },
    right: {
      none: 'border-right-0',
    }
  }
}

export default () => {
  const {theme} = useTheme();
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

  return <div style={{height: windowSettings.windowSize.toString(10)}}>
    {game.matrix.map((
      row,
      currentRow
    ) => <div key={currentRow} className={styles.blocks.row.container}>
      {row.map((
        block,
        currentColumn,
        cols
      ) => <div
        key={currentColumn}
        className={clsx([
          styles.blocks.block.main,
          currentColumn === 0 ? styles.border.left.none : null,
          currentColumn === cols.length - 1 ? styles.border.right.none : null
        ])}
        onClick={() => game.moveBlock(currentRow, currentColumn)}
        onTouchStart={() => game.moveBlock(currentRow, currentColumn)}
        style={{
          height: `${Math.floor(windowSettings.relativeSize)}px`,
          color: theme.styles.block.text,
          backgroundColor: !game.solved
            ? block.Color
            : (block.Value !== 0 ? theme.styles.block.solved : block.Color),
          fontSize: game.size === Size.X6 || Size.X7
            ? styles.blocks.block.font.size.small
            : styles.blocks.block.font.size.default,
        }}
      >
        {block.Value !== 0 ? block.Value : ''}
      </div>)}
    </div>)}
  </div>
}
