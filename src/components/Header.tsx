import * as React from "react";
import {ReactElement} from "react";
import * as PropTypes from "prop-types";
import parseMs, {Parsed} from "parse-ms";
import {HeaderState} from "types/HeaderState";
import {PersonalBest} from "./PersonalBest";
import {Stats} from "./Stats";
import {Size} from "types/ColorScheme";

export interface HeaderProps {
    resetHandler: (event: React.MouseEvent<Element, MouseEvent>) => void,
    startTime: number,
    moves: number,
    solved: boolean,
    openSettingsHandler: (event: React.MouseEvent<Element, MouseEvent>) => void,
    run: boolean,
    sizes: Size[],
}

export const HeaderPropTypes: { [T in keyof HeaderProps]: PropTypes.Validator<any> } = {
    resetHandler: PropTypes.func,
    openSettingsHandler: PropTypes.func,
    startTime: PropTypes.number,
    moves: PropTypes.number,
    solved: PropTypes.bool,
    run: PropTypes.bool,
    sizes: PropTypes.array,
};

export class Header extends React.Component<HeaderProps, HeaderState> {
    public static readonly propTypes = HeaderPropTypes;
    public readonly state: HeaderState = {
        currentTime: 0,
        intervalUpdateId: undefined,
        lastSolveTime: 0,
        additionalMenuToggle: false,
        toggleSettings: false,
        toggleStats: false
    };

    public render(): ReactElement {
        let time: Parsed = parseMs(0);
        if (!this.props.run && this.props.solved) {
            time = parseMs(this.state.lastSolveTime);
        } else if (this.state.currentTime !== 0) {
            let milliseconds = this.state.currentTime - this.props.startTime;
            time = parseMs(milliseconds);
        }

        return <div className="container-fluid inner-content border-bottom shadow mb-2">
            <div className="row p-2 d-flex align-items-center justify-content-between">
                <button
                    className="btn btn-primary btn-sm col-1 p-1 d-flex justify-content-center align-items-center"
                    onClickCapture={this.props.resetHandler}
                >
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="undo-alt"
                        className="svg-inline--fa fa-undo-alt fa-w-16 mt-1"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        style={{
                            width: '1rem',
                            pointerEvents: "none",
                        }}
                    >
                        <path fill="currentColor"
                              d="M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z"/>
                    </svg>
                </button>
                <div className="text-center col-10 d-flex justify-content-around">
                    {this.state.additionalMenuToggle === false
                        ? <GameStats
                            time={time}
                            solved={this.props.solved}
                            lastSolveTime={this.state.lastSolveTime}
                            moves={this.props.moves}
                        />
                        : <>
                            <button
                                className="btn btn-sm btn-block mr-3 ml-3 btn-primary p-1 d-flex justify-content-center align-items-center"
                                onClick={() => {
                                    this.setState({toggleStats: true});
                                }}
                            >
                                <svg aria-hidden="true"
                                     focusable="false"
                                     data-prefix="far"
                                     data-icon="star"
                                     className="svg-inline--fa fa-star fa-w-18 mr-2"
                                     role="img"
                                     xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 576 512"
                                     style={{
                                         width: '1rem',
                                         pointerEvents: "none",
                                     }}
                                >
                                    <path
                                        fill="currentColor"
                                        d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                                    />
                                </svg>
                                Stats
                            </button>
                            <Stats
                                toggle={this.state.toggleStats}
                                sizes={this.props.sizes}
                                toggleHandler={() => this.setState({toggleStats: false})}
                            />
                            <button
                                className="btn btn-sm btn-block btn-primary mr-3 ml-3 mt-0 p-1 d-flex justify-content-center align-items-center"
                                onClick={this.toggleSettings.bind(this)}
                                onClickCapture={this.props.openSettingsHandler}
                            >
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="cog"
                                    className="svg-inline--fa fa-cog fa-w-16 mr-2"
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
                    className="btn btn-sm btn-primary col-1 p-1"
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
                        className="svg-inline--fa fa-ellipsis-h fa-w-16"
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
        </div>
    }

    componentDidMount(): void {
        this.state.intervalUpdateId = setInterval(() => this.tick(), 10);
    }

    componentWillUnmount(): void {
        clearInterval(this.state.intervalUpdateId);
    }

    tick() {
        this.setState({
            currentTime: this.props.run ? Date.now() : 0,
        });
        if (this.props.run && this.state.currentTime !== 0) {
            this.setState({
                lastSolveTime: this.state.currentTime - this.props.startTime
            });
        }
    }

    toggleSettings() {
        this.setState({
            toggleSettings: !this.state.toggleSettings,
        })
    }
}

export interface GameStatProps {
    time: Parsed,
    solved: boolean,
    lastSolveTime: number,
    moves: number,
}

export function GameStats(props: GameStatProps): ReactElement {
    return <>
        <b>
            {props.time
                ?
                <>{props.time.hours ? `${props.time.hours}:` : ''}
                    {props.time.minutes}:
                    {props.time.seconds}.
                    {props.time.milliseconds}</>
                : '0:0.0'
            }
        </b>
        {props.solved
            ?
            <b>{`tps: ${(props.moves / (props.lastSolveTime || 1) * (props.lastSolveTime ? 1000 : 0)).toFixed(2)}`}</b>
            : <></>
        }
        <b> Moves: {props.moves}</b>
    </>;
}
