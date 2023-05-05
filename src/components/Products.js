import React, { useEffect, useState } from 'react'
import products from '../data.json';
import Product from './Product'

const Products = ({ wishCountHandler, cartCountHandler }) => {
    const [productsList, setProductsList] = useState([])

    useEffect(() => {
        let countWishlist = 0
        let countCart = 0
        let wishlist = []
        let cart = []

        if (localStorage.getItem('wishlist')) {
            wishlist = JSON.parse(localStorage.getItem('wishlist'))
        }

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        let productsUpdated
        productsUpdated = products.map((product) => {
            if (wishlist.includes(product.id)) {
                product.wishlist = true
                countWishlist++

            } else {
                product.wishlist = false
            }

            if (cart.includes(product.id)) {
                product.cart = true
                countCart++

            } else {
                product.cart = false
            }

            return product
        })
        setProductsList(productsUpdated)
        wishCountHandler(countWishlist)
        cartCountHandler(countCart)
    }, [wishCountHandler, cartCountHandler]);

    // // 1: Fetch from local file
    // const [products, setProducts] = useState([]);
    // const getProducts = () => {
    //     fetch('./data.json', {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     }
    //     )
    //         .then(function (response) {
    //             console.log(response)
    //             return response.json();
    //         })
    //         .then(function (myJson) {
    //             console.log(myJson);
    //             setProducts(myJson)
    //         });
    // }
    // useEffect(() => {
    //     getProducts()
    // }, [])


    // // 2: Fetch from API
    // const [products, setProducts] = useState([])
    // const fetchProductData = () => {
    //     fetch("https://fakestoreapi.com/products")
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(data => {
    //             setProducts(data)
    //         })
    // }

    // useEffect(() => {
    //     fetchProductData()
    // }, [])

    return (
        <main>
            {productsList.length > 0 && (
                <div className='row'>
                    {productsList.map(product => (
                        <div className='col-md-6 col-lg-4 col-xl-3 mb-4' key={product.id}>
                            <Product product={product} wishCountHandler={wishCountHandler} cartCountHandler={cartCountHandler} />
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}

export default Products
