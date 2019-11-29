import * as React from "react";
import * as PropTypes from "prop-types";
import {Stats} from "./Stats";
import {Size} from "../Types/Block/Size";
import ResetHandler from "../Interfaces/ResetHandler";
import {Button as ResetButton} from "./Header/Reset/Button";
import {StatsButton} from "./Header/StatsButton";
import {Button as SettingsButton} from "./Header/Settings/Button";
import {Context as ThemeContext} from "../Types/Theme/Context";
import {ThemeProps} from "../Types/Theme/ColorScheme";

export interface HeaderProps {
    resetHandler: ResetHandler,
    openSettingsHandler: (event: React.MouseEvent<Element, MouseEvent>) => void,
    sizes: Size[],
}

export const HeaderPropTypes: { [T in keyof HeaderProps]: PropTypes.Validator<any> } = {
    resetHandler: PropTypes.func,
    openSettingsHandler: PropTypes.func,
    sizes: PropTypes.array,
};

export interface HeaderState {
    toggleSettings: boolean,
    toggleStats: boolean,
}

export class Header extends React.Component<HeaderProps, HeaderState> {
    public static readonly propTypes = HeaderPropTypes;
    public readonly state: HeaderState = {
        toggleSettings: false,
        toggleStats: false
    };

    public render(): React.ReactElement {
        return <ThemeContext.Consumer>
            {(theme: ThemeProps) => <div
                className={`container-fluid inner-content shadow mb-2`}
                style={{backgroundColor: theme.main.header.background}}
            >
                <div className="row p-2 d-flex align-items-center justify-content-between">
                    <ResetButton resetHandler={this.props.resetHandler}/>
                    <div className="text-center d-flex justify-content-end">
                        <StatsButton onClick={() => this.setState({toggleStats: true})}/>
                        <Stats
                            toggle={this.state.toggleStats}
                            sizes={this.props.sizes}
                            toggleHandler={() => this.setState({toggleStats: false})}
                        />
                        <SettingsButton
                            onClick={this.toggleSettings.bind(this)}
                            onClickCapture={this.props.openSettingsHandler}
                        />
                    </div>
                </div>
            </div>}
        </ThemeContext.Consumer>
    }

    toggleSettings(): void {
        this.setState({
            toggleSettings: !this.state.toggleSettings,
        })
    }
}
