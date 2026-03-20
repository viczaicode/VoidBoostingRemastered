import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import LogIn from './pages/LogIn';
import Registration from './pages/Registration';
import VendegLayout from "./layouts/VendegLayout";
import MainPage from './pages/MainPage';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Routes>
            <Route path="/" element={<VendegLayout />}>
                <Route index element={<MainPage />} />
                <Route path="bejelentkezes" element={<LogIn />} />
                <Route path="regisztracio" element={<Registration />} />

            </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
