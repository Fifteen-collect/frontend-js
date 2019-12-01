import * as React from "react";
import * as PropTypes from "prop-types";

import Sizes from "Components/Settings/Sizes";

import {Method} from "Types/Method";
import {Size} from "Types/Block/Size";
import {Theme} from "Types/Theme";
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
    pinSizes: boolean,
    pinSizeToTop: (event: React.ChangeEvent) => void,
    currentThemeType: string,
    currentSize: number,
}

Settings.propTypes = {
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
    currentSize: PropTypes.number,
} as { [T in keyof SettingsProps]: PropTypes.Validator<any> };

export default function Settings(props: SettingsProps) {
    if (props.toggle) {
        return <></>;
    }

    const [currentMethod, setMethod] = React.useState(Method.DEFAULT);
    const currentTheme = React.useContext(ThemeContext);

    return <div className="modal d-block">
        <div className="modal-dialog">
            <div className="modal-content" style={{color: currentTheme.main.modal.text}}>
                <div className="modal-header border-bottom-0 shadow"
                     style={{backgroundColor: currentTheme.main.modal.header}}>
                    <h5 className="modal-title">Settings</h5>
                    <button type="button" className="close" onClick={props.toggleHandler}>
                        <span aria-hidden="true" style={{color: currentTheme.main.modal.closeButton}}>&times;</span>
                    </button>
                </div>
                <div className="modal-body" style={{backgroundColor: currentTheme.main.modal.body}}>
                    <div className="container-fluid mt-1">
                        Themes:
                        <div className="row">
                            {props.themes.map(availableTheme => {
                                const classColor = currentTheme.button.classColor;
                                const active = props.currentThemeType === availableTheme ? 'active' : '';

                                return <button
                                    type={"button"}
                                    key={availableTheme}
                                    className={`btn col-6 noselect ${classColor} ${active}`}
                                    onClick={() => props.changeTheme(availableTheme)}
                                    style={{
                                        color: props.currentThemeType === availableTheme
                                            ? currentTheme.button.selectedText
                                            : currentTheme.button.text,
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
                            {props.methods.map(method => {
                                const classColor = currentTheme.button.classColor;
                                const active = currentMethod === method ? 'active' : '';

                                return <button
                                    type="button"
                                    key={method}
                                    className={`btn col-4 noselect ${classColor} ${active}`}
                                    onClickCapture={() => {
                                        setMethod(method);
                                        props.changeMethodHandler(method);
                                    }}
                                    style={{
                                        color: currentMethod === method
                                            ? currentTheme.button.selectedText
                                            : currentTheme.button.text,
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
                            size={props.currentSize}
                            sizes={props.sizes}
                            changeSize={size => props.resetHandler(size)}
                        />
                    </div>
                    <div className="container-fluid mt-1">
                        <div className="row d-flex justify-content-center align-content-center align-items-center">
                            <span>Pin sizes to top</span>
                            <label className="switch m-0 ml-3" htmlFor="checkbox">
                                <input
                                    type="checkbox"
                                    id="checkbox"
                                    checked={props.pinSizes}
                                    onChange={props.pinSizeToTop}
                                />
                                <div className="slider round"/>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
