import * as React from "react";
import * as PropTypes from "prop-types";
import {Method} from "Types/Method";
import {Size} from "Types/Block/Size";
import {Theme} from "Types/Theme";
import {ThemeProps} from "Types/Theme/ColorScheme";
import {Context as ThemeContext} from "Types/Theme/Context";
import {Sizes} from "Components/Settings/Sizes";

export interface SettingsProps {
    sizes: number[],
    methods: Method[],
    resetHandler: (size: number) => void;
    changeMethodHandler: (method: Method) => void;
    toggle: boolean,
    toggleHandler: (event: React.MouseEvent) => void,
    changeTheme: (theme: Theme) => void;
    themes: Theme[],
    pinSizes: boolean,
    pinSizeToTop: (event: React.ChangeEvent) => void,
    currentThemeType: string,
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
    pinSizes: PropTypes.bool,
    pinSizeToTop: PropTypes.func,
    currentThemeType: PropTypes.string,
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
                                <span aria-hidden="true" style={{color: currentTheme.main.modal.closeButton}}>&times;</span>
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
                                            className={`btn col-6 noselect ${currentTheme.button.classColor} ${this.props.currentThemeType === availableTheme ? 'active' : ''}`}
                                            onClick={() => {
                                                this.props.changeTheme(availableTheme);
                                            }}
                                            style={{
                                                color: this.props.currentThemeType === availableTheme ? currentTheme.button.selectedText : currentTheme.button.text,
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
                                            className={`btn col-4 noselect ${currentTheme.button.classColor} ${this.state.method === method ? 'active' : ''}`}
                                            onClickCapture={() => {
                                                this.setState({
                                                    method: method
                                                });
                                                this.props.changeMethodHandler(method);
                                            }}
                                            style={{
                                                color: this.state.method === method ? currentTheme.button.selectedText : currentTheme.button.text,
                                            }}
                                        >
                                            {method}
                                        </button>
                                    })}
                                </div>
                            </div>
                            <div className="container-fluid mt-1">
                                Available puzzle's sizes
                                <Sizes
                                    size={this.state.size}
                                    sizes={this.props.sizes}
                                    changeSize={(size: Size) => {
                                        this.setState({
                                            size: size
                                        });
                                        this.props.resetHandler(size);
                                    }}
                                />
                            </div>
                            <div className="container-fluid mt-1">
                                <div className="row d-flex justify-content-center align-content-center align-items-center">
                                    <span>Pin sizes to top</span>
                                    <label className="switch m-0 ml-3" htmlFor="checkbox">
                                        <input
                                            type="checkbox"
                                            id="checkbox"
                                            checked={this.props.pinSizes}
                                            onChange={this.props.pinSizeToTop}
                                        />
                                        <div className="slider round"/>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </ThemeContext.Consumer>
    }
}
