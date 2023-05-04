import React, { useEffect, useState } from 'react'
import products from '../data.json';
import Product from './Product'

const Products = ({ wishCountHandler }) => {
    const [productsList, setProductsList] = useState([])

    useEffect(() => {
        let count = 0
        let wishlist = []
        if (localStorage.getItem('wishlist')) {
            wishlist = JSON.parse(localStorage.getItem('wishlist'))
        }

        let productsUpdated
        productsUpdated = products.map((product) => {
            if (wishlist.includes(product.id)) {
                product.wishlist = true
                count++

            } else {
                product.wishlist = false
            }
            return product
        })
        setProductsList(productsUpdated)
        wishCountHandler(count)
    }, [wishCountHandler]);

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
                                <Product product={product} wishCountHandler={wishCountHandler} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Products
