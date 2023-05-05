import React, { useEffect, useState } from 'react'
import Modal from './Modal'

const Product = props => {
    const { id, title, price, description, image, wishlist, cart } = props.product
    const wishCountHandler = props.wishCountHandler
    const [active, setActive] = useState(false)

    const cartCountHandler = props.cartCountHandler
    const [inCart, setInCart] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        if (wishlist) {
            setActive(wishlist)
        }

        if (cart) {
            setInCart(cart)
        }
    }, [wishlist, cart])

    const handleWishlist = (e) => {
        e.preventDefault()
        const newActive = !active
        setActive((newActive))

        let wishlistArr = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : []

        if (newActive) {

            if (wishlistArr.length) {
                if (!wishlistArr.includes(id)) {
                    wishlistArr = [...wishlistArr, id];
                    wishCountHandler()
                }
            } else {
                wishlistArr.push(id)
                wishCountHandler()
            }
            localStorage.setItem('wishlist', JSON.stringify(wishlistArr))

        } else {

            if (wishlistArr.length) {
                const wishlistArrUpdated = wishlistArr.filter(function (item) {
                    return item !== id
                })
                localStorage.setItem('wishlist', JSON.stringify(wishlistArrUpdated))
                wishCountHandler(-1)
            }

        }
    }

    const handleCart = () => {
        setInCart(true)

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
                <a href="/#" className='position-absolute text-danger fs-1 p-3 z-10 top-0 end-0' onClick={handleWishlist}>
                    {active ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                </a>
            </div>
            <div className="card-body d-flex flex-column">
                <h4 className="card-title">{'(#' + id + ') ' + title}</h4>
                <p className="card-text" style={{ height: '100px', overflow: 'hidden' }}>{description}</p>
                <h3 className='mt-auto'><strong>${price}</strong></h3>
                {inCart ? <a href="/#" className="btn btn-lg btn-success mt-2 disabled"><i className="bi bi-check"></i> In cart</a> : <a href="/#" className="btn btn-lg btn-success mt-2" onClick={toggleModal}><i className="bi bi-cart"></i> Add to cart</a>}
                <Modal title={'Add Product #' + id} closeButton={false} openModal={openModal} actions={[
                    { id: 1, className: "btn-success", text: "Yes", onClick: () => handleCart() },
                    { id: 2, className: "btn-danger", text: "No", onClick: () => toggleModal() },
                ]}>
                    Add <strong>{title}</strong> to cart?
                </Modal>
            </div >
        </article >
    )
}

export default Product
