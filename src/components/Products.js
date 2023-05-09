import React from 'react'
import Product from './Product'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Products = (props) => {
    const { products } = props
    return (
        <main>
            {products.length > 0 && (
                <>
                    <h1>Products</h1>
                    <div className='row'>
                        {products.map(product => (
                            <div className='col-md-6 col-lg-4 col-xl-3 mb-4' key={product.id}>
                                <Product product={product} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </main>
    )
}

Products.propTypes = {
    products: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    products: state.product.products
})

export default connect(mapStateToProps, null)(Products)
