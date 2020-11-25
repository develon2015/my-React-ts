import { Component, ReactElement } from 'react';
import * as web from '@develon/js/lib/web';

const bin = '我';
const kanji = 3; // UTF-8下汉字的字节数
let msg = '';

class Test extends Component<{}, { msg: ReactElement }> {
    state = {
        msg: null,
    };
    constructor(props) {
        super(props);
    }
    showTime(item, time, size, rate) {
        this.setState({ msg: <div dangerouslySetInnerHTML={{ __html: msg += `${item}耗时${time}ms, ${size}字节, 比率: ${rate}<br>` }}></div> });
    }
    async componentDidMount() {
        await this.test(320);
        await this.test(3200);
        await this.test(12000);
        await this.test(24000);
        await this.test(32000);
        await this.test(320000);
    }
    async test(n) {
        let rb = bin.repeat(n);
        this.setState({ msg: <div dangerouslySetInnerHTML={{ __html: msg += `<hr><span style="color: red">${rb.length * kanji}字符测试</span><br>` }}></div> });
        await this.encodeTest(rb);
    }
    async encodeTest(bin: string) {
        let methods = [web.encode.b2a, web.encode.String2Base64, web.encode.btoaUTF16];
        for (let method of methods) {
            try {
                let startTime: any = new Date();
                let encodeStr = await method(bin);
                let endTime: any = new Date();
                this.showTime(`${method.name}()`, endTime - startTime, encodeStr.length, (encodeStr.length / bin.length / kanji).toFixed(2));
                method === web.encode.b2a && this.decodeTest(encodeStr, web.encode.a2b);
                method === web.encode.btoaUTF16 && this.decodeTest(encodeStr, web.encode.atobUTF16);
            } catch (err) {
                this.setState({ msg: <span dangerouslySetInnerHTML={{ __html: msg += `${method.name}()执行失败: ${(err as Error).message}<br>` }}></span> });
            }
        }
    }
    async decodeTest(ascii: string, method: Function) {
        try {
            let startTime: any = new Date();
            let decodeStr = await method(ascii);
            let endTime: any = new Date();
            decodeStr && this.setState({ msg: <div dangerouslySetInnerHTML={{ __html: msg += `${method.name}解码耗时: ${endTime - startTime}ms<br>` }}></div> });
        } catch (err) {
            this.setState({ msg: <span dangerouslySetInnerHTML={{ __html: msg += `${method.name}()执行失败: ${(err as Error).message}<br>` }}></span> });
        }
    }
    render() {
        return (
            <div>
                <div>
                    <div>{this.state.msg}</div>
                </div>
            </div>
        );
    }
}

export default () => {
    msg = '';
    return (
        <div>
            <Test />
        </div>
    );
}