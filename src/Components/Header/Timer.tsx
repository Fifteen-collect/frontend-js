import * as React from "react";
import * as PropTypes from "prop-types";
import {Context as ThemeContext} from "../../Types/Theme/Context";
import {GameContext} from "../../Types/GameContext";
import {ThemeProps} from "../../Types/Theme/ColorScheme";

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
        let time: Date = new Date(0);
        if (!this.context.run && this.context.solved) {
            time = new Date(this.state.lastSolveTime)
        } else if (this.state.currentTime !== 0) {
            let milliseconds = this.state.currentTime - this.props.startTime;
            time = new Date(milliseconds)
        }

        return <ThemeContext.Consumer>
            {(theme: ThemeProps) => <>
                <Time time={time}>Time: </Time>
                {this.context.solved
                    ? <b style={{color: theme.timerTextColor}}>
                        tps: {this.calculateTps()}
                    </b>
                    : <></>}
                <b style={{color: theme.timerTextColor}}> Moves: {this.props.moves}</b>
            </>}
        </ThemeContext.Consumer>
    }

    componentDidMount(): void {
        this.state.intervalUpdateId = setInterval(() => this.tick(), 10);
    }

    componentWillUnmount(): void {
        clearInterval(this.state.intervalUpdateId);
    }

    calculateTps(): string {
        const tps = this.props.moves / (this.state.lastSolveTime || 1) * (this.state.lastSolveTime ? 1000 : 0);

        return tps.toFixed(2);
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

interface TimeInterface {
    children: string,
    time: Date,
}

function Time({children, time}: TimeInterface): React.ReactElement {
    return <ThemeContext.Consumer>
        {(theme: ThemeProps) => <b style={{color: theme.timerTextColor}}>
            {children}
            {time ? <>
                {time.getHours() - 3 ? `${time.getHours() - 3}:` : ''}
                {time.getMinutes()}:
                {time.getSeconds()}.
                {time.getMilliseconds()}
            </> : '0:0.0'}
        </b>}
    </ThemeContext.Consumer>
}
