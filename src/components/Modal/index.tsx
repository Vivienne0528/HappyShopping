// /src/components/Modal/index.tsx
import './style.scss'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

//模态框对应的TS类型
export type ModalInterfaceType = {
    showMessage: (message: string) => void
}

const Modal = forwardRef<ModalInterfaceType>((props, ref) => {

    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState('')
    const divRef = useRef(document.createElement('div'))
    const divElement = divRef.current

    useImperativeHandle(ref, () => {
        return {
            showMessage(message: string) {
                setMessage(message)
                setShowModal(true)
                //1.5s后 showModal消失
                setTimeout(() => {
                    setShowModal(false)
                }, 1500)
            }
        }
    }, [])

    useEffect(() => {
        if (showModal) {
            document.body.appendChild(divElement)
        } else {
            if (divElement.parentNode) {
                document.body.removeChild(divElement)
            }
        }
        return () => {
            if (divElement.parentNode) {
                document.body.removeChild(divElement)
            }
        }
    }, [showModal, divElement])

    //意思是渲染<Modal/>组件时把内容渲染到div元素上面去
    return createPortal(
        <div className="modal">
            <div className="modal-text">{message}</div>
        </div>
        , divElement)
}
)

export default Modal