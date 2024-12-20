import { ResponseType } from './types';
import { useNavigate, useParams } from 'react-router-dom';
import './style.scss';
import useRequest from '../../hooks/useRequest';

const requestData = {
  url: '/detail.json',
  method: 'GET',
  params: { id: "" }
}


const Detail = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  if (params.id) {
    requestData.params.id = params?.id;
  }
  const { data } = useRequest<ResponseType>(requestData);
  const result = data?.data || null;

  return result ? (
    <div className="page detail-page">
      <div className='title'>
        <div className='iconfont' onClick={() => { navigate(-1) }}>&#xe600;</div>
        商品详情
      </div>
      <img className='image' src={result.imgUrl} alt='' />
      <div className='main'>
        <div className='main-price'><span className='main-price-yen'>&yen;</span>{result.price}</div>
        <div className='main-sales'>已售{result.sales}</div>
        <div className='main-content'>
          <div className='main-content-title'>{result.title}</div>
          <p className='main-content-subtitle'>{result.subtitle}</p>
        </div>
      </div>
      <div className='spec'>
        <div className='spec-title'>规格信息</div>
        <div className='spec-content'>
          <div className='spec-content-left'>
            <p className='spec-content-item'>产地</p>
            <p className='spec-content-item'>规格</p>
          </div>
          <div className='spec-content-right'>
            <p className='spec-content-item'>{result.origin}</p>
            <p className='spec-content-item'>{result.specification}</p>
          </div>
        </div>
      </div>
      <div className='detail'>
        <div className='detail-title'>商品详情</div>
        <div className='detail-content'>
          {result.detail}
        </div>
      </div>
      <div className='docker'>
        <div className='cart-icon'>
          <div className='iconfont'>&#xe622;</div>
          <div className='icon-text'>购物车</div>
        </div>
        <div className='cart-button'>加入购物车</div>
      </div>
    </div>
  ) : null;
}

export default Detail;