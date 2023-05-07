import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = ({ wishlist, cart }) => {
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
                    <i className="bi bi-heart">{wishlist.length > 0 ? wishlist.length : ''}</i>
                    <i className="bi bi-cart">{cart.length > 0 ? cart.length : ''}</i>
                </div>
            </div>
        </header>
    )
}

export default Header
