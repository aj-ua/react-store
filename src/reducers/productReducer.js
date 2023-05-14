import { GET_DATA, HANDLE_CART, HANDLE_WISHLIST, HANDLE_MODAL, TOGGLE_MODAL, ADD_CONTACTS, HANDLE_CHECKOUT } from '../actions/types'

const initialState = {
    products: [],
    cart: [],
    wishlist: [],
    contacts: {},
    modals: [],
    activeModal: {
        id: "none",
        title: "Modal",
        text: "...",
        closeButton: true,
        actionBtn: {
            "className": "btn-success",
            "text": "Yes"
        },
        action: () => console.log('modal none'),
    },
    isModalOpen: false
}

export default function (state = initialState, action) {
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

        case HANDLE_MODAL:
            console.log('reducer HANDLE_MODAL');
            console.log('action.payload', action.payload);
            return {
                ...state,
                activeModal: action.payload
            }

        case TOGGLE_MODAL:
            console.log('reducer TOGGLE_MODAL');
            return {
                ...state,
                isModalOpen: !state.isModalOpen
            }

        case ADD_CONTACTS:
            console.log('reducer ADD_CONTACTS');
            return {
                ...state,
                contacts: action.payload
            }

        case HANDLE_CHECKOUT:
            console.log('reducer HANDLE_CHECKOUT');
            return {
                ...state
            }

        default:
            return state
    }
}
