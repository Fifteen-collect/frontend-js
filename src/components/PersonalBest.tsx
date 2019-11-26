import * as React from "react";
import * as PropTypes from "prop-types";
import {Size} from "types/ColorScheme";
import Bar from "components/Bar";

export interface PersonalBestProps {
    size: Size
}

export const PersonalBestPropTypes: { [T in keyof PersonalBestProps]: PropTypes.Validator<any> } = {
    size: PropTypes.number,
};

export interface PersonalBestState {
    time?: number,
    tps?: number,
    moves?: number,
    scramble?: Bar[][],
}

export class PersonalBest extends React.Component<PersonalBestProps, PersonalBestState> {
    public static readonly propTypes = PersonalBestPropTypes;

    constructor(props: PersonalBestProps) {
        super(props);

        const pb = localStorage.getItem(this.props.size.toString(10));
        this.state = pb ? JSON.parse(pb) : {};
    }

    public render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-3">Personal bests: </div>
                <div className="col-3">[Time: {this.state.time || '-'}] </div>
                <div className="col-3">[Tps: {this.state.tps || '-'}] </div>
                <div className="col-3">[Moves: {this.state.moves || '-'}] </div>
            </div>
        </div>
    }
}
