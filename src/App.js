import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Products from './components/Products'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

function App() {
    const [products, setProducts] = useState([])
    const [wishCount, setWishCount] = useState(0)
    const [cartCount, setCartCount] = useState(0)

    const getData = () => {
        let countWishlist = 0
        let countCart = 0
        let wishlist = []
        let cart = []
        let productsUpdated

        if (localStorage.getItem('wishlist')) {
            wishlist = JSON.parse(localStorage.getItem('wishlist'))
        }

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        fetch('data.json' // from /public folder
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => response.json())
            .then((data) => {

                if (data.length > 0) {
                    productsUpdated = data.map((product) => {
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
                    wishCountHandler(countWishlist)
                    cartCountHandler(countCart)
                    setProducts(productsUpdated)
                }

            });
    }
    useEffect(() => {
        console.log("executed only once!");
        getData()

    }, [])


    const wishCountHandler = useCallback((amount = 1) => {
        if (amount === 1) {
            console.log('wishCountHandler +++')
        } else if (amount === -1) {
            console.log('wishCountHandler ---')
        }
        setWishCount(prev => prev + amount)
    }, [])

    const cartCountHandler = useCallback((amount = 1) => {
        if (amount === 1) {
            console.log('cartCountHandler +++')
        } else if (amount === -1) {
            console.log('cartCountHandler ---')
        }
        setCartCount(prev => prev + amount)
    }, [])

    return (
        <BrowserRouter>
            <div className="App">
                <Header wishCount={wishCount} cartCount={cartCount} />
                <main className="main container my-5">
                    <Routes>
                        <Route
                            path="/"
                            element={<Products products={products} wishCountHandler={wishCountHandler} cartCountHandler={cartCountHandler} />}
                        />
                        <Route
                            path="/wishlist"
                            element={<Wishlist />}
                        />
                        <Route
                            path="/cart"
                            element={<Cart />}
                        />
                        <Route
                            path="*"
                            element={<NotFound />}
                        />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
