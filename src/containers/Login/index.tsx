// /src/containers/Login/index.tsx
import './style.scss';
import { useRef, useState } from 'react';
import useRequest from '../../utils/useRequest';
import Modal, { ModalInterfaceType } from '../../components/Modal';
import { Link } from 'react-router-dom';

// 1. 首先定义接口返回内容
type ResponseType = {
    success: boolean;
    data: {
        token: string
    }
}

const Login = () => {
    const modalRef = useRef<ModalInterfaceType>(null)
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const { request } =
        useRequest<ResponseType>({
            url: '/login.json',
            method: 'POST',
            params: {
                phone: phoneNumber,
                password: password
            }
        });

    function handleSubmitBtnClick() {
        if (!phoneNumber) {
            modalRef.current?.showMessage('请输入手机号码')
            return
        }
        if (!password) {
            modalRef.current?.showMessage('请输入密码')
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
        <div className="page login-page">
            <div className="tab">
                <div className='tab-item tab-item-left'>登陆</div>
                <div className='tab-item tab-item-right'><Link to='/register'>注册 </Link></div>
            </div>
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
            <Modal ref={modalRef} />

        </div>
    )
}

export default Login;