import { Component, } from 'react';
import css from './style.css';

export default class extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={css.title}>
                <div className={css.container}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}