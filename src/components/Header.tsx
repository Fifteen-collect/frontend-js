import * as React from "react";
import * as PropTypes from "prop-types";
import parseMs from "parse-ms";

export interface HeaderProps {
    resetHandler: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    time: number,
    moves: number,
}

export const HeaderPropTypes: { [T in keyof HeaderProps]: PropTypes.Validator<any> } = {
    resetHandler: PropTypes.func,
    time: PropTypes.number,
    moves: PropTypes.number,
};

export class Header extends React.Component<HeaderProps> {
    public static readonly propTypes = HeaderPropTypes;

    render() {
        const time = parseMs(this.props.time);

        return <div className="container-fluid inner-content" style={{marginLeft: "-15px"}}>
            <div className="row p-2 d-flex align-items-center justify-content-between">
                <button
                    className="btn btn-primary btn-sm col-3"
                    onClickCapture={this.props.resetHandler}
                >
                    Reset
                </button>
                <div className={"text-center col-3"}>
                    <b>
                        {time.hours ? `${time.hours}:` : ''}
                        {time.minutes}:
                        {time.seconds}.
                        {time.milliseconds}
                    </b>
                </div>
                <div className={"text-center col-4"}>
                    <b>Moves: {this.props.moves}</b>
                </div>
            </div>
        </div>
    }
}
