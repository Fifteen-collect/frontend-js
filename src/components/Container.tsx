import * as React from "react";
import * as PropTypes from "prop-types";

export interface ContainerProps {
    size: number,
}

export const ContainerPropTypes: { [T in keyof ContainerProps]: PropTypes.Validator<any> } = {
    size: PropTypes.number,
};

export class Container extends React.Component<ContainerProps> {
    public static readonly propTypes = ContainerPropTypes;

    public render() {
        return <div className={"row d-flex justify-content-center mt-4"}
                    style={{
                        width: `${this.props.size}px`,
                        height: `${this.props.size}px`,
                        margin: '-7.5px',
                    }}
        >
            {this.props.children}
        </div>
    }
}
