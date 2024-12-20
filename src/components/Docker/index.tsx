import { useNavigate } from 'react-router-dom';
import './style.scss';

const items = [{
  name: 'home',
  url: '/home',
  icon: '&#xe6fe;',
  text: '首页'
}, {
  name: 'category',
  url: '/category',
  icon: '&#xe60c;',
  text: '分类'
}, {
  name: 'cart',
  url: '/cart',
  icon: '&#xe6af;',
  text: '购物车'
}, {
  name: 'my',
  url: '/my',
  icon: '&#xe660;',
  text: '我的'
}]

function Docker(props: { activeName: string }) {
  const navigate = useNavigate();
  const { activeName } = props;

  return (
    <div className='docker'>
      {
        items.map(item => (
          <div
            className={activeName === item.name ? 'docker-item docker-item-active' : 'docker-item'}
            onClick={() => { navigate(item.url) }}
            key={item.name}
          >
            <p className='iconfont docker-item-icon' dangerouslySetInnerHTML={{
              __html: item.icon
            }}></p>
            <p className='docker-item-title'>{item.text}</p>
          </div>
        ))
      }
    </div>
  )
}
export default Docker;