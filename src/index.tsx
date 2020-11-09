import './index.html';
import ReactDOM from 'react-dom';
import { StrictMode, } from 'react';
import App from './pages/App';

ReactDOM.render(<StrictMode>{ App }</StrictMode>, /* container */ document.querySelector('#app')); // 严格模式
// ReactDOM.render(App, /* container */ document.querySelector('#app'));