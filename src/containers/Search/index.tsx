import type { ResponseType } from './types';
import './style.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import useRequest from '../../hooks/useRequest';

// 默认请求数据
const defaultRequestData = {
  url: '/hostSeachList.json',
  method: 'GET',
  params: { shopId: '' }
}

const Search = () => {
  const localSearchList = localStorage.getItem('search-list');
  const seachListHistory: string[] = localSearchList ? JSON.parse(localSearchList) : [];
  const navigate = useNavigate();

  const params = useParams<{ shopId: string }>();
  if (params.shopId) {
    defaultRequestData.params.shopId = params.shopId;
  }
  const [historyList, setHistoryList] = useState(seachListHistory);
  const [keyword, setKeyword] = useState('');

  const { data } = useRequest<ResponseType>(defaultRequestData);
  const hotList = data?.data || [];

  function handleKeyDown(key: string) {
    if (key === 'Enter' && keyword) {
      const keywordIndex = historyList.findIndex(item => item === keyword);
      const newHistoryList = [...historyList];
      if (keywordIndex > -1) {
        newHistoryList.splice(keywordIndex, 1)
      }
      newHistoryList.unshift(keyword);
      if (newHistoryList.length > 20) {
        newHistoryList.length = 20;
      }
      setHistoryList(newHistoryList);
      localStorage.setItem('search-list', JSON.stringify(newHistoryList));
      navigate(`/searchList/${params.shopId}/${keyword}`);
      setKeyword('');
    }
  }

  function handleHistoryListClean() {
    setHistoryList([]);
    localStorage.setItem('search-list', JSON.stringify([]))
  }

  function handleKeywordClick(keyword: string) {
    navigate(`/searchList/${params.shopId}/${keyword}`);
  }

  return (
    <div className="page search-page">
      <div className='search'>
        <Link to='/home' className='search-back-link'>
          <div className='search-back-icon iconfont'>&#xe600;</div>
        </Link>
        <div className='search-area'>
          <div className='search-icon iconfont'>&#xe6a8;</div>
          <input
            className='search-input'
            placeholder='请输入商品名称'
            value={keyword}
            onChange={(e) => { setKeyword(e.target.value) }}
            onKeyDown={(e) => { handleKeyDown(e.key) }}
          />
        </div>
      </div>
      {/* 有历史搜索就展示 */}
      {
        historyList.length ? (
          <>
            <div className='title'>
              历史搜索
              <div
                onClick={handleHistoryListClean}
                className='iconfont title-close'
              >&#xe673;</div>
            </div>
            <ul className='list'>
              {
                historyList.map((item, index) => {
                  return <li className='list-item' key={item + index} onClick={() => handleKeywordClick(item)}>{item}</li>
                })
              }
            </ul>
          </>
        ) : null
      }
      {
        hotList.length ? (
          <>
            <div className='title'>
              热门搜索
            </div>
            <ul className='list'>
              {
                hotList.map(item => (
                  <li className='list-item' key={item.id} onClick={() => handleKeywordClick(item.keyword)}>{item.keyword} </li>
                ))
              }
            </ul>
          </>
        ) : null
      }
    </div>
  )
}

export default Search;