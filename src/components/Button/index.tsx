import * as React from 'react';
import css from './style.css';

interface ButtonProps {
    color?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default class extends React.Component<ButtonProps, {}> {
    render() {
        return (
            <div className={css.button} onClick={this.props.onClick}
                style={{
                    color: this.props.color,
                    boxShadow: this.props.color ? `0 0 0 2px ${this.props.color}` : null
                }}
            >
                {this.props.children}
            </div>
        );
    }
}
