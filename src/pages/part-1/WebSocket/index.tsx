import { Component, SyntheticEvent } from 'react';
import css from './style.css';
import Button from '@/components/Button';

const ws = `ws://127.0.0.1:8022`;

class WebsocketClient extends Component<{}, { msg: string }> {
    constructor(props) {
        super(props);
        this.state = {
            msg: '服务器未连接',
        };
    }
    log(msg) {
        this.setState({ msg });
    }
    /** 连接WebSocket服务器 */
    connect = (event: SyntheticEvent) => {
        let conn = new WebSocket(ws);
        this.log('连接服务器...');
        conn.onopen = (ev: Event)=> {
            this.log('服务器已连接...');
        };
        conn.onerror = (ev: Event) => {
            this.log('连接失败！');
        };
        conn.onmessage = (ev: MessageEvent) => {
            this.log('服务器: ' + ev.data);
        };
    };
    render() {
        return (
            <div style={{
                position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%, -50%)',
            }}>
                <div style={{ textAlign: 'center', fontSize: '28px', paddingBottom: '20px', }}>{this.state.msg}</div>
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