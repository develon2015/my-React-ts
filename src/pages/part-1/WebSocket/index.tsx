import { Component, SyntheticEvent } from 'react';
const css = require('./style.css');
import Button from '@/components/Button';

const ws = `ws://127.0.0.1:8022`;

class WebsocketClient extends Component {
    /** 连接WebSocket服务器 */
    connect = (event: SyntheticEvent) => {
        console.log('?');
        let conn = new WebSocket(ws);
        console.log(conn);
        conn.onopen = ev => {
            console.log(ev);
            console.log('已连接');
        };
    };
    render() {
        return (
            <div style={{
                position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
            }}>
                {/* <Button onClick={event => this.connect(event)}>连接服务器</Button> */}
                <Button onClick={this.connect}>连接服务器</Button>
            </div>
        );
    }
}

export default () => {
    return (
        <div className={css.body}>
            <WebsocketClient />
        </div>
    );
};