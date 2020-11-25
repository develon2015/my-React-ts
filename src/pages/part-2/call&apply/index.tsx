import * as React from 'react';
import Code from '@/components/Code';

function Demo() {
    function test() {
        console.log({ thiz: this });
        console.log(arguments);
    }
    ;// test.apply({name: 'newThis'}, new Uint8Array(new ArrayBuffer(202400))); // execute failed, Uncaught RangeError: Maximum call stack size exceeded
    ;// test.apply({name: 'newThis'}, ...new Uint8Array(new ArrayBuffer(1024)) as any); // Uncaught TypeError: CreateListFromArrayLike called on non-object
    test.apply({ name: 'newThis' }, new Uint8Array(new ArrayBuffer(1024)));
}
Demo();

export default () => {
    return (
        <div>
            <Code>{`Function # apply(thisArg: any, argArray: any[]): any // 应用函数，提供this，并且在数组中提供函数参数`}</Code>
            <Code>{`Function # call(thisArg: any, ...argArray: any[]): any // 调用函数，提供this，并且在剩余参数中提供函数参数`}</Code>
            <Code>{`apply用法优于call，Uint8Array之类无法使用展开运算符的类数组对象可以被应用到参数，但两者都有栈深度的限制！`}</Code>
            <Code>{Demo.toString()}</Code>
        </div>
    );
};
