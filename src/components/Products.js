import React from 'react'
import Product from './Product'

const Products = ({ products, wishlist, cart, handleWishlist, handleCart }) => {
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

export default Products
