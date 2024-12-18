// /src/containers/Login/index.tsx
import { useState } from 'react';
import useRequest from '../../hooks/useRequest';
import { useNavigate } from 'react-router-dom';
import { message } from '../../utils/message';
import type { LoginResponseType } from './types';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const { request } = useRequest<LoginResponseType>({ manual: true });

    const navigate = useNavigate()

    function handleSubmitBtnClick() {
        if (!phoneNumber) {
            message('请输入手机号码')
            return
        }
        if (!password) {
            message('请输入密码')
            return
        }

        request({
            url: '/login.json',
            method: 'POST',
            data: {
                phone: phoneNumber,
                password: password,
            }
        }).then((data) => {
            const { data: { token } } = data
            if (token) {
                localStorage.setItem('token', token) // 将 token 存储在浏览器的 localStorage 中(持久化存储)
                navigate('/home')// 登录成功后跳转到主页
            }

        }).catch((e: any) => {
            //用户发请求失败
            message(e?.message || '未知异常')
        });
    }

    return (
        <>
            <div className="form">
                <div className='form-item'>
                    <div className='form-item-title'>手机号</div>
                    <input
                        value={phoneNumber}
                        className='form-item-content'
                        placeholder='请输入手机号码'
                        onChange={(e) => { setPhoneNumber(e.target.value) }}
                    />
                </div>
                <div className='form-item'>
                    <div className='form-item-title'>密码</div>
                    <input
                        value={password}
                        type="password"
                        className='form-item-content'
                        placeholder='请输入密码'
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
            </div>
            <div className="submit" onClick={handleSubmitBtnClick}>
                登陆
            </div>
            <p className="notice">
                *登录即表示您赞同使用条款及隐私政策
            </p>
        </>
    )
}

export default Login;