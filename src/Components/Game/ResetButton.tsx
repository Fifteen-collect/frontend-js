import React, {useMemo} from "react";
import * as Storage from "Storage";
import useGameContext from "Contexts/Game/useGameContext";
import clsx from "clsx";
import {useTheme} from "Contexts/App/useTheme";

const styles = {
  button: clsx([
    'btn',
    'btn-sm',
    'text-primary',
    'rounded-0',
    'bg-white',
    'd-flex',
    'flex-fill',
    'justify-content-center',
    'align-items-center',
  ]),
  svg: {
    width: '2rem',
  }
}

export default () => {
  const {theme} = useTheme();
  const game = useGameContext();

  return useMemo(() => <button
    className={styles.button}
    onClick={() => {
      if (!game.solved) {
        Storage.StatCounts.incrementStat(game.size, Storage.StatCounts.RESETS_COUNTS_KEY);
      }

      game.reset(game.size);
    }}
    style={{
      backgroundColor: theme.styles.button.background,
      color: theme.styles.text,
    }}
  >
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="undo-alt"
      className="svg-inline--fa fa-undo-alt fa-w-16"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style={{
        pointerEvents: "none",
        ...styles.svg,
      }}
    >
      <path
        fill="currentColor"
        d="M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z"
      />
    </svg>
  </button>, [game.theme])
}
