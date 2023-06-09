import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Header = ({ wishlist, cart }) => {
    return (
        <header className="navbar navbar-dark navbar-expand-md bg-dark text-white">
            <div className="container d-flex justify-content-between">
                <h1><NavLink to="/" className="nav-link">Store</NavLink></h1>
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
                    <NavLink to="/wishlist" className="nav-link"><i className="bi bi-heart">{wishlist.length > 0 ? wishlist.length : ''}</i></NavLink>
                    <NavLink to="/cart" className="nav-link"><i className="bi bi-cart">{cart.length > 0 ? cart.length : ''}</i></NavLink>
                </div>
            </div>
        </header>
    )
}

Header.propTypes = {
    cart: PropTypes.array.isRequired,
    wishlist: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    cart: state.product.cart,
    wishlist: state.product.wishlist
})

export default connect(mapStateToProps, null)(Header)
