import * as React from "react";
import * as PropTypes from "prop-types";
import parseMs from "parse-ms";

export interface HeaderProps {
    resetHandler: (event: React.MouseEvent<Element, MouseEvent>) => void,
    time: number,
    moves: number,
    solved: boolean,
    openSettingsHandler: (event: React.MouseEvent<Element, MouseEvent>) => void
}

export const HeaderPropTypes: { [T in keyof HeaderProps]: PropTypes.Validator<any> } = {
    resetHandler: PropTypes.func,
    openSettingsHandler: PropTypes.func,
    time: PropTypes.number,
    moves: PropTypes.number,
    solved: PropTypes.bool,
};

export class Header extends React.Component<HeaderProps> {
    public static readonly propTypes = HeaderPropTypes;

    render() {
        const time = parseMs(this.props.time);

        return <div className="container-fluid inner-content" style={{marginLeft: "-15px"}}>
            <div className="row p-2 d-flex align-items-center justify-content-between">
                <button
                    className="btn btn-primary btn-sm col-1"
                    onClickCapture={this.props.resetHandler}
                >
                    <svg
                        onClickCapture={this.props.resetHandler}
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="undo-alt"
                        className="svg-inline--fa fa-undo-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        style={{
                            width: '1rem',
                            pointerEvents: "none",
                        }}
                    >
                        <path fill="currentColor"
                              d="M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z"/>
                    </svg>
                </button>
                <div className={"text-center col-5"}>
                    <b>
                        {time.hours ? `${time.hours}:` : ''}
                        {time.minutes}:
                        {time.seconds}.
                        {time.milliseconds}
                    </b>
                    {this.props.solved
                        ? <b>{` / ${(this.props.moves / (this.props.time || 1) * 1000).toFixed(2)}`}</b>
                        : <></>
                    }

                </div>
                <div className={"text-center col-4"}>
                    <b>Moves: {this.props.moves}</b>
                </div>
                <button className={"btn btn-sm btn-primary col-1"}
                        onClickCapture={this.props.openSettingsHandler}
                >
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="cog"
                        className="svg-inline--fa fa-cog fa-w-16"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        style={{
                            width: '1rem',
                            pointerEvents: "none",
                        }}
                    >
                        <path
                            fill="currentColor"
                            d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    }
}
