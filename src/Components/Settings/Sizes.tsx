import * as React from "react";
import {Size} from "Types/Block/Size";
import clsx from "clsx";
import {useTheme} from "Contexts/App/useTheme";

export interface ISizesProps {
  changeSize: (size: Size) => void;
  size: Size,
  sizes: Size[],
}

const styles = {
  default: {
    row: 'row',
  },
  button: [
    'btn',
    'col-2',
    'noselect',
  ],
  active: 'active',
}

export default (props: ISizesProps) => {
  const {theme} = useTheme();

  return <div className={styles.default.row}>
    {props.sizes.map(size => <button
      type="button"
      key={size}
      className={clsx(
        styles.button,
        theme.styles.button.classColor,
        props.size === size ? styles.active : null
      )}
      style={{
        color: props.size === size
          ? theme.styles.button.selectedText
          : theme.styles.button.text,
      }}
      onClick={() => props.changeSize(size)}
    >
      {size}
    </button>)}
  </div>
}
