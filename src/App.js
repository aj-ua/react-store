import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.scss'
import Header from './components/Header'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import Products from './components/Products'

function App() {
    const [wishCount, setWishCount] = useState(0)
    const [cartCount, setCartCount] = useState(0)
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
                <main className="container my-5">
                    <Routes>
                        <Route path="/" element={<Products wishCountHandler={wishCountHandler} cartCountHandler={cartCountHandler} />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
