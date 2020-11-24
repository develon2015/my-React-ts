import * as web from '@develon/js/lib/web';
import Button from '@/components/Button';
import { Component, createRef } from 'react';

class App extends Component<{}, { msg: string, objectURL: string}> {
    decodeUTF8 = () => {
        let decode = web.encode.a2b(this.state.msg);
        this.setState({
            msg: decode,
        });
    };
    decodeUTF16 = () => {
        let decode = web.encode.atobUTF16(this.state.msg);
        this.setState({
            msg: decode,
        });
    };
    blob2Base64 = () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.onchange = async (event) => {
            let files: File[] = event.target['files'];
            let base64: string = await web.encode.Blob2Base64(files[0]);
            this.setState({ msg: base64 });
        };
        input.click();
    };
    saveAsFile = async () => {
        let base64 = this.state.msg;
        if (base64 !== '') {
            // let blob = new Blob([atob(base64)], { type: 'application/octet-stream' }); // 二进制解码乱码, 除非完全是ASCII文本
            // let url = URL.createObjectURL(blob);

            // let url = `data: application/octet-stream; base64,${base64}`; // 直接构造href字符串, 可行

            // 一定要使用ObjectURL? 没问题, 使用fetch函数! 或者使用ArrayBuffer.
            // let data = `data:application/octet-stream;base64,${base64}`;
            let data = web.encode.Base64ToDataURL(base64);
            let blob = await (await fetch(data)).blob();
            let url = URL.createObjectURL(blob);
            this.setState({ objectURL: url });

            let a = document.createElement('a');
            a.href = url;
            a.download = 'file.txt';
            a.click();
        }
    };
    string2Base64_UTF16 = async () => {
        let str = this.input.current.value;
        let base64 = await web.encode.btoaUTF16(str);
        this.setState({ msg: base64 });
    };
    string2Base64 = async () => {
        let str = this.input.current.value;
        let base64 = await web.encode.String2Base64(str);
        this.setState({ msg: base64 });
    };
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            objectURL: '',
        };
    }
    input = createRef<HTMLInputElement>();
    render() {
        return (
            <div>
                <div style={{ whiteSpace: 'break-spaces', wordBreak: 'break-all' }}>{this.state.msg}</div>
                <hr />
                <Button onClick={this.blob2Base64}>Blob2Base64</Button>
                <div style={{ padding: '20px 0' }}>
                    <input placeholder="要编码的字符串" ref={this.input} style={{ fontSize: '28px', width: '50vw' }}></input>
                    <br />
                    <Button onClick={this.string2Base64}>String2Base64（UTF-8）</Button>
                    <Button onClick={this.string2Base64_UTF16}>String2Base64（受限的UTF-16LE）</Button>
                </div>
                <div>{ this.state.objectURL} </div>
                <hr />
                <Button onClick={this.saveAsFile}>解码二进制并保存为文件</Button><br />
                <Button onClick={this.decodeUTF8}>解码UTF-8字符串</Button><br />
                <Button onClick={this.decodeUTF16}>解码UTF-16LE字符串（受限的）</Button><br />
                <a target="_blank" href='https://www.sojson.com/base64.html' style={{ fontSize: '28px' }}>Base64验证</a>
            </div>
        );
    }
}

export default () => {
    return (
        <div
            style={{ textAlign: 'center', }}
        >
            <App />
        </div>
    );
};