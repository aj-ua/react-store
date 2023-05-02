import React, { useEffect, useState } from 'react'
import products from '../data.json';
import Product from './Product'

const Products = () => {
    // const [wishlist, setWishlist] = useState([])
    const [productsList, setProductsList] = useState([])

    useEffect(() => {
        let wishlist = []
        wishlist = JSON.parse(localStorage.getItem('wishlist'))
        console.log('loaded wishlist', wishlist)

        // if (wishlist) {
        //     setWishlist(wishlist)
        // }

        let productsUpdated
        productsUpdated = products.map((product) => {
            product.wishlist = wishlist.includes(product.id) ? true : false
            return product
        })
        setProductsList(productsUpdated)
        console.log('productsUpdated', productsUpdated)
    }, []);

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
        <div>
            {productsList.length > 0 && (
                <div className="container my-5">
                    <div className='row'>
                        {productsList.map(product => (
                            <div className='col-md-6 col-lg-4 col-xl-3 mb-4' key={product.id}>
                                <Product product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Products
