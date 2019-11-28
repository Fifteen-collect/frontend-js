import * as React from "react";
import * as PropTypes from "prop-types";
import {Size} from "../Types/Block/ColorScheme";
import {StatCounts} from "../Types/StatCounts";

export interface StatsProps {
    toggle: boolean,
    sizes: Size[],
    toggleHandler: () => void,
}

export const StatsPropTypes: { [T in keyof StatsProps]: PropTypes.Validator<any> } = {
    toggle: PropTypes.bool,
    sizes: PropTypes.array,
    toggleHandler: PropTypes.func,
};

export class Stats extends React.Component<StatsProps> {
    public static readonly propTypes = StatsPropTypes;

    public render() {
        if (!this.props.toggle) {
            return <></>;
        }

        let counts: StatCounts = JSON.parse(localStorage.getItem('counts'));

        return <div
            className="modal d-block"
            onClick={this.props.toggleHandler}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Count of solves</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={this.props.toggleHandler}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.props.sizes.map((size: Size) => {
                            return <div key={size}>
                                {size}x{size}: {counts && counts[size] || 0}
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    }
}
