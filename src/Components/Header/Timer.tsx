import * as React from "react";
import * as PropTypes from "prop-types";
import {Context as ThemeContext} from "Types/Theme/Context";
import {GameContext} from "Types/GameContext";
import {useEffect} from "react";

export interface TimerProps {
    moves: number,
    startTime: number,
    run: boolean,
    clicks: number,
}

function calculatePerSecondManipulation(manipulation: number, seconds: number): number {
    return manipulation / (seconds || 1) * (seconds ? 1000 : 0);
}

Timer.propTypes = {
    moves: PropTypes.number,
    startTime: PropTypes.number,
    run: PropTypes.bool,
    clicks: PropTypes.number,
} as { [T in keyof TimerProps]: PropTypes.Validator<any> };

export function Timer({moves, startTime, run, clicks}: TimerProps) {
    const [tickId, setTickId] = React.useState(undefined);
    const [lastSolveTime, setLastSolveTime] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(0);
    const theme = React.useContext(ThemeContext);
    const game = React.useContext(GameContext);

    useEffect(() => {
        setTickId(setInterval(() => {
            setCurrentTime(game.run ? Date.now : 0);

            if (run && currentTime !== 0) {
                setLastSolveTime(currentTime - startTime);
            }
        }, 10, game.run));

        return clearInterval(tickId);
    }, [game]);

    let time: Date = new Date(0, 0, 0, 0, 0, 0, 0);
    if (!game.run && game.solved) {
        time = new Date(0, 0, 0, 0, 0, 0, lastSolveTime);
    } else if (currentTime !== 0) {
        let milliseconds = currentTime - startTime;
        time = new Date(0, 0, 0, 0, 0, 0, milliseconds);
    }

    return <>
        <b className="noselect" style={{color: theme.timerTextColor}}>
            Time: {time.getHours() ? `${time.getHours().toString()}:` : ''}
            {time.getMinutes() ? `${time.getMinutes().toString()}:` : ''}
            {time.getSeconds()}.
            {time.getMilliseconds()}
        </b>
        {game.solved
            ? <>
                <b className="noselect" style={{color: theme.timerTextColor}}>
                mps: {calculatePerSecondManipulation(moves, lastSolveTime).toFixed(2)}
                </b>
                <b className="noselect" style={{color: theme.timerTextColor}}>
                cps: {calculatePerSecondManipulation(clicks, lastSolveTime).toFixed(2)}
                </b>
            </>
            : <></>}
        <b className="noselect" style={{color: theme.timerTextColor}}> Moves: {moves}</b>
        <b className="noselect" style={{color: theme.timerTextColor}}> Clicks: {clicks}</b>
    </>
}
