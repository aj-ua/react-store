import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = ({ wishCount, cartCount }) => {
    return (
        <header className="navbar navbar-dark navbar-expand-lg bg-dark text-white">
            <div className="container d-flex justify-content-between">
                <h1>Store</h1>
                <ul className="navbar-nav gap-2 fs-5">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/wishlist" className="nav-link">Wishlist</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/cart" className="nav-link">Cart</NavLink>
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
