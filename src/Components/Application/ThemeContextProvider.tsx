import React from "react";
import {UseTheme} from "Contexts/App/useTheme";
import useTheme from "Hooks/App/useTheme";

export default (props: {children: any}) => {
  const theme = useTheme();

  return <UseTheme.Provider value={theme}>
    {props.children}
  </UseTheme.Provider>
}
