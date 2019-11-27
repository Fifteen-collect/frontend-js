import * as React from "react";
import * as PropTypes from "prop-types";
import {Size} from "types/ColorScheme";
import {PersonalBestInterface} from "interfaces/PersonalBestInterface";
import PersonalBestService from "./Service/PersonalBestService";

export interface PersonalBestProps {
    size: Size
}

export const PersonalBestPropTypes: { [T in keyof PersonalBestProps]: PropTypes.Validator<any> } = {
    size: PropTypes.number,
};

export class PersonalBest extends React.Component<PersonalBestProps, PersonalBestInterface> {
    public static readonly propTypes = PersonalBestPropTypes;

    constructor(props: PersonalBestProps) {
        super(props);

        this.state = PersonalBestService.getStats(props.size) || {};
    }

    public render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-3 p-0">Pb: </div>
                <div className="col-3 p-0">Time: {this.state.time || '-'} </div>
                <div className="col-3 p-0">Tps: {this.state.tps || '-'} </div>
                <div className="col-3 p-0">Moves: {this.state.moves || '-'} </div>
            </div>
        </div>
    }
}
