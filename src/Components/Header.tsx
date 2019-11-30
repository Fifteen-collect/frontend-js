import * as React from "react";
import * as PropTypes from "prop-types";

import Stats from "Components/Stats";
import * as HeaderComponent from "Components/Header/index";

import {Size} from "Types/Block/Size";
import {Context as ThemeContext} from "Types/Theme/Context";

import ResetHandler from "Interfaces/ResetHandler";

interface HeaderProps {
    resetHandler: ResetHandler,
    openSettingsHandler: (event: React.MouseEvent<Element, MouseEvent>) => void,
    sizes: Size[],
}

Header.propTypes = {
    resetHandler: PropTypes.func,
    openSettingsHandler: PropTypes.func,
    sizes: PropTypes.array,
};

export default function Header({resetHandler, openSettingsHandler, sizes}: HeaderProps) {
    const [statsCollapsed, toggleStats] = React.useState(true);
    const [settingsCollapsed, toggleSettings] = React.useState(false);
    const theme = React.useContext(ThemeContext);

    return <div
        className="container-fluid inner-content shadow mb-2"
        style={{backgroundColor: theme.main.header.background}}
    >
        <div className="row p-2 d-flex align-items-center justify-content-between">
            <HeaderComponent.ResetButton resetHandler={resetHandler}/>
            <div className="text-center d-flex justify-content-end">
                <HeaderComponent.StatsButton onClick={() => toggleStats(!statsCollapsed)}/>
                <Stats collapse={statsCollapsed} sizes={sizes} toggle={() => toggleStats(!statsCollapsed)}/>
                <HeaderComponent.SettingsButton onClick={(event) => {
                    toggleSettings(!settingsCollapsed);
                    openSettingsHandler(event);
                }}/>
            </div>
        </div>
    </div>
}
