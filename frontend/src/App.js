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

function App() {
  return (
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
