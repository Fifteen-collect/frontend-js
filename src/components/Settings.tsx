import * as React from "react";
import * as PropTypes from "prop-types";

export interface SettingsProps {
    sizes: number[],
    resetHandler: (size: number) => void;
}

export const SettingsPropTypes: { [T in keyof SettingsProps]: PropTypes.Validator<any> } = {
    sizes: PropTypes.array,
    resetHandler: PropTypes.func,
};

export class Settings extends React.Component<SettingsProps> {
    public static readonly propTypes = SettingsPropTypes;

    public render() {
        return <div className="mt-2" style={{
            width: "100%",
        }}>
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
    }
}
