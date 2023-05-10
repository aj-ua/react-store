import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleCart, handleWishlist } from '../actions/productActions'

const Product = (props) => {
    let { wishlist, handleWishlist, cart, handleCart } = props;
    const { id, title, price, description, image, inWishlist, inCart } = props.product

    const [addedWishlist, setAddedWishlist] = useState(false)
    const [addedCart, setAddedCart] = useState(false)
    const [isOpen, setisOpen] = useState(false)

    const pageSlug = useLocation().pathname;

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
                wishlist.push(id)
            }

        } else {

            if (wishlist) {
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

        console.log('cart', cart);

        if (!addedCart) {

            if (cart.length) {
                if (!cart.includes(id)) {
                    cart = [...cart, id];
                }
            } else {
                cart.push(id)
            }

            alert('Product #' + id + ' added to card')

        } else {

            if (cart) {
                cart = cart.filter(function (item) {
                    return item !== id
                })
            }

        }

        handleCart(cart)
    }

    const toggleModal = (e) => {
        e.preventDefault()
        setisOpen(prevToggle => !prevToggle)
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
                <p className="card-text" style={{ height: '100px', overflow: 'hidden' }}>{description}</p>
                <h3 className='mt-auto mb-3'><strong>${price}</strong></h3>

                {pageSlug.includes('cart') ? (
                    <>
                        <a href="/#" className="btn btn-lg btn-danger" onClick={(e) => toggleModal(e)}>Remove from cart</a>
                        <Modal title={'Add Product #' + id} closeButton={false} isOpen={isOpen} actions={[
                            { id: 1, className: "btn-success", text: "Yes remove", onClick: (e) => updateCart(e) },
                            { id: 2, className: "btn-danger", text: "No" },
                        ]}>
                            Remove <strong>{title}</strong> from cart?
                        </Modal>
                    </>
                ) : (
                    addedCart ? (
                        <a href="/#" className="btn btn-lg btn-secondary disabled"><i className="bi bi-check"></i> In cart</a>
                    ) : (
                        <>
                            <a href="/#" className="btn btn-lg btn-success" onClick={(e) => toggleModal(e)}><i className="bi bi-cart"></i> Add to cart</a>
                            <Modal title={'Add Product #' + id} closeButton={false} isOpen={isOpen} actions={[
                                { id: 1, className: "btn-success", text: "Yes add", onClick: (e) => updateCart(e) },
                                { id: 2, className: "btn-danger", text: "No" },
                            ]}>
                                Add <strong>{title}</strong> to cart?
                            </Modal>
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

export default connect(mapStateToProps, { handleCart, handleWishlist })(Product)
