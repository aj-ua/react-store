import React, { useEffect, useState } from 'react'

const Product = props => {
    const { id, title, price, description, image, wishlist } = props.product
    const wishCountHandler = props.wishCountHandler
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (wishlist) {
            setActive(wishlist)
        }
    }, [wishlist])

    const handleWishlist = () => {
        const newActive = !active
        setActive((newActive))

        let wishlistArr = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : []

        if (newActive) {

            if (wishlistArr.length) {
                if (!wishlistArr.includes(id)) {
                    wishlistArr = [...wishlistArr, id];
                    wishCountHandler()
                }
                // wishlistArr = wishlistArr.includes(id) ? wishlistArr : [...wishlistArr, id]
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

    function handleAdd() {
        if (window.confirm("Add this to cart?") === true) {
            console.log('Product #' + id + ' added to card')
        }
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
                <a href="/#" className="btn btn-lg btn-success mt-2" onClick={handleAdd}><i className="bi bi-cart"></i> Add to cart</a>
            </div >
        </article >
    )
}

export default Product
