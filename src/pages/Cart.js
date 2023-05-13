import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Product from '../components/Product'
import AddContacts from '../components/AddContacts'
import { handleCheckout } from '../actions'

const Cart = ({ products, cart, contacts }) => {
    const productsCart = products.filter(product => cart.includes(product.id))
    const hasProducts = productsCart.length > 0

    const doCheckout = (e) => {
        e.preventDefault()
        handleCheckout({ cart: cart, contacts: contacts })
    }

    return (
        <>
            <h1>Cart</h1>
            {hasProducts ? (

                <>
                    <AddContacts />
                    <hr className="my-5" />
                    <div className='row'>
                        {productsCart.map(product => {
                            return <div className="col-md-6 col-lg-4 col-xl-3 mb-4" key={product.id}>
                                <Product product={product} />
                            </div>
                        })}
                    </div>

                    <hr className="my-4" />
                    <button type="button" className="btn btn-success btn-lg py-3 fs-4 w-100" onClick={doCheckout}>Checkout</button>
                </>

            ) : (
                <div className="my-5">
                    <div className="alert alert-info fs-5 my-3">Please add products to cart!</div>
                </div>
            )}
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
