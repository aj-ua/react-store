import React, { useEffect } from 'react'
import Product from './Product'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { GET_PRODUCTS } from '../actions/types'

const Products = (props) => {
    useEffect(() => {
        console.log('props', props);
        props.getProducts()
    }, [])

    const { products, wishlist, cart, handleWishlist, handleCart } = props

    return (
        <main>
            {products.length > 0 && (
                <>
                    <h1>Products</h1>
                    <div className='row'>
                        {products.map(product => (
                            <div className='col-md-6 col-lg-4 col-xl-3 mb-4' key={product.id}>
                                <Product product={product} wishlist={wishlist} cart={cart} handleWishlist={handleWishlist} handleCart={handleCart} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </main>
    )
}

Products.propTypes = {
    products: PropTypes.array.isRequired,
    getProducts: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    products: state.products.products
})

const mapDispatchToProps = (dispatch) => ({
    getProducts: () => dispatch({ type: GET_PRODUCTS })
})

export default connect()(Products)
