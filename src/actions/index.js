// import { GET_DATA, HANDLE_CART, HANDLE_WISHLIST, ADD_CONTACTS, HANDLE_CHECKOUT } from './types'
import * as types from './types'

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

    products = await fetch('data.json' // from /public folder
        , {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then((response) => response.json())
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
        type: types.GET_DATA,
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
        type: types.HANDLE_CART,
        payload: cart
    }
}

export const handleWishlist = (wishlist) => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
    return {
        type: types.HANDLE_WISHLIST,
        payload: wishlist
    }
}

export const addContacts = (contacts) => {
    console.log('ADD_CONTACTS', contacts);
    return {
        type: types.ADD_CONTACTS,
        payload: contacts
    }
}

export const handleCheckout = (data) => {
    console.log('action HANDLE_CHECKOUT', data);

    return {
        type: types.HANDLE_CHECKOUT,
        payload: data
    }
}
