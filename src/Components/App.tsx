import React from "react";
import {useTheme} from "Contexts/App/useTheme";
import * as Component from "Components";
import clsx from "clsx";
import useRoute from "Hooks/App/useRoute";
import {Route, Switch} from "react-router-dom";

const styles = {
  application: {
    mainContainer: clsx([
      'h-100',
      'd-flex',
      'flex-column',
      'justify-content-between'
    ]),
  },
  game: {
    mainContainer: clsx([
      'd-flex',
      'flex-column',
      'justify-content-between',
      'flex-fill',
    ]),
    blockContainer: clsx([
      'mb-auto',
      'mt-3',
    ]),
    buttons: {
      reset: {
        container: clsx([
          'shadow',
          'd-flex',
        ]),
        height: '48px',
      }
    }
  },
  timer: {
    container: clsx([
      'container',
      'mt-3',
    ]),
    wrapper: clsx([
      'row',
      'd-flex',
      'align-items-center',
      'justify-content-around'
    ]),
  }
}

export default () => {
  const {theme} = useTheme();
  const route = useRoute();

  return <Component.Application.ThemeContextProvider>
    <Component.Game.ContextProvider>
      <div
        className={styles.application.mainContainer}
        style={{backgroundColor: theme.styles.main.background}}
      >
        <Switch>
          <Route path={route.settings.path}>
            <Component.SettingsScreen/>
          </Route>
          <Route path={route.statistic.path}>
            <Component.Stats/>
          </Route>
          <Route path={route.game.path}>
            <div className={styles.game.mainContainer}>
              <div
                className={styles.game.buttons.reset.container}
                style={{height: styles.game.buttons.reset.height}}
              >
                <Component.Game.ResetButton/>
              </div>
              <div className={styles.timer.container}>
                <div className={styles.timer.wrapper}>
                  <Component.Game.Timer/>
                </div>
              </div>
              <div className={styles.game.blockContainer}>
                <Component.Game.Container/>
              </div>
            </div>
          </Route>
        </Switch>
        <Component.Navbar/>
      </div>
    </Component.Game.ContextProvider>
  </Component.Application.ThemeContextProvider>
}
