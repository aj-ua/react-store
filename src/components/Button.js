import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleModal, toggleModal } from '../actions'

const Button = ({ className, text, modal, onClick, handleModal, toggleModal }) => {
    return <button
        className={`btn ${className}`}
        type="button"
        modal={modal}
        onClick={modal ? (() => {
            handleModal(modal, onClick)
            toggleModal()
        }) : onClick}
    > {text}</button >
}

Button.defaultProps = {
    className: 'btn-primary',
    text: 'Button',
    onClick: () => {
        console.log('clicked button');
    },
    modal: null
}

Button.propTypes = {
    className: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    modal: PropTypes.string,
    onClick: PropTypes.func,
}

const mapStateToProps = (state) => ({
    // modal: state.product.modal,
})

export default connect(mapStateToProps, { handleModal, toggleModal })(Button)
