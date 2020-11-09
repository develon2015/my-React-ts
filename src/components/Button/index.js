import { Component, } from 'react';
import css from './style.css';

export default class extends Component {
    constructor(props) {
        super(props);
    }
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