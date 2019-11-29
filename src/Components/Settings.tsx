import * as React from "react";
import * as PropTypes from "prop-types";
import {Method} from "Types/Method";
import {Size} from "Types/Block/Size";
import {Theme} from "Types/Theme";
import {ThemeProps} from "Types/Theme/ColorScheme";
import {Context as ThemeContext} from "Types/Theme/Context";

export interface SettingsProps {
    sizes: number[],
    methods: Method[],
    resetHandler: (size: number) => void;
    changeMethodHandler: (method: Method) => void;
    toggle: boolean,
    toggleHandler: (event: React.MouseEvent) => void,
    changeTheme: (theme: Theme) => void;
    themes: Theme[],
}

export const SettingsPropTypes: { [T in keyof SettingsProps]: PropTypes.Validator<any> } = {
    sizes: PropTypes.array,
    methods: PropTypes.array,
    resetHandler: PropTypes.func,
    changeMethodHandler: PropTypes.func,
    toggle: PropTypes.bool,
    toggleHandler: PropTypes.func,
    changeTheme: PropTypes.func,
    themes: PropTypes.array,
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

    public render(): React.ReactElement {
        if (!this.props.toggle) {
            return <></>;
        }

        return <ThemeContext.Consumer>
            {(currentTheme: ThemeProps) => <div className="modal d-block">
                <div className="modal-dialog">
                    <div className="modal-content" style={{color: currentTheme.main.modal.text}}>
                        <div className="modal-header border-bottom-0 shadow"
                             style={{backgroundColor: currentTheme.main.modal.header}}>
                            <h5 className="modal-title">Settings</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={this.props.toggleHandler}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{backgroundColor: currentTheme.main.modal.body}}>
                            <div className="container-fluid mt-1">
                                Themes:
                                <div className="row">
                                    {this.props.themes.map((availableTheme: Theme) => {
                                        return <button
                                            type={"button"}
                                            key={availableTheme}
                                            className="btn col-6 noselect"
                                            onClick={() => {
                                                this.props.changeTheme(availableTheme);
                                            }}
                                            style={{
                                                backgroundColor: currentTheme.main.header.background,
                                                color: currentTheme.main.modal.text,
                                            }}
                                        >
                                            {availableTheme}
                                        </button>
                                    })}
                                </div>
                            </div>
                            <div className="container-fluid mt-1">
                                Color scheme for blocks
                                <div className="row">
                                    {this.props.methods.map((method: Method) => {
                                        return <button
                                            type="button"
                                            key={method}
                                            className={`btn col-4 noselect ${this.state.method === method ? 'active' : ''}`}
                                            onClickCapture={() => {
                                                this.setState({
                                                    method: method
                                                });
                                                this.props.changeMethodHandler(method);
                                            }}
                                            style={{
                                                backgroundColor: currentTheme.main.header.background,
                                                color: currentTheme.main.modal.text,
                                            }}
                                        >
                                            {method}
                                        </button>
                                    })}
                                </div>
                            </div>
                            <div className="container-fluid mt-1">
                                Available puzzle's sizes
                                <div className="row">
                                    {this.props.sizes.map((size: number) => {
                                        return <button
                                            type="button"
                                            key={size}
                                            className={`btn col-2 noselect ${this.state.size === size ? 'active' : ''}`}
                                            onClickCapture={() => {
                                                this.setState({
                                                    size: size
                                                });
                                                this.props.resetHandler(size);
                                            }}
                                            style={{
                                                backgroundColor: currentTheme.main.header.background,
                                                color: currentTheme.main.modal.text,
                                            }}
                                        >
                                            {size}
                                        </button>
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>}
        </ThemeContext.Consumer>
    }
}
