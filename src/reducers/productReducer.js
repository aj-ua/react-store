import { GET_DATA, HANDLE_CART, HANDLE_WISHLIST, ADD_CONTACTS, HANDLE_CHECKOUT, REMOVE_ORDER } from '../actions/types'

const initialState = {
    products: [],
    cart: [],
    wishlist: [],
    contacts: {},
    modals: [],
    order: {}
}

export default function productReducers(state = initialState, action) {
    switch (action.type) {
        case GET_DATA:
            console.log('reducer GET_DATA');
            return {
                ...state,
                products: action.payload.products,
                cart: action.payload.cart,
                wishlist: action.payload.wishlist,
                modals: action.payload.modals
            }

        case HANDLE_CART:
            console.log('reducer HANDLE_CART');
            return {
                ...state,
                cart: action.payload
            }

        case HANDLE_WISHLIST:
            console.log('reducer HANDLE_WISHLIST');
            return {
                ...state,
                wishlist: action.payload
            }

        case ADD_CONTACTS:
            console.log('reducer ADD_CONTACTS');
            return {
                ...state,
                contacts: action.payload
            }

        case HANDLE_CHECKOUT:
            console.log('reducer HANDLE_CHECKOUT');
            console.log('action.payload.order', action.payload.order);
            return {
                ...state,
                cart: action.payload.cart,
                contacts: action.payload.contacts,
                order: action.payload.order
            }

        case REMOVE_ORDER:
            console.log('reducer REMOVE_ORDER');
            return {
                ...state,
                order: {}
            }

        default:
            return state
    }
}
