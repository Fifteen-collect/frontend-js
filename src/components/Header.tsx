import * as React from "react";
import * as PropTypes from "prop-types";

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
        return <div className={"container-fluid inner-content"}>
            <div className="row p-2 d-flex align-items-center">
                <button
                    className={"btn btn-primary btn-sm col-4"}
                    onClickCapture={this.props.resetHandler}
                >
                    Reset
                </button>
                <div className={"text-center col-4"}>
                    <b>{this.props.time.toFixed(2)}</b>
                </div>
                <div className={"text-center col-4"}>
                    <b>Moves: {this.props.moves}</b>
                </div>
            </div>
        </div>
    }
}
