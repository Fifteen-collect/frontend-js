import * as React from "react";
import * as PropTypes from "prop-types";
import {Size} from "Types/Block/Size";
import {StatCounts} from "Types/StatCounts";
import {Context as ThemeContext} from "Types/Theme/Context";
import {ThemeProps} from "Types/Theme/ColorScheme";
import {getStatCounts} from "Components/Service/StatCountsStorage";

export interface StatsProps {
    toggle: boolean,
    sizes: Size[],
    toggleHandler: () => void,
}

Stats.propTypes = {
    toggle: PropTypes.bool,
    sizes: PropTypes.array,
    toggleHandler: PropTypes.func,
};

export function Stats(props: StatsProps): React.ReactElement {
    if (!props.toggle) {
        return <></>;
    }

    let counts: StatCounts = getStatCounts();

    return <ThemeContext.Consumer>
        {(theme: ThemeProps) => <div className="modal d-block" onClick={props.toggleHandler}>
            <div className="modal-dialog">
                <div className="modal-content" style={{color: theme.main.modal.text}}>
                    <div className="modal-header border-bottom-0 shadow"
                         style={{backgroundColor: theme.main.modal.header}}>
                        <h5 className="modal-title">Count of solves</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={props.toggleHandler}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body p-0" style={{backgroundColor: theme.main.modal.body}}>
                        <table className="table table-borderless table-dark table table-striped m-0">
                            <thead>
                            <tr>
                                <th>Puzzle</th>
                                <th>Solves</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.sizes.map((size: Size) => {
                                return <tr key={size}>
                                    <td>{size}x{size}</td>
                                    <td>{counts && counts[size] || 0}</td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>}
    </ThemeContext.Consumer>
}
