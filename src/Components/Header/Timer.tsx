import * as React from "react";
import * as PropTypes from "prop-types";
import parseMs, {Parsed} from "parse-ms";

export interface TimerProps {
    solved: boolean,
    run: boolean,
    moves: number,
    startTime: number,
}

export const TimerPropTypes: { [T in keyof TimerProps]: PropTypes.Validator<any> } = {
    solved: PropTypes.bool,
    run: PropTypes.bool,
    moves: PropTypes.number,
    startTime: PropTypes.number
};

export interface TimerState {
    intervalUpdateId?: number,
    lastSolveTime: number,
    currentTime: number,
}

export class Timer extends React.Component<TimerProps, TimerState> {
    public static readonly propTypes = TimerPropTypes;

    public readonly state: TimerState = {
        intervalUpdateId: undefined,
        lastSolveTime: 0,
        currentTime: 0,
    };

    public render() {
        let time: Parsed = parseMs(0);
        if (!this.props.run && this.props.solved) {
            time = parseMs(this.state.lastSolveTime);
        } else if (this.state.currentTime !== 0) {
            let milliseconds = this.state.currentTime - this.props.startTime;
            time = parseMs(milliseconds);
        }

        return <>
            <b>
                {time
                    ?
                    <>{time.hours ? `${time.hours}:` : ''}
                        {time.minutes}:
                        {time.seconds}.
                        {time.milliseconds}</>
                    : '0:0.0'
                }
            </b>
            {this.props.solved
                ? <b>
                    tps:{(this.props.moves / (this.state.lastSolveTime || 1) * (this.state.lastSolveTime ? 1000 : 0)).toFixed(2)}
                </b>
                : <></>
            }
            <b> Moves: {this.props.moves}</b>
        </>
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
}
