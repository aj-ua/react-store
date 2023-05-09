import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getData } from '../actions/productActions'

const Header = ({ wishlist, cart, getData }) => {
    useEffect(() => {
        // executed only once
        getData()
    }, [])

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

Header.propTypes = {
    cart: PropTypes.array.isRequired,
    wishlist: PropTypes.array.isRequired,
    getData: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    products: state.product.products,
    cart: state.product.cart,
    wishlist: state.product.wishlist
})

export default connect(mapStateToProps, { getData })(Header)
