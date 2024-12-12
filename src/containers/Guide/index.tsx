import { useEffect, useRef } from 'react';
import './style.scss'
import { useNavigate } from 'react-router-dom';

function Guide() {
    //手动展示动画效果
    const ref = useRef<HTMLDivElement>(null!)
    useEffect(() => {
        ref.current.style.opacity = '1'
    }, [])
    //处理页面跳转
    const navigate = useNavigate()
    const handleIconClick = () => {
        if (localStorage.getItem('token')) {
            navigate('/home')
        } else {
            navigate('/account/login')
        }
    }

    return (
        <div ref={ref} className='page guide-page'>
            <img alt='欢乐购'
                className='main-pic'
                src={require('../../images/halg_logo_icon_@2x.png')} />
            <p className='title'>欢乐购</p>
            <img alt='欢乐购'
                className='sub-pic'
                src={require('../../images/slogn_word_icon_@2x.png')} />
            <img alt='欢乐购'
                className='arrow-pic'
                src={require('../../images/arrow_icon.png')}
                onClick={handleIconClick} />
        </div>

    )
}

export default Guide;
