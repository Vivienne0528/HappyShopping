// /src/containers/Register/index.tsx
import './style.scss';
import { useRef, useState } from 'react';
import useRequest from '../../utils/useRequest';
import Modal, { ModalInterfaceType } from '../../components/Modal';
import { Link } from 'react-router-dom';


// 1. 首先定义接口返回内容
type ResponseType = {
    success: boolean,
    data: boolean
}

const Register = () => {
    const modalRef = useRef<ModalInterfaceType>(null)
    const [userName, setUserName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('')

    const { request } =
        useRequest<ResponseType>({
            url: '/register.json',
            method: 'POST',
            params: {
                user: userName,
                phone: phoneNumber,
                password: password
            }
        });
    // when 注册 is clicked
    function handleSubmitBtnClick() {
        if (!userName) {
            modalRef.current?.showMessage('请输入用户名')
            return
        }
        if (!phoneNumber) {
            modalRef.current?.showMessage('请输入手机号码')
            return
        }
        if (!password) {
            modalRef.current?.showMessage('请输入密码')
            return
        }
        if (!checkPassword) {
            modalRef.current?.showMessage('请输入确认密码')
            return
        }
        if (checkPassword !== password) {
            modalRef.current?.showMessage('两次密码输入不一致')
            return
        }

        request().then((data) => {
            data && console.log(data);
        }).catch((e: any) => {
            //用户发请求失败
            modalRef.current?.showMessage(e?.message || '未知异常')
        });
    }

    return (
        <div className="page register-page">
            <div className="tab">
                <div className='tab-item tab-item-left'><Link to='/login'>登陆</Link></div>
                <div className='tab-item tab-item-right'>注册</div>
            </div>
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

            <Modal ref={modalRef} />

        </div>
    )
}

export default Register;