// src/containers/Home/index.tsx
import './style.scss'
// Import Swiper styles
import 'swiper/css';
import { useEffect, useState } from 'react';
import useRequest from '../../hooks/useRequest';
import { message } from '../../utils/message';
import type { ResponseType } from './types';
import Banner from './components/Banner';
import Category from './components/Category';
import Card from './components/Card';
import Docker from '../../components/Docker';

// 默认请求数据
const defaultRequestData = {
    url: '/home.json',
    method: 'POST',
    //有localHistory就用localHistory,没有就用默认值
    data: {
        latitude: 37.7304167,
        longitude: -122.384425,
    }
}

const Home = () => {
    const localLocation = localStorage.getItem('location')
    const locationHistory = localLocation ? JSON.parse(localLocation) : null

    if (locationHistory) {
        defaultRequestData.data.latitude = locationHistory.latitude;
        defaultRequestData.data.longitude = locationHistory.longitude;
    }

    //请求接口的对象
    const [requestData, setRequestData] = useState(defaultRequestData)
    //请求发送的结果
    const { data } = useRequest<ResponseType>(requestData)

    useEffect(() => {
        //从前端取经纬度,可调用getCurrentPosition方法(三个参数,一个成功的回调函数,一个失败的回调函数,一个配置参数:多久ms获取不到经纬度就不获取了,)
        //没有localHistory的时候才会尝试获取定位存到localStorge里面
        if (navigator.geolocation && !locationHistory) {
            console.log('get location')
            navigator.geolocation.getCurrentPosition((position) => {
                const { coords } = position
                const { latitude, longitude } = coords
                localStorage.setItem('location', JSON.stringify({
                    latitude, longitude
                }))
                setRequestData({
                    ...defaultRequestData,
                    data: { latitude, longitude }
                })
                //打印现在的经纬度
                console.log(latitude, longitude)
            }, (error) => {
                //用户发请求失败
                message(error?.message || '未知异常')
            }, { timeout: 10000 })
        }
        //自己加的
        if (locationHistory) {
            console.log('already have location')
        }
    }, [locationHistory])
    let location, banners, categories, freshes = undefined;
    const dataResult = data?.data;
    if (dataResult) {
        location = dataResult.location;
        banners = dataResult.banners;
        categories = dataResult.categories;
        freshes = dataResult.freshes;
    }

    return (
        <div className='page home-page'>
            <Banner location={location} banners={banners} />
            <Category categories={categories} />
            <Card title='新品尝鲜' list={freshes} />
            {/* 组件复用很方便 */}
            <Card title='限时抢购' list={freshes} />
            <div className='bottom'>
                - 我是有底线的 -
            </div>
            <Docker activeName='home' />
        </div>
    )
}

export default Home;