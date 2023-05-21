import React from 'react'
import Product from './Product'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useState } from 'react';
import { LayoutContext } from '../context/LayoutContext';
import classnames from 'classnames'

const Products = ({ products }) => {
    const [isGrid, setIsGrid] = useState(true);
    return (
        <>
            <h1>Products</h1>

            <div className='text-end mb-3'>
                <div className="btn-group">
                    <button className={classnames('btn btn-primary', { 'active': isGrid })} onClick={() => setIsGrid(true)}>Grid</button>
                    <button className={classnames('btn btn-primary', { 'active': !isGrid })} onClick={() => setIsGrid(false)}>Table</button>
                </div>
            </div>
            <LayoutContext.Provider value={isGrid}>
                {products.length > 0 && (
                    <div className='row'>
                        {products.map(product => (
                            <div className={isGrid ? 'col-md-6 col-lg-4 col-xl-3 mb-4' : 'col-12 mb-4 mb-md-2'} key={product.id}>
                                <Product product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </LayoutContext.Provider>
        </>
    )
}

Products.propTypes = {
    products: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    products: state.product.products
})

export default connect(mapStateToProps, null)(Products)
