// src/containers/Home/index.tsx
import './style.scss'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { useEffect, useState } from 'react';
import { Swiper as SwiperType } from 'swiper'
import useRequest from '../hooks/useRequest';
import { message } from '../../utils/message';
import type { ResponseType } from './types';

const localLocation = localStorage.getItem('location')
const locationHistory = localLocation ? JSON.parse(localLocation) : null

//默认请求数据
const defaultRequestData = {
    url: '/home.json',
    method: 'POST',
    //有localHistory就用localHistory,没有就用默认值
    data: {
        latitude: locationHistory ? locationHistory.latitude : 37.7304167,
        longitude: locationHistory ? locationHistory.longitude : -122.384425,
    }
}

const Home = () => {
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
    }, [])

    //页码下标
    const [page, setPage] = useState(1)
    return (
        <div className='page home-page'>
            <div className='banner'>
                <h3 className='location'>
                    <span className='iconfont'>&#xe617;</span>
                    {data?.data.location.address || ' '}
                </h3>
                <div className='search'>
                    <span className='iconfont'>&#xe6a8;</span>
                    请输入你需要搜索的内容
                </div>
                <div className='swiper-area'>
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        onSlideChange={(e: SwiperType) => setPage(e.activeIndex + 1)}
                    >
                        {
                            (data?.data.banners || []).map(item => {
                                return (
                                    <SwiperSlide key={item.id}>
                                        <div className='swiper-item'>
                                            <img className='swiper-item-img' src={item.url} alt='轮播图' />
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                    <div className='pagination'>{page}/{data?.data.banners.length || 0}</div>
                </div>
            </div>
        </div>
    )
}

export default Home;

