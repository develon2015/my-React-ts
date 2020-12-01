import { lazy, LazyExoticComponent } from "react";

const parts = [
    [
        'WebSocket',
        'Base64',
        'Base64性能测试',
        '受控组件',
    ],
    [
        'Hook',
        'call&apply',
        'ES6',
    ],
    [
        'WhatsRedux',
    ],
];

/** 页面名称 */
const Pages: string[] = [];
parts.forEach((it, index) => Pages.push(...it.map(name => `part-${index + 1}/${name}`)));

// const ReactPages = Pages.map(page => require(`@/pages/${page}`).default); // 臃肿的index.js

// 页面全部映射为lazy组件, 在Route中配置Suspense子组件, 并设置该Suspense组件的fallback和children属性
// Suspense组件的children属性就是延迟加载的页面组件
// 这些延迟加载的页面组件必须是函数或者类
const ReactPages = Pages.map(page => lazy(() => import(
    /* webpackChunkName: "page" */
    `@/pages/${page}`
)));

export { Pages, ReactPages };