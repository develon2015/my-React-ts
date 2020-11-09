import css from './style.css';

export default (props) => {
    let line_number = 0;
    // 空格和<>等符号替换为html转义字符
    let html = props.children
        .replace(/&/g, '&amp;') // 先替换&符号
        .replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/ /g, '&nbsp;')
        .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;') // 制表符替换为4个空格
        ;
    // 字符串中的换行替换为<br>, 并添加行号
    let unline_html = html.split(/\r\n|\n/);
    let lined_html = '';
    if (props.inline) {
        unline_html.forEach(line => {
            lined_html += `${line}<br>`;
        });
    } else {
        unline_html.forEach(line => {
            lined_html += `<span class=${css['line-number']}>${++line_number < 10 ? '0' + line_number : line_number}</span>${line}<br>`;
        });
    }
    // 高亮注释
    let final_html = lined_html
        // 单行注释
        .replace(/(\/\/.*?)(?:<br>|$)/g, `<span class="${css['single-comment']}">$1</span><br>`)
        // 多行注释
        .replace(/(\/\*.*?\*\/)/g, `<span class="${css['multi-comment']}">$1</span>`)
        .replace(/(import(&nbsp;)+.*?<br>)/g, `<span class="${css.import}">$1</span>`)
        ;
    return (
        <span className={css.code} dangerouslySetInnerHTML={{ __html: final_html }}
            style={props.inline ? { display: "inline-block" } : null}>
        </span>
    );
};