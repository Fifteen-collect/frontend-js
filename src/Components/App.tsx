import React, {useMemo} from "react";
import * as Component from "Components";
import * as Helpers from "Helpers";
import * as Types from "Types";
import {Route, Switch} from "react-router-dom";
import useGameContext from "Components/Game/useGameContext";

export default () => {
  const game = useGameContext();

  return <Types.AppTheme.Context.Provider value={Types.AppTheme.AppScheme[game.theme]}>
    <Component.Game.ContextProvider>
      <React.Profiler id="Application" onRender={Helpers.profilerHandler}>
        <div
          className="main h-100 d-flex flex-column justify-content-between"
          style={{
            backgroundColor: Types.AppTheme.AppScheme[game.theme].main.background
          }}
        >
          <Switch>
            <Route path={"/settings"}>
              {useMemo(() => <Component.SettingsScreen/>, [game.theme, game.method, game.size])}
            </Route>
            <Route path={"/statistic"}>
              <Component.Stats/>
            </Route>
            <Route path={"/"}>
              <div className="d-flex flex-column justify-content-between flex-fill">
                <div className="shadow d-flex" style={{height: "48px"}}>
                  {useMemo(() => <Component.Game.ResetButton/>, [game.theme])}
                </div>
                <div className="container mt-3">
                  <div className="row d-flex align-items-center justify-content-around">
                    <Component.Game.Timer/>
                  </div>
                </div>
                <div className="mb-auto mt-3">
                  <Component.Game.Container/>
                </div>
              </div>
            </Route>
          </Switch>
          {useMemo(() => <Component.Navbar/>, [game.theme])}
        </div>
      </React.Profiler>
    </Component.Game.ContextProvider>
  </Types.AppTheme.Context.Provider>
}
