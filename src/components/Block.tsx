import * as React from "react";
import * as PropTypes from "prop-types";

export interface BlockProps {
    value: number,
    size: number,
    onClickHandler: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const BlockPropTypes: { [T in keyof BlockProps]: PropTypes.Validator<any> } = {
    value: PropTypes.number,
    size: PropTypes.number,
    onClickHandler: PropTypes.func,
};

export default class Block extends React.Component<BlockProps> {
    public static readonly propTypes = BlockPropTypes;

    public render(): React.ReactNode {
        const relativeSize = Math.floor(this.props.size);
        return <div className={`noselect border rounded text-light d-flex align-items-center justify-content-center ${!this.isEmpty() ? 'bg-dark' : 'bg-light'}`}
                    onClick={this.props.onClickHandler}
                    style={{
                        width: `${relativeSize}px`,
                        height: `${relativeSize}px`,
                        flex: `0 0 ${relativeSize}px`,
                        fontSize: '4rem',
                    }}
        >
            {this.props.value}
        </div>
    }

    protected isEmpty(): boolean {
        return this.props.value === 0;
    }
}
