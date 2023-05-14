import * as types from './types'
import store from '../store'

export const getData = () => async dispatch => {
    let wishlist = []
    let cart = []
    let products = []
    let modals = []

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

        })

    modals = await fetch('modals.json' // from /public folder
        , {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then((response) => response.json())

    dispatch({
        type: types.GET_DATA,
        payload: {
            products: products,
            cart: cart,
            wishlist: wishlist,
            modals: modals,
        }
    })
}

export const handleCart = (cart) => dispatch => {
    localStorage.setItem('cart', JSON.stringify(cart))

    dispatch({
        type: types.HANDLE_CART,
        payload: cart
    })

    dispatch({
        type: types.TOGGLE_MODAL,
    })
}

export const handleWishlist = (wishlist) => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
    return {
        type: types.HANDLE_WISHLIST,
        payload: wishlist
    }
}

export const handleModal = (modal, action, isOpen) => {
    console.log('action handleModal');
    const modals = store.getState().product.modals
    const thisModal = modals.filter(item => item.id === modal)
    return {
        type: types.HANDLE_MODAL,
        payload: {
            ...thisModal[0],
            action: action
        }
    }
}

export const toggleModal = () => {
    console.log('action TOGGLE_MODAL');
    return {
        type: types.TOGGLE_MODAL,
    }
}

export const addContacts = (contacts) => {
    console.log('ADD_CONTACTS', contacts);
    return {
        type: types.ADD_CONTACTS,
        payload: contacts
    }
}

export const handleCheckout = (cart, contacts) => {
    console.log('action HANDLE_CHECKOUT', cart, contacts);
    const order = { cart: cart, contacts: contacts }
    localStorage.removeItem('cart')

    return {
        type: types.HANDLE_CHECKOUT,
        payload: {
            cart: [],
            contacts: {},
            order: order
        }
    }
}

export const removeOrder = () => {
    console.log('REMOVE_ORDER');
    return {
        type: types.REMOVE_ORDER,
    }
}
