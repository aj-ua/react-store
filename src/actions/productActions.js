import { GET_DATA, HANDLE_CART, HANDLE_WISHLIST } from './types'
import axios from 'axios'

export const getData = () => async dispatch => {
    let wishlist = []
    let cart = []
    let products = []

    if (localStorage.getItem('wishlist')) {
        wishlist = await JSON.parse(localStorage.getItem('wishlist'))
    }

    if (localStorage.getItem('cart')) {
        cart = await JSON.parse(localStorage.getItem('cart'))
    }

    products = await axios.get('data.json')
        .then(res => res.data)
        .then((data) => {
            let productsUpdated = []

            if (data.length > 0) {
                productsUpdated = data.map((product) => {
                    product.inWishlist = wishlist.includes(product.id)
                    product.inCart = cart.includes(product.id)

                    return product
                })
            }

            return productsUpdated

        });

    dispatch({
        type: GET_DATA,
        payload: {
            products: products,
            cart: cart,
            wishlist: wishlist
        }
    })
}

export const handleCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart))
    return {
        type: HANDLE_CART,
        payload: cart
    }
}

export const handleWishlist = (wishlist) => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
    return {
        type: HANDLE_WISHLIST,
        payload: wishlist
    }
}
