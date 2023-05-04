import { useState, useCallback } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './components/Products';

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
        <div className="App">
            <Header wishCount={wishCount} cartCount={cartCount} />
            <Products wishCountHandler={wishCountHandler} cartCountHandler={cartCountHandler} />
            <Footer />
        </div>
    );
}

export default App;
