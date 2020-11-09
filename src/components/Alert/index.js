import css from './style.css';
import ReactDOM from 'react-dom';

let i = 0;
function getForegroundID() {
    return ++i;
}

function Alert(props) {
    return (
        <div className={css.container}>
            <div className={css['alert-container']}>
                <div className={css['alert-content']}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default (alert) => {
    let frame = document.createElement('div');
    frame.classList.add(css.frame);
    frame.id = `alert-${getForegroundID()}`;
    document.body.appendChild(frame);
    ReactDOM.render(<Alert>{ alert }</Alert>, frame);
    return frame;
}