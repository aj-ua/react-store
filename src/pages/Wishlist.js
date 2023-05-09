import React from 'react'
import Product from '../components/Product'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Wishlist = ({ products, wishlist }) => {
    return (
        <>
            <h1>Wishlist</h1>
            <div className='row'>
                {products.map(product => {
                    return (
                        wishlist.includes(product.id) ?
                            (<div className='col-md-6 col-lg-4 col-xl-3 mb-4' key={product.id}>
                                <Product product={product} />
                            </div>) : null
                    )
                })}
            </div>
        </>
    )
}

Wishlist.propTypes = {
    products: PropTypes.array.isRequired,
    wishlist: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    products: state.product.products,
    wishlist: state.product.wishlist
})

export default connect(mapStateToProps, null)(Wishlist)
