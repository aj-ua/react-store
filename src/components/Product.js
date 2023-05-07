import React, { useEffect, useState } from 'react'
import Modal from './Modal'

const Product = ({ product, wishlist, wishCountHandler, handleWishlist, cartCountHandler }) => {
    const { id, title, price, description, image, inWishlist, inCart } = product

    const [addedWishlist, setAddedWishlist] = useState(false)
    const [addedCart, setAddedCart] = useState(false)
    const [openModal, setOpenModal] = useState(false)

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

        // let wishlistArr = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : []

        if (!addedWishlist) {

            if (wishlist.length) {
                if (!wishlist.includes(id)) {
                    wishlist = [...wishlist, id];
                    // wishCountHandler()
                }
            } else {
                wishlist.push(id)
                // wishCountHandler()
            }
            // localStorage.setItem('wishlist', JSON.stringify(wishlist))

        } else {

            if (wishlist) {
                wishlist = wishlist.filter(function (item) {
                    return item !== id
                })
                // localStorage.setItem('wishlist', JSON.stringify(wishlist))
                // wishCountHandler(-1)
            }

        }

        // setWishlist(prev => wishlist)
        // setWishCount(prev => wishlist.length)
        // localStorage.setItem('wishlist', JSON.stringify(wishlist))
        handleWishlist(wishlist)
    }

    const handleCart = (e) => {
        e.preventDefault()
        setAddedCart(true)

        let cartArr = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

        if (cartArr.length) {
            if (!cartArr.includes(id)) {
                cartArr = [...cartArr, id];
                cartCountHandler()
            }
        } else {
            cartArr.push(id)
            cartCountHandler()
        }
        localStorage.setItem('cart', JSON.stringify(cartArr))

        console.log('Product #' + id + ' added to card')
        toggleModal()
    }

    const toggleModal = () => {
        setOpenModal(prevToggle => !prevToggle)
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
                <h3 className='mt-auto'><strong>${price}</strong></h3>
                {addedCart ? <a href="/#" className="btn btn-lg btn-secondary mt-2 disabled"><i className="bi bi-check"></i> In cart</a> : <a href="/#" className="btn btn-lg btn-success mt-2" onClick={toggleModal}><i className="bi bi-cart"></i> Add to cart</a>}
                <Modal title={'Add Product #' + id} closeButton={false} openModal={openModal} actions={[
                    { id: 1, className: "btn-success", text: "Yes", onClick: (e) => handleCart(e) },
                    { id: 2, className: "btn-danger", text: "No", onClick: () => toggleModal() },
                ]}>
                    Add <strong>{title}</strong> to cart?
                </Modal>
            </div >
        </article >
    )
}

export default Product
