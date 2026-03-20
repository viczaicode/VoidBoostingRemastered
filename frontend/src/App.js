import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from './pages/LogIn';
import Registration from './pages/Registration';
import VendegLayout from "./layouts/VendegLayout";
import MainPage from './pages/MainPage';
import Navigacio from './components/Navigacio';
import { AuthProvider } from './contexts/AuthContext';
import SupportPage from './pages/SupportPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <main>
          <Routes>
              <Route path="/" element={<VendegLayout />}>
                  <Route index element={<MainPage />} />
                  <Route path="bejelentkezes" element={<LogIn />} />
                  <Route path="regisztracio" element={<Registration />} />
                  <Route path="support" element={<SupportPage />} />
                  <Route path="services" element={<ServicesPage />} />
                  <Route path="aboutus" element={<AboutPage />} />




              </Route>
          </Routes>
        </main>
        
      </header>
    </div>
  );
}

export default App;
