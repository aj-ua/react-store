import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Product from '../components/Product'
import AddContacts from '../components/AddContacts'
import { handleCheckout } from '../actions'

const Cart = ({ products, cart, contacts }) => {
    const hasProducts = products.length > 0

    const doCheckout = (e) => {
        e.preventDefault()
        handleCheckout({ cart: cart, contacts: contacts })
    }

    return (
        <>
            <h1>Cart</h1>
            <AddContacts />
            <hr className="my-5" />
            {!hasProducts && (
                <div className="alert alert-info fs-5 my-3">Please add products to cart!</div>
            )}
            <div className='row'>
                {products.map(product => {
                    return (
                        cart.includes(product.id) ?
                            (<div className="col-md-6 col-lg-4 col-xl-3 mb-4" key={product.id}>
                                <Product product={product} />
                            </div>) : null
                    )
                })}
            </div>
            <hr className="my-4" />
            {hasProducts && <button type="button" className="btn btn-success btn-lg py-3 fs-4 w-100" onClick={doCheckout}>Checkout</button>}

        </>
    )
}

Cart.propTypes = {
    products: PropTypes.array.isRequired,
    cart: PropTypes.array.isRequired,
    contacts: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    products: state.product.products,
    cart: state.product.cart,
    contacts: state.product.contacts
})

export default connect(mapStateToProps, null)(Cart)
