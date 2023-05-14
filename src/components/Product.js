import React, { useEffect, useState } from 'react'

import Button from './Button'
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleCart, handleWishlist, removeOrder } from '../actions'

const Product = (props) => {
    let { wishlist, handleWishlist, cart, handleCart, removeOrder } = props;
    const { id, title, price, description, image, inWishlist, inCart } = props.product

    const [addedWishlist, setAddedWishlist] = useState(false)
    const [addedCart, setAddedCart] = useState(false)

    const pageSlug = useLocation().pathname;
    const isPageCart = pageSlug.includes('cart')

    useEffect(() => {
        if (inWishlist) {
            setAddedWishlist(inWishlist)
        }

        if (inCart) {
            setAddedCart(inCart)
        }
    }, [inWishlist, inCart])

    const updateWishlist = (e) => {
        e.preventDefault()
        setAddedWishlist(prevState => !prevState)

        if (!addedWishlist) {

            if (wishlist.length) {
                if (!wishlist.includes(id)) {
                    wishlist = [...wishlist, id];
                }
            } else {
                wishlist = [...wishlist, id]
            }

        } else {

            if (wishlist.length) {
                wishlist = wishlist.filter(function (item) {
                    return item !== id
                })
            }

        }

        handleWishlist(wishlist)
    }

    const updateCart = (e) => {
        e.preventDefault()
        setAddedCart(prevState => !prevState)

        if (!addedCart) {

            if (cart.length) {
                if (!cart.includes(id)) {
                    cart = [...cart, id];
                }
            } else {
                cart = [...cart, id];
            }

        } else {

            if (cart) {
                cart = cart.filter(function (item) {
                    return item !== id
                })
            }

        }

        removeOrder()
        handleCart(cart)
    }

    return (
        <article className="card h-100" data-id={id}>
            <div className='position-relative p-5'>
                <img src={image} className="card-img-top" alt="" style={{ aspectRatio: "1 / 1" }} />
                <a href="/#" className='position-absolute text-danger fs-1 p-3 z-10 top-0 end-0' onClick={updateWishlist}>
                    {addedWishlist ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                </a>
            </div>
            <div className="card-body d-flex flex-column">
                <h4 className="card-title">{'(#' + id + ') ' + title}</h4>
                {isPageCart ? null : <p className="card-text" style={{ height: '100px', overflow: 'hidden' }}>{description}</p>}
                <h3 className='mt-auto mb-3'><strong>${price}</strong></h3>

                {isPageCart ? (
                    <Button className="btn-primary btn-lg" text="Remove from cart" modal="removeProduct" onClick={(e) => updateCart(e)} />
                ) : (
                    addedCart ? (
                        <a href="/#" className="btn btn-lg btn-secondary disabled"><i className="bi bi-check"></i> In cart</a>
                    ) : (
                        <>
                            <Button className="btn-success btn-lg" text="Add to cart" modal="addProduct" onClick={(e) => updateCart(e)} />
                        </>
                    )
                )

                }

            </div >
        </article >
    )
}

Product.propTypes = {
    product: PropTypes.object.isRequired,
    cart: PropTypes.array.isRequired,
    handleCart: PropTypes.func.isRequired,
    wishlist: PropTypes.array.isRequired,
    handleWishlist: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    cart: state.product.cart,
    wishlist: state.product.wishlist
})

export default connect(mapStateToProps, { handleCart, handleWishlist, removeOrder })(Product)
