import React from 'react'
import Product from '../components/Product'

export default function Wishlist({ products, wishlist, handleWishlist, cartCountHandler }) {
    return (
        <>
            <h1>Wishlist</h1>
            <div className='row'>
                {products.map(product => {
                    return (
                        wishlist.includes(product.id) ?
                            (<div className='col-md-6 col-lg-4 col-xl-3 mb-4' key={product.id}>
                                <Product product={product} wishlist={wishlist} handleWishlist={handleWishlist} cartCountHandler={cartCountHandler} />
                            </div>) : null
                    )
                })}
            </div>
        </>
    )
}
