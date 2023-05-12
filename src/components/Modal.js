import React, { useEffect, useState } from 'react'
import Button from './Button'

const Modal = ({ title = 'Modal', text, closeButton = true, isOpen = false, modalButton, actions, children }) => {
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        setToggle(isOpen)
    }, [isOpen]);

    const toggleModal = () => {
        setToggle(prevToggle => !prevToggle)
    }

    return (
        <>
            <Button className={modalButton.className} text={modalButton.text} onClick={toggleModal} />
            {toggle &&
                <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-overlay" onClick={toggleModal}></div>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h3 className="modal-title fs-5">{title}</h3>
                                {closeButton ? <button type="button" className="btn-close" onClick={toggleModal}></button> : null}
                            </div>
                            <div className="modal-body text-left">{children}</div>
                            <div className="modal-footer">
                                {actions.map(action => {
                                    const clickFunction = action.onClick ?? toggleModal
                                    return < Button key={action.id} className={action.className} text={action.text} onClick={clickFunction} />
                                })}
                            </div>
                        </div>
                    </div>
                </div >
            }


        </>
    )
}

Modal.defaultProps = {
    title: 'Modal',
    text: '...',
    closeButton: false
}

export default Modal
