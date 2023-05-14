import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { useLocation } from 'react-router-dom';

const Product = ({ product, wishlist, cart, handleWishlist, handleCart }) => {
    const { id, title, price, description, image, inWishlist, inCart } = product

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
        setAddedWishlist((prevState => !prevState))

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
                        <Modal
                            title={'Add Product #' + id}
                            modalButton={{
                                className: "btn-primary btn-lg",
                                text: "Remove from cart",
                            }}
                            closeButton={false}
                            isOpen={isOpen}
                            actions={[
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
                            <Modal
                                title={'Add Product #' + id}
                                modalButton={{
                                    className: "btn-success btn-lg",
                                    text: "Add to cart",
                                }}
                                isOpen={isOpen}
                                closeButton={false}
                                actions={[
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

export default Product
