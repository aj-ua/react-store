import React from 'react'
import Product from '../components/Product'
import AddContacts from '../components/AddContacts'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Cart = ({ products, cart }) => {
    return (
        <>
            <h1>Cart</h1>
            <AddContacts />
            <div className='row'>
                {products.map(product => {
                    return (
                        cart.includes(product.id) ?
                            (<div className='col-md-6 col-lg-4 col-xl-3 mb-4' key={product.id}>
                                <Product product={product} />
                            </div>) : null
                    )
                })}
            </div>
        </>
    )
}

Cart.propTypes = {
    products: PropTypes.array.isRequired,
    cart: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    products: state.product.products,
    cart: state.product.cart
})

export default connect(mapStateToProps, null)(Cart)
