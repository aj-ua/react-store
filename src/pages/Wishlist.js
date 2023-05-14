import React from 'react'
import Product from '../components/Product'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Wishlist = ({ products, wishlist }) => {
    const productsWishlist = products.filter(product => wishlist.includes(product.id))
    const hasProducts = productsWishlist.length > 0

    return (
        <>
            <h1>Wishlist</h1>
            {hasProducts ? (

                <>
                    <div className='row'>
                        {productsWishlist.map(product => {
                            return <div className='col-md-6 col-lg-4 col-xl-3 mb-4' key={product.id}>
                                <Product product={product} />
                            </div>
                        })}
                    </div>
                </>

            ) : (

                <div className="my-5">
                    <div className="alert alert-info fs-5 my-3">Add products to wishlist!</div>
                </div>

            )}

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
