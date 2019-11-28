import * as React from "react";
import {ReactElement} from "react";
import * as PropTypes from "prop-types";
import {Stats} from "./Stats";
import {Size} from "../Types/Block/ColorScheme";
import {Theme} from "../Types/Theme";
import ResetHandler from "../Interfaces/ResetHandler";
import {ResetButton} from "./Header/ResetButton";
import {Timer} from "./Header/Timer";
import {StatsButton} from "./Header/StatsButton";
import {Color} from "../Types/Color";
import {ThemeContext} from "../Types/ThemeContext";
import {GameContext} from "../Types/GameContext";

export interface HeaderProps {
    resetHandler: ResetHandler,
    startTime: number,
    moves: number,
    openSettingsHandler: (event: React.MouseEvent<Element, MouseEvent>) => void,
    sizes: Size[],
}

export const HeaderPropTypes: { [T in keyof HeaderProps]: PropTypes.Validator<any> } = {
    resetHandler: PropTypes.func,
    openSettingsHandler: PropTypes.func,
    startTime: PropTypes.number,
    moves: PropTypes.number,
    sizes: PropTypes.array,
};

export interface HeaderState {
    additionalMenuToggle: boolean,
    toggleSettings: boolean,
    toggleStats: boolean,
}

export class Header extends React.Component<HeaderProps, HeaderState> {
    public static readonly propTypes = HeaderPropTypes;
    public readonly state: HeaderState = {
        additionalMenuToggle: false,
        toggleSettings: false,
        toggleStats: false
    };

    public render(): ReactElement {
        return <ThemeContext.Consumer>
            {(theme: Theme) => <div
                className={`container-fluid inner-content shadow mb-2`}
                style={{
                    backgroundColor: theme === Theme.DARK ? Color.DEEPDARK : Color.LIGHT,
                }}
            >
                <div className="row p-2 d-flex align-items-center justify-content-between">
                    <ResetButton resetHandler={this.props.resetHandler}/>
                    <div className="text-center col-10 d-flex justify-content-around">
                        {!this.state.additionalMenuToggle
                            ? <Timer startTime={this.props.startTime} moves={this.props.moves}/>
                            : <>
                                <StatsButton onClick={() => this.setState({toggleStats: true})}/>
                                <Stats
                                    toggle={this.state.toggleStats}
                                    sizes={this.props.sizes}
                                    toggleHandler={() => this.setState({toggleStats: false})}
                                />
                                <button
                                    className={`btn btn-sm btn-block mr-3 ml-3 mt-0 p-1 d-flex justify-content-center align-items-center ${theme === Theme.DARK ? 'btn-dark text-white-50' : 'btn-primary'}`}
                                    onClick={this.toggleSettings.bind(this)}
                                    onClickCapture={this.props.openSettingsHandler}
                                >
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="cog"
                                        className={`svg-inline--fa fa-cog fa-w-16 mr-2`}
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        style={{
                                            width: '1rem',
                                            pointerEvents: "none",
                                        }}
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
                                        />
                                    </svg>
                                    Settings
                                </button>
                            </>}
                    </div>
                    <button
                        className={`btn btn-sm col-1 p-1 ${theme === Theme.DARK ? 'btn-dark' : 'btn-primary'}`}
                        onClick={() => {
                            this.setState({
                                additionalMenuToggle: !this.state.additionalMenuToggle,
                                toggleSettings: false,
                            });
                        }}
                    >
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="ellipsis-h"
                            className={`svg-inline--fa fa-ellipsis-h fa-w-16 ${theme === Theme.DARK ? 'text-white-50' : 'text-white'}`}
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            style={{
                                width: '1rem',
                                pointerEvents: "none",
                            }}
                        >
                            <path fill="currentColor"
                                  d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"/>
                        </svg>
                    </button>
                </div>
            </div>}
        </ThemeContext.Consumer>
    }

    toggleSettings() {
        this.setState({
            toggleSettings: !this.state.toggleSettings,
        })
    }
}
