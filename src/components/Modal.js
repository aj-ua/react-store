import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { toggleModal } from '../actions'
import Button from './Button'

const Modal = (props) => {
    const { title, text, closeButton, actionBtn, action } = props.activeModal
    const isModalOpen = props.isModalOpen
    const { toggleModal } = props

    const updateModal = () => {
        console.log('isModalOpen1', isModalOpen);
        toggleModal()
        console.log('isModalOpen2', isModalOpen);
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
                                {closeButton ? <button type="button" className="btn-close" onClick={updateModal}></button> : null}
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
    activeModal: state.product.activeModal,
    isModalOpen: state.product.isModalOpen,
})

export default connect(mapStateToProps, { toggleModal })(Modal)
