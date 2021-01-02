import * as React from "react";
import Sizes from "Components/Settings/Sizes";
import {Method} from "Types/Method";
import {Theme} from "Types/Theme";
import {Context as ThemeContext} from "Types/Theme/Context";

export interface ISettingsScreenProps {
  changeMethodHandler: (method: Method) => void;
  changeTheme: (theme: Theme) => void;
  currentSize: number,
  currentThemeType: string,
  methods: Method[],
  pinSizes: boolean,
  pinSizeToTop: (event: React.ChangeEvent) => void,
  resetHandler: (size: number) => void;
  sizes: number[],
  themes: Theme[],
}

export default (props: ISettingsScreenProps) => {
  const [currentMethod, setMethod] = React.useState(Method.DEFAULT);
  const currentTheme = React.useContext(ThemeContext);

  return <div className="container-fluid mt-1">
    <h5 className="modal-title">Settings</h5>
    <div className="container-fluid mt-1">
      Themes:
      <div className="row">
        {props.themes.map(availableTheme => {
          const classColor = currentTheme.button.classColor;
          const active = props.currentThemeType === availableTheme ? 'active' : '';

          return <button
            type={"button"}
            key={availableTheme}
            className={`btn col-6 noselect ${classColor} ${active}`}
            onClick={() => props.changeTheme(availableTheme)}
            style={{
              color: props.currentThemeType === availableTheme
                ? currentTheme.button.selectedText
                : currentTheme.button.text,
            }}
          >
            {availableTheme}
          </button>
        })}
      </div>
    </div>
    <div className="container-fluid mt-1">
      Color scheme for blocks
      <div className="row">
        {props.methods.map(method => {
          const classColor = currentTheme.button.classColor;
          const active = currentMethod === method ? 'active' : '';

          return <button
            type="button"
            key={method}
            className={`btn col-4 noselect ${classColor} ${active}`}
            onClickCapture={() => {
              setMethod(method);
              props.changeMethodHandler(method);
            }}
            style={{
              color: currentMethod === method
                ? currentTheme.button.selectedText
                : currentTheme.button.text,
            }}
          >
            {method}
          </button>
        })}
      </div>
    </div>
    <div className="container-fluid mt-1">
      Available puzzle's sizes
      <Sizes
        size={props.currentSize}
        sizes={props.sizes}
        changeSize={size => props.resetHandler(size)}
      />
    </div>
    <div className="container-fluid mt-1">
      <div className="row d-flex justify-content-center align-content-center align-items-center">
        <span>Pin sizes to top</span>
        <label className="switch m-0 ml-3" htmlFor="checkbox">
          <input
            type="checkbox"
            id="checkbox"
            checked={props.pinSizes}
            onChange={props.pinSizeToTop}
          />
          <div className="slider round"/>
        </label>
      </div>
    </div>
  </div>;
}
