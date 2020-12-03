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

const code_useRef = (
    <Code>
        {`    const ref = React.useRef<{ value: number }>({ value: 999 }); // 只会初始化一次, 后续重入不再初始化, 只会返回第一次创建的对象的引用
    // 为什么要用current属性访问对象呢? 很简单, 因为要保证返回的是一个ref是一个对象, 不能是number等原生数据类型, 否则修改无法被React缓存, 除非像状态一样提供set函数
    const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0); // 显然, 改变ref.current不会触发渲染, 使用useReducer达到强制渲染的目的

    <span>{ref.current.value}</span>
    <button onClick={() => ref.current.value += 1}>+1</button>
    <button onClick={() => forceUpdate()}>强制更新</button>`}
    </Code>
);

const code_useCallback = (
    <Code>
        {`    const [turn, setTurn] = React.useState(false); // 按下"记下的n的值"按钮时，改变turn的值，从而触发printN的更新（否则useCallback返回的是旧的参数）
    let printN: () => number = React.useCallback(() => {
        console.log(n);
        return n;
    }, [turn]); // React会比对turn的值是否发生了变化，如果是，则返回的函数就是我们在参数中提供的箭头函数

    <span style={{ fontSize: '20px', marginRight: '10px' }}>{n}</span>
    <button style={{ fontSize: '20px' }} onClick={() => setN(n + 1)}>+1</button>
    <button style={{ fontSize: '20px', marginLeft: '12px' }} onClick={() => setTurn(!turn)}>记下的n的值</button>
    <button style={{ fontSize: '20px', marginLeft: '12px' }} onClick={printN}>打印记下的n的值: {printN()}</button>`}
    </Code>
);

export default () => { // 首先需要明确: 函数组件必须是可重入的, 钩子函数的调用必须严格有序
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

    const ref = React.useRef<{ value: number }>({ value: 999 }); // 只会初始化一次, 后续重入不再初始化, 只会返回第一次创建的对象的引用
    // 为什么要用current属性访问对象呢? 很简单, 因为要保证返回的是一个ref是一个对象, 不能是number等原生数据类型, 否则修改无法被React缓存, 除非像状态一样提供set函数
    const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0); // 显然, 改变ref.current不会触发渲染, 使用useReducer达到强制渲染的目的

    const [turn, setTurn] = React.useState(false); // 按下"记下的n的值"按钮时，改变turn的值，从而触发printN的更新（否则useCallback返回的是旧的参数）
    let printN: () => number = React.useCallback(() => {
        console.log(n);
        return n;
    }, [turn]); // React会比对turn的值是否发生了变化，如果是，则返回的函数就是我们在参数中提供的箭头函数

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
                <Tag>useRef & useReducer</Tag>
                <span style={{ fontSize: '20px', marginRight: '10px' }}>{ref.current.value}</span>
                <button style={{ fontSize: '20px' }} onClick={() => ref.current.value += 1}>+1</button>
                <button style={{ fontSize: '20px', marginLeft: '12px' }} onClick={() => forceUpdate()}>强制更新</button>
                {code_useRef}
            </div>

            <div>
                <Tag>useCallback</Tag>
                <span style={{ fontSize: '20px', marginRight: '10px' }}>{n}</span>
                <button style={{ fontSize: '20px' }} onClick={() => setN(n + 1)}>+1</button>
                <button style={{ fontSize: '20px', marginLeft: '12px' }} onClick={() => setTurn(!turn)}>记下的n的值</button>
                <button style={{ fontSize: '20px', marginLeft: '12px' }} onClick={printN}>打印记下的n的值: {printN()}</button>
                {code_useCallback}
            </div>
        </div>
    );
};
