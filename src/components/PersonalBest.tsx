import * as React from "react";
import * as PropTypes from "prop-types";

export enum PersonalBestType {
    TIME,
    TPS,
    MOVES,
}

export interface PersonalBestProps {
    toggle: boolean,
    toggleHandler: (event: React.MouseEvent) => void,
}

export const PersonalBestPropTypes: { [T in keyof PersonalBestProps]: PropTypes.Validator<any> } = {
    toggle: PropTypes.bool,
    toggleHandler: PropTypes.func,
};

export class PersonalBest extends React.Component<PersonalBestProps> {
    public static readonly propTypes = PersonalBestPropTypes;

    public render() {
        return <div
            className="modal"
            onClick={this.props.toggleHandler}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Personal best results</h5>
                        <button type="button" className="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Time:</p>
                        <p>Tps:</p>
                        <p>Moves:</p>
                    </div>
                </div>
            </div>
        </div>
    }
}
