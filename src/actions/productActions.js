import { GET_PRODUCTS, HANDLE_CART, HANDLE_WISHLIST } from './types'

export const getProducts = () => {
    return {
        type: GET_PRODUCTS
    }
}

export const handleCart = (cart) => {
    return {
        type: HANDLE_CART,
        payload: cart
    }
}

export const handleWishlist = (wishlist) => {
    return {
        type: HANDLE_WISHLIST,
        payload: wishlist
    }
}
