import { GET_DATA, HANDLE_CART, HANDLE_WISHLIST, HANDLE_CONTACTS } from '../actions/types'

const initialState = {
    products: [],
    cart: [],
    wishlist: [],
    contacts: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                products: action.payload.products,
                cart: action.payload.cart,
                wishlist: action.payload.wishlist
            }

        case HANDLE_CART:
            return {
                ...state,
                cart: action.payload
            }

        case HANDLE_WISHLIST:
            return {
                ...state,
                wishlist: action.payload
            }

        case HANDLE_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            }

        default:
            return state
    }
}
