import * as React from "react";
import * as PropTypes from "prop-types";
import parseMs, {Parsed} from "parse-ms";
import {Theme} from "../../Types/Theme";
import {ThemeContext} from "../../Types/ThemeContext";
import {GameContext} from "../../Types/GameContext";

export interface TimerProps {
    moves: number,
    startTime: number,
}

export const TimerPropTypes: { [T in keyof TimerProps]: PropTypes.Validator<any> } = {
    moves: PropTypes.number,
    startTime: PropTypes.number,
};

export interface TimerState {
    intervalUpdateId?: number,
    lastSolveTime: number,
    currentTime: number,
}

export class Timer extends React.Component<TimerProps, TimerState> {
    public static readonly propTypes = TimerPropTypes;
    static contextType: React.Context<{
        run: boolean,
        solved: boolean,
    }> = GameContext;

    public readonly state: TimerState = {
        intervalUpdateId: undefined,
        lastSolveTime: 0,
        currentTime: 0,
    };

    public render() {
        let time: Parsed = parseMs(0);
        if (!this.context.run && this.context.solved) {
            time = parseMs(this.state.lastSolveTime);
        } else if (this.state.currentTime !== 0) {
            let milliseconds = this.state.currentTime - this.props.startTime;
            time = parseMs(milliseconds);
        }

        return <ThemeContext.Consumer>
            {(theme: Theme) => <>
                <b className={theme === Theme.DARK ? "text-white-50" : "text-dark-50"}>
                    {time
                        ? <>
                            {time.hours ? `${time.hours}:` : ''}
                            {time.minutes}:
                            {time.seconds}.
                            {time.milliseconds}
                        </>
                        : '0:0.0'
                    }
                </b>
                {this.context.solved
                    ? <b className={theme === Theme.DARK ? "text-white-50" : "text-dark-50"}>
                        tps: {(this.props.moves / (this.state.lastSolveTime || 1) * (this.state.lastSolveTime ? 1000 : 0)).toFixed(2)}
                    </b>
                    : <></>}
                <b className={theme === Theme.DARK ? "text-white-50" : "text-dark-50"}> Moves: {this.props.moves}</b>
            </>}
        </ThemeContext.Consumer>
    }

    componentDidMount(): void {
        this.state.intervalUpdateId = setInterval(() => this.tick(), 10);
    }

    componentWillUnmount(): void {
        clearInterval(this.state.intervalUpdateId);
    }

    tick(): void {
        this.setState({
            currentTime: this.context.run ? Date.now() : 0,
        });
        if (this.context.run && this.state.currentTime !== 0) {
            this.setState({
                lastSolveTime: this.state.currentTime - this.props.startTime
            });
        }
    }
}
