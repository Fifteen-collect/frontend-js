import * as React from "react";
import * as PropTypes from "prop-types";
export interface BlockProps {
    value: number;
    size: number;
    onClickHandler: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
export declare const BlockPropTypes: {
    [T in keyof BlockProps]: PropTypes.Validator<any>;
};
export default class Block extends React.Component<BlockProps> {
    static readonly propTypes: {
        value: PropTypes.Validator<any>;
        size: PropTypes.Validator<any>;
        onClickHandler: PropTypes.Validator<any>;
    };
    render(): React.ReactNode;
    protected isEmpty(): boolean;
}
