import * as React from 'react';
import Code from '@/components/Code';
import Tag from '@/components/Tag';

const code_useState = (
    <Code>
        {`export default () => {
    const [n, setN] = React.useState<number>(8);
    console.log('render'); // setN(number)会调用setState导致组件状态改变，函数会被再次调用！但是状态被继承，并且会计算DOM，只局部更新。
    return (
        <div>
            <span>{n}</span>
            <button onClick={() => setN(n + 1)}>+1</button>
            {code_useState}
        </div>
    );
};`}
    </Code>
);

const code_useEffect = (
    <Code>
        {`    const [n, setN] = React.useState<number>(8);
    const [msg, setMsg] = React.useState<string>('默认msg');
    React.useEffect(() => {
        setTimeout(() => {
            setMsg(\`现在的n是\${n}\`);
        }, 200);
        return () => { // 会在下次触发副作用之前调用
            setMsg('n发生了改变，清除副作用中...');
        };
    }, [n]); // 如果n发生了变化，或者初次渲染时，激活副作用。对象引用不变，改变对象属性不会触发副作用！`}
    </Code>
);

export default () => {
    const [n, setN] = React.useState<number>(8);
    const [msg, setMsg] = React.useState<string>('默认msg');
    React.useEffect(() => {
        setTimeout(() => {
            setMsg(`现在的n是${n}`);
        }, 200);
        return () => { // 会在下次触发副作用之前调用
            setMsg('n发生了改变，清除副作用中...');
        };
    }, [n]); // 如果n发生了变化，或者初次渲染时，激活副作用。对象引用不变，改变对象属性不会触发副作用！
    return (
        <div>
            <div>
                <Tag>useState</Tag>
                <span style={{ fontSize: '20px', marginRight: '10px' }}>{n}</span>
                <button style={{ fontSize: '20px' }} onClick={() => setN(n + 1)}>+1</button>
                {code_useState}
            </div>

            <div>
                <Tag>useEffect</Tag>
                <h2>{msg}</h2>
                {code_useEffect}
            </div>

            <div>
            </div>
        </div>
    );
};
