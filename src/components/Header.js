import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ wishCount, cartCount }) => {
    return (
        <header className="navbar navbar-dark navbar-expand-lg bg-dark text-white">
            <div className="container d-flex justify-content-between">
                <h1>Store</h1>
                <ul className="navbar-nav gap-2 fs-5">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/wishlist" className="nav-link">Wishlist</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link">Cart</Link>
                    </li>
                </ul>
                <div className='navbar__actions d-flex gap-4'>
                    <i className="bi bi-heart">{wishCount > 0 ? wishCount : ''}</i>
                    <i className="bi bi-cart">{cartCount > 0 ? cartCount : ''}</i>
                </div>
            </div>
        </header>
    )
}

export default Header
