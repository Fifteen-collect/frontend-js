import React, {useEffect} from "react";
import * as Helpers from "Helpers";
import {Size} from "Types/Block/Size";
import useWindowSettings from "Hooks/App/useWindowSettings";
import useGameContext from "Contexts/Game/useGameContext";
import clsx from "clsx";
import {useTheme} from "Contexts/App/useTheme";
import {Color} from "Types";

const styles = {
  blocks: {
    row: {
      container: 'block-row',
    },
    block: {
      main: clsx(
        'noselect',
        'block-node',
        'rounded-0',
        'd-flex',
        'align-items-center',
        'justify-content-center',
      ),
      font: {
        size: {
          small: '2.2rem',
          default: '3rem',
        }
      }
    }
  },
  border: {
    enable: 'border',
    disable: 'border-0',
    color: {
      white: 'border-white',
    },
    left: {
      none: 'border-left-0',
      default: 'border-left',
    },
    right: {
      none: 'border-right-0',
      default: 'border-right',
    },
    top: {
      none: 'border-top-0',
      default: 'border-top',
      primary: 'border-top-primary',
    },
    bottom: {
      none: 'border-bottom-0',
      default: 'border-bottom',
      primary: 'border-bottom-primary',
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

  return <div
    className={clsx(styles.border.top.primary, styles.border.bottom.primary)}
    style={{height: windowSettings.windowSize.toString(10)}}
  >
    {game.matrix.map((
      row,
      currentRow,
      rows
    ) => <div key={currentRow} className={styles.blocks.row.container}>
      {row.map((
        block,
        currentColumn,
        cols
      ) => <div
        key={currentColumn}
        className={clsx(
          styles.blocks.block.main,
          styles.border.color.white,
          currentColumn === 0 ? styles.border.left.none : null,
          currentColumn === cols.length - 1 ? styles.border.right.none : null,
          !game.solved ? styles.border.enable : styles.border.disable
        )}
        onClick={() => game.moveBlock(currentRow, currentColumn)}
        onTouchStart={() => game.moveBlock(currentRow, currentColumn)}
        style={{
          height: `${Math.floor(windowSettings.relativeSize)}px`,
          color: theme.styles.block.text,
          backgroundColor: block.X === game.buffer.x && block.Y === game.buffer.y && game.solved
            ? Color.LIGHT
            : block.Color,
          fontSize: game.size === Size.X6 || game.size === Size.X7
            ? styles.blocks.block.font.size.small
            : styles.blocks.block.font.size.default,
        }}
      >
        {block.Value !== 0 ? block.Value : ''}
      </div>)}
    </div>)}
  </div>
}
