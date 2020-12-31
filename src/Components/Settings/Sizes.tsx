import * as React from "react";
import {Context as ThemeContext} from "Types/Theme/Context";
import {Size} from "Types/Block/Size";

export interface ISizesProps {
  changeSize: (size: Size) => void;
  size: Size,
  sizes: Size[],
}

export default (props: ISizesProps) => {
  const currentTheme = React.useContext(ThemeContext);

  return <div className="row">
    {props.sizes.map(size => <button
      type="button"
      key={size}
      className={`btn col-2 noselect ${currentTheme.button.classColor} ${props.size === size ? 'active' : ''}`}
      style={{
        color: props.size === size ? currentTheme.button.selectedText : currentTheme.button.text,
      }}
      onClick={() => props.changeSize(size)}
    >
      {size}
    </button>)}
  </div>
}
