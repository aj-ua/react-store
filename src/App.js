import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

import Header from './components/Header'
import Footer from './components/Footer'
import Products from './components/Products'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.scss'

function App() {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <main className="main container my-5">
                        <Routes>
                            <Route
                                path="/"
                                element={<Products />}
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
        </Provider>
    );
}

export default App;
