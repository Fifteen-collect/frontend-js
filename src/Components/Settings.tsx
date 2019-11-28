import * as React from "react";
import * as PropTypes from "prop-types";
import {Method} from "../Types/Method";
import {Size} from "../Types/Block/ColorScheme";
import {Theme} from "../Types/Theme";

export interface SettingsProps {
    sizes: number[],
    methods: Method[],
    resetHandler: (size: number) => void;
    changeMethodHandler: (method: Method) => void;
    collapsed: boolean,
    changeTheme: (theme: Theme) => void;
    themes: Theme[],
    theme?: Theme;
}

export const SettingsPropTypes: { [T in keyof SettingsProps]: PropTypes.Validator<any> } = {
    sizes: PropTypes.array,
    methods: PropTypes.array,
    resetHandler: PropTypes.func,
    changeMethodHandler: PropTypes.func,
    collapsed: PropTypes.bool,
    changeTheme: PropTypes.func,
    themes: PropTypes.array,
    theme: PropTypes.string,
};

export interface SettingsState {
    method: Method;
    size: Size;
}

export class Settings extends React.Component<SettingsProps, SettingsState> {
    public static readonly propTypes = SettingsPropTypes;
    public readonly state: SettingsState = {
        method: Method.DEFAULT,
        size: Size.X4,
    };

    public render() {
        return <div className={`container-fluid noselect ${this.props.collapsed ? 'collapse' : ''}`}>
            <div className="row noselect">
                {this.props.themes.map((theme: Theme) => {
                    return <button
                        type={"button"}
                        key={theme}
                        className={`btn btn-light col-6 noselect ${this.props.theme === theme ? 'active' : ''}`}
                        onClickCapture={() => this.props.changeTheme(theme)}
                    >
                        {theme}
                    </button>
                })}
                {this.props.methods.map((method: Method) => {
                    return <button
                        type={"button"}
                        key={method}
                        className={`btn btn-light col-4 noselect ${this.state.method === method ? 'active' : ''}`}
                        onClickCapture={() => {
                            this.setState({
                                method: method
                            });
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
                        className={`btn btn-light col-2 noselect ${this.state.size === size ? 'active' : ''}`}
                        onClickCapture={() => {
                            this.setState({
                                size: size
                            });
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
