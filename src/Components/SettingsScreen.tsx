import * as React from "react";
import Sizes from "Components/Settings/Sizes";
import useApplicationSetup from "Hooks/App/useApplicationSetup";
import * as Storage from "Storage";
import * as Types from "Types";
import useGameContext from "Contexts/Game/useGameContext";
import {useTheme} from "Contexts/App/useTheme";

export default () => {
  const {theme} = useTheme();
  const appSetup = useApplicationSetup();
  const game = useGameContext();

  return <div className="container-fluid mt-1">
    <h5 className="modal-title">Settings</h5>
    <div className="container-fluid mt-1">
      Themes:
      <div className="row">
        {appSetup.availableThemes.map(availableTheme => {
          const classColor = theme.styles.button.classColor;
          const active = game.theme === availableTheme ? 'active' : '';

          return <button
            type={"button"}
            key={availableTheme}
            className={`btn col-6 noselect ${classColor} ${active}`}
            onClick={() => {
              game.setTheme(availableTheme);
              game.reset(game.size, availableTheme);
              Storage.Themes.saveThemeToStorage(availableTheme);
            }}
            style={{
              color: game.theme === availableTheme
                ? theme.styles.button.selectedText
                : theme.styles.button.text,
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
        {appSetup.availableMethods.map(method => {
          const classColor = theme.styles.button.classColor;
          const active = game.method === method ? 'active' : '';

          return <button
            type="button"
            key={method}
            className={`btn col-4 noselect ${classColor} ${active}`}
            onClickCapture={() => {
              game.setMethod(method);
              game.matrix.forEach(row => {
                row.forEach(block => {
                  block.Color = Types.ColorScheme[game.theme][method][game.size][block.X][block.Y]
                });
              });
              game.setMethod(method);
              game.setMatrix(game.matrix);
            }}
            style={{
              color: game.method === method
                ? theme.styles.button.selectedText
                : theme.styles.button.text,
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
        size={game.size}
        sizes={appSetup.availableSizes}
        changeSize={size => game.reset(size)}
      />
    </div>
  </div>;
}
