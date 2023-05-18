import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { toggleModal } from '../actions'
import Button from './Button'

const Modal = ({ activeModal, isModalOpen, toggleModal }) => {
    const { title, text, closeButton, actionBtn, action } = activeModal

    const updateModal = () => {
        toggleModal()
    }

    const clickFunction = action ? action : updateModal

    return (
        <>
            {isModalOpen &&
                <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-overlay" onClick={updateModal}></div>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h3 className="modal-title fs-5">{title}</h3>
                            </div>
                            <div className="modal-body text-left">{text}</div>
                            <div className="modal-footer">
                                <Button className={actionBtn.className} text={actionBtn.text} onClick={clickFunction} />
                                {closeButton ? <Button className="btn-danger" text="Cancel" onClick={updateModal} /> : null}
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    closeButton: PropTypes.bool,
    actionBtn: PropTypes.object,
    action: PropTypes.func
}

Modal.defaultProps = {
    title: 'Modal',
    text: '...',
    closeButton: true,
    actionBtn: {}
}

const mapStateToProps = (state) => ({
    activeModal: state.modal.activeModal,
    isModalOpen: state.modal.isModalOpen,
})

export default connect(mapStateToProps, { toggleModal })(Modal)
