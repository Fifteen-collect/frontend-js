import * as React from "react";
import * as Storage from "Storage";
import {Size} from "Types/Block/Size";
import {Context as ThemeContext} from "Types/Theme/Context";

interface IStatsProps {
  sizes: Size[],
}

export default ({sizes}: IStatsProps) => {
  const theme = React.useContext(ThemeContext);
  const counts = Storage.StatCounts.getStatCounts(Storage.StatCounts.SOLVED_COUNTS_KEY);
  const resets = Storage.StatCounts.getStatCounts(Storage.StatCounts.RESETS_COUNTS_KEY);

  return <>
    <h5 className="modal-title">Count of solves</h5>
    <table className={`table table-borderless table table-striped m-0 ${theme.table.backgroundClass}`}>
      <thead>
      <tr>
        <th>Puzzle</th>
        <th>Solves</th>
        <th>Resets</th>
      </tr>
      </thead>
      <tbody>
      {sizes.map(size => <tr key={size}>
        <td>{size}x{size}</td>
        <td>{counts && counts[size] || 0}</td>
        <td>{resets && resets[size] || 0}</td>
      </tr>)}
      </tbody>
    </table>
  </>
}
