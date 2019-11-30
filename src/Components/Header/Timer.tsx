import * as React from "react";
import * as PropTypes from "prop-types";
import {Context as ThemeContext} from "Types/Theme/Context";
import {GameContext} from "Types/GameContext";
import {useEffect} from "react";

export interface TimerProps {
    moves: number,
    startTime: number,
    run: boolean,
}

function Time(props: { children: string, time: Date }) {
    const theme = React.useContext(ThemeContext);

    return <b className="noselect" style={{color: theme.timerTextColor}}>
        {props.children}
        {props.time.getHours() ? `${props.time.getHours()}:` : ''}
        {props.time.getMinutes()}:
        {props.time.getSeconds()}.
        {props.time.getMilliseconds()}
    </b>
}

Time.propTypes = {
    moves: PropTypes.number,
    startTime: PropTypes.number,
    run: PropTypes.bool,
} as { [T in keyof TimerProps]: PropTypes.Validator<any> };

function calculateTps(moves: number, time: number) {
    return moves / (time || 1) * (time ? 1000 : 0);
}

export function Timer({moves, startTime, run}: TimerProps) {
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
        <Time time={time}>Time: </Time>
        {game.solved
            ? <b style={{color: theme.timerTextColor}}>
                tps: {calculateTps(moves, lastSolveTime).toFixed(2)}
            </b>
            : <></>}
        <b style={{color: theme.timerTextColor}}> Moves: {moves}</b>
    </>
}
