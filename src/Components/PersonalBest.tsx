import * as React from "react";

export interface IPersonalBestProps {
  toggle: boolean,
  toggleHandler: (event: React.MouseEvent) => void,
}

export default (props: IPersonalBestProps) => <div
  className="modal"
  onClick={props.toggleHandler}
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
