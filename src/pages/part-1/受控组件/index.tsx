import * as React from "react";
import Code from '@/components/Code';
import file from 'raw-loader!./';

const inputStyle: React.CSSProperties = {
    fontSize: '30px',
    margin: '20px',
};

export default () => {
    const [value, setValue] = React.useState('受控组件的默认值');
    return (
        <div>
            <h1>{value}</h1>
            <input style={inputStyle} value={value} onFocus={() => setValue('')} onChange={(ev) => setValue(ev.target.value)} type="text" />
            <Code>{file}</Code>
        </div>
    );
};