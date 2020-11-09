import css from './style.css';
import { Link, } from 'react-router-dom';
import { Pages, } from '@/pages/router';
import Button from '@/components/Button';
import Tag from '@/components/Tag';

const map_route = Pages.map((page, index) => (
    <Link to={'/' + page} key={index}><Button>{page.replace(/^\/*part.*?\//, '')}</Button></Link>
));

export default route => (
    <div className={css.index}>
        <div style={{ margin: '20px 0' }}>
            <Tag>Index of Application</Tag>
        </div>
        {map_route}
    </div>
);