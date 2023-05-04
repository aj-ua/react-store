import React from 'react'

const Header = ({ wishCount, cartCount }) => {
    return (
        <div className="navbar bg-dark text-white">
            <div className="container d-flex justify-content-between">
                <h1>Store</h1>
                <div className='navbar__actions d-flex gap-4'>
                    <i className="bi bi-heart">{wishCount > 0 ? wishCount : ''}</i>
                    <i className="bi bi-cart">{cartCount > 0 ? cartCount : ''}</i>
                </div>
            </div>
        </div>
    )
}

export default Header
