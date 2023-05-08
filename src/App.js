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
    const [wishlist, setWishlist] = useState([])
    const [cart, setCart] = useState([])

    const getData = () => {
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
                        product.inWishlist = wishlist.includes(product.id)
                        product.inCart = cart.includes(product.id)

                        return product
                    })
                    setProducts(productsUpdated)
                    handleWishlist(wishlist)
                    handleCart(cart)
                }

            });
    }
    useEffect(() => {
        // executed only once
        getData()
    }, [])

    const handleWishlist = useCallback((wishlist) => {
        setWishlist((prev) => wishlist)
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }, [])

    const handleCart = useCallback((cart) => {
        setCart((prev) => cart)
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [])

    return (
        <BrowserRouter>
            <div className="App">
                <Header wishlist={wishlist} cart={cart} />
                <main className="main container my-5">
                    <Routes>
                        <Route
                            path="/"
                            element={<Products products={products} wishlist={wishlist} cart={cart} handleWishlist={handleWishlist} handleCart={handleCart} />}
                        />
                        <Route
                            path="/wishlist"
                            element={<Wishlist products={products} wishlist={wishlist} handleWishlist={handleWishlist} handleCart={handleCart} />}
                        />
                        <Route
                            path="/cart"
                            element={<Cart products={products} wishlist={wishlist} cart={cart} handleWishlist={handleWishlist} handleCart={handleCart} />}
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
