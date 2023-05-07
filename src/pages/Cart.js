import React from 'react'
import Product from '../components/Product'

export default function Cart({ products, wishlist, cart, handleWishlist, handleCart }) {
    return (
        <>
            <h1>Cart</h1>
            <div className='row'>
                {products.map(product => {
                    return (
                        cart.includes(product.id) ?
                            (<div className='col-md-6 col-lg-4 col-xl-3 mb-4' key={product.id}>
                                <Product product={product} wishlist={wishlist} cart={cart} handleWishlist={handleWishlist} handleCart={handleCart} />
                            </div>) : null
                    )
                })}
            </div>
        </>
    )
}
