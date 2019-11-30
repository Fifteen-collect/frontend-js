import * as React from "react";
import * as PropTypes from "prop-types";

import * as Service from "Components/Service";

import {Size} from "Types/Block/Size";
import {Context as ThemeContext} from "Types/Theme/Context";

interface StatsProps {
    collapse: boolean,
    sizes: Size[],
    toggle: () => void,
}

Stats.propTypes = {
    collapse: PropTypes.bool,
    sizes: PropTypes.array,
    toggle: PropTypes.func,
} as { [T in keyof StatsProps]: PropTypes.Validator<any> };

export default function Stats({collapse, sizes, toggle}: StatsProps) {
    if (collapse) {
        return null;
    }

    const theme = React.useContext(ThemeContext);
    let counts = Service.StatCountsStorage.getStatCounts(Service.StatCountsStorage.SOLVED_COUNTS_KEY);
    let resets = Service.StatCountsStorage.getStatCounts(Service.StatCountsStorage.RESETS_COUNTS_KEY);

    return <div className="modal d-block" onClick={toggle}>
        <div className="modal-dialog">
            <div className="modal-content" style={{color: theme.main.modal.text}}>
                <div className="modal-header border-bottom-0 shadow"
                     style={{backgroundColor: theme.main.modal.header}}>
                    <h5 className="modal-title">Count of solves</h5>
                    <button type="button" className="close" onClick={toggle}>
                        <span aria-hidden="true" style={{color: theme.main.modal.closeButton}}>&times;</span>
                    </button>
                </div>
                <div className="modal-body p-0" style={{backgroundColor: theme.main.modal.body}}>
                    <table className={`table table-borderless table table-striped m-0 ${theme.table.backgroundClass}`}>
                        <thead>
                        <tr>
                            <th>Puzzle</th>
                            <th>Solves</th>
                            <th>Resets</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sizes.map(size => {
                            return <tr key={size}>
                                <td>{size}x{size}</td>
                                <td>{counts && counts[size] || 0}</td>
                                <td>{resets && resets[size] || 0}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}
