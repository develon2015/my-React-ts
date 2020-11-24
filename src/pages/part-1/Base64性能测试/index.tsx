import { Component } from 'react';
import * as web from '@develon/js/lib/web';

const bin = '你好'.repeat(800);
let msg = '';

class Test extends Component<{}, { msg: string }> {
    state = {
        msg: ''
    };
    constructor(props) {
        super(props);
    }
    showTime(item, time) {
        this.setState({ msg: msg += `${item}耗时: ${time}ms, ` });
    }
    async componentDidMount() {
       let startTime: any = new Date();
       let a = web.encode.b2a(bin);
       let endTime: any = new Date();
       this.showTime('b2a()', endTime - startTime);

       startTime = new Date();
       let b = await web.encode.String2Base64(bin);
       endTime = new Date();
       this.showTime('String2Base64()', endTime - startTime);

       startTime = new Date();
       let c = web.encode.btoaUTF16(bin);
       endTime = new Date();
       this.showTime('btoaUTF16()', endTime - startTime);
    }
    render() {
        return (
            <div>
                <div>
                    <h1>{this.state.msg}</h1>
                </div>
            </div>
        );
    }
}

export default () => (
    <div>
        <Test />
    </div>
);