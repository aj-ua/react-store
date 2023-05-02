import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './components/Products';

function App() {
    return (
        <div className="App">
            <Header />
            <Products />
            <Footer />
        </div>
    );
}

export default App;
