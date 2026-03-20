import './App.css';
import { Routes, Route } from "react-router-dom";
import Navigacio from './components/Navigacio';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import SupportPage from './pages/SupportPage';
import LogIn from './pages/LogIn';
import Registration from './pages/Registration';
import BoostingBelowMasters from './pages/BoostingBelowMasters';
import BoostingAboveMasters from './pages/BoostingAboveMasters';
import Cart from './components/Cart';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Navigacio />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/aboutus" element={<AboutPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/bejelentkezes" element={<LogIn />} />
            <Route path="/regisztracio" element={<Registration />} />
            <Route path="/boosting-below-masters" element={<BoostingBelowMasters />} />
            <Route path="/boosting-above-masters" element={<BoostingAboveMasters />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
