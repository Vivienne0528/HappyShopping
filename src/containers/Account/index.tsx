// /src/containers/Account/index.tsx
import { useEffect } from 'react';
import './style.scss';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const Account = () => {
    //获取当前路径，判断用户是否在 / account / login 或 / account / register。
    const location = useLocation()
    const navigate = useNavigate()
    //如果当前路径是 /account/login，则高亮登录选项卡。
    const isLoginActivated = location.pathname === '/account/login'
    const loginActiveClass = isLoginActivated ? 'tab-item-active' : ''
    //    否则高亮注册选项卡。
    const registerActiveClass = !isLoginActivated ? 'tab-item-active' : ''

    //如果已经登陆,自动跳转到商城首页
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home')
        }
    }, [navigate])

    return (
        <div className="page account-page">
            <div className="tab">
                <div className={`tab-item tab-item-left ${loginActiveClass}`}><Link to='/account/login'>登陆 </Link></div>
                <div className={`tab-item tab-item-right ${registerActiveClass}`}><Link to='/account/register'>注册 </Link></div>
            </div>
            <Outlet />
        </div>
    )
}

export default Account;