import React from 'react'

const Button = ({ className, text, onClick }) => {
    return <button
        className={`btn ${className}`}
        type="button"
        onClick={onClick}
    > {text}</button >
}

Button.defaultProps = {
    className: 'btn-primary',
    text: 'Button',
    isModal: false,
    modal: null
}

export default Button
