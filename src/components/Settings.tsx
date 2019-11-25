import * as React from "react";
import * as PropTypes from "prop-types";
import {Method} from "../types/Method";

export interface SettingsProps {
    sizes: number[],
    methods: Method[],
    resetHandler: (size: number) => void;
    changeMethodHandler: (method: Method) => void;
}

export const SettingsPropTypes: { [T in keyof SettingsProps]: PropTypes.Validator<any> } = {
    sizes: PropTypes.array,
    methods: PropTypes.array,
    resetHandler: PropTypes.func,
    changeMethodHandler: PropTypes.func,
};

export class Settings extends React.Component<SettingsProps> {
    public static readonly propTypes = SettingsPropTypes;

    public render() {
        return <div className="container-fluid">
            <div className="row">
                {this.props.methods.map((method: Method) => {
                    return <button
                        type={"button"}
                        key={method}
                        className="btn btn-dark btn-sm col-4"
                        onClickCapture={() => {
                            this.props.changeMethodHandler(method);
                        }}
                    >
                        {method}
                    </button>
                })}
                {this.props.sizes.map((size: number) => {
                    return <button
                        type={"button"}
                        key={size}
                        className={"btn btn-dark btn-sm col-2"}
                        onClickCapture={() => {
                            this.props.resetHandler(size);
                        }}
                    >
                        {size}
                    </button>
                })}
            </div>
        </div>
    }
}
