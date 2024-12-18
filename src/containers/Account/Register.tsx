// /src/containers/Register/index.tsx
import { useState } from 'react';
import useRequest from '../../hooks/useRequest';
import { message } from '../../utils/message';
import { useNavigate } from 'react-router-dom';
import type { RegisterResponseType } from './types';


const Register = () => {

    const [userName, setUserName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('')

    const nevigate = useNavigate()

    const { request } = useRequest<RegisterResponseType>({ manual: true });
    // when 注册 is clicked
    function handleSubmitBtnClick() {
        if (!userName) {
            message('请输入用户名')
            return
        }
        if (!phoneNumber) {
            message('请输入手机号码')
            return
        }
        if (!password) {
            message('请输入密码')
            return
        }
        if (!checkPassword) {
            message('请输入确认密码')
            return
        }
        if (checkPassword !== password) {
            message('两次密码输入不一致')
            return
        }

        request({
            url: '/register.json',
            method: 'POST',
            data: {
                user: userName,
                phone: phoneNumber,
                password: password,
            }
        }).then((data) => {
            if (data?.success) {
                nevigate('/account/login')
            }
            //data && console.log(data);
        }).catch((e: any) => {
            //用户发请求失败
            message(e?.message || '未知异常')
        });
    }

    return (
        <>
            <div className="form">
                <div className='form-item'>
                    <div className='form-item-title'>用户名</div>
                    <input
                        value={userName}
                        className='form-item-content'
                        placeholder='请输入用户名'
                        onChange={(e) => { setUserName(e.target.value) }}
                    />
                </div>
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
                <div className='form-item'>
                    <div className='form-item-title'>确认密码</div>
                    <input
                        value={checkPassword}
                        type="password"
                        className='form-item-content'
                        placeholder='请再次输入密码'
                        onChange={(e) => { setCheckPassword(e.target.value) }}
                    />
                </div>
            </div>
            <div className="submit" onClick={handleSubmitBtnClick}>
                注册
            </div>
        </>
    )
}

export default Register;