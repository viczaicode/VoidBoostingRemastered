import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import useAuthContext from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

export default function Navigacio() {
    const { user, logout } = useAuthContext();
    const { getItemCount } = useCart();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    function closeMobileMenu() {
        setMobileMenuOpen(false);
    }

    function handleNavigate(path) {
        navigate(path);
        closeMobileMenu();
    }

    function handleTrustpilot() {
        window.open("https://www.trustpilot.com/", "_blank", "noopener,noreferrer");
        closeMobileMenu();
    }

    async function handleLogout() {
        await logout();
        closeMobileMenu();
        navigate("/");
    }

    return (
        <header className="navbar">
            <div className="header-container">
                <div className="logo">
                    <NavLink to="/">
                        <img src={logo} className="App-logo" alt="logo" />
                    </NavLink>
                </div>

                <button
                    type="button"
                    className="mobile-menu-toggle"
                    aria-label="Toggle navigation"
                    aria-expanded={mobileMenuOpen}
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                >
                    <i className={mobileMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
                </button>

                <nav className={`nav-center ${mobileMenuOpen ? "is-open" : ""}`}>
                    <ul>
                        <li>
                            <NavLink to="/" end onClick={closeMobileMenu}>
                                Homepage
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/services" onClick={closeMobileMenu}>Services</NavLink>
                        </li>
                        <li>
                            <NavLink to="/aboutus" onClick={closeMobileMenu}>About us</NavLink>
                        </li>
                        
                        {user?.role >= 1 && (
                            <li>
                                <NavLink to="/booster-panel" onClick={closeMobileMenu}>Booster Panel</NavLink>
                            </li>
                        )}
                        {user?.role === 2 && (
                            <li>
                                <NavLink to="/admin-panel" onClick={closeMobileMenu}>Admin Panel</NavLink>
                            </li>
                        )}
                    </ul>
                </nav>

                <div className="nav-right">
                    <button type="button" className="btn btn-trustpilot" onClick={handleTrustpilot}>
                        <i className="fa-solid fa-star"></i> Trustpilot
                    </button>
                    <button type="button" className="btn btn-cart" onClick={() => handleNavigate("/cart")}>
                        <i className="fa-solid fa-shopping-cart"></i> Cart
                        <span className="cart-count">{getItemCount()}</span>
                    </button>

                    {user ? (
                        <>
                            <span className="bejelentkezettFelhasznaloNev">{user?.nickname}</span>
                            <button type="button" className="btn btn-login" onClick={handleLogout}>
                                Log out
                            </button>
                        </>
                    ) : (
                        <button type="button" className="btn btn-login" onClick={() => handleNavigate("/bejelentkezes")}>
                            <i className="fa-solid fa-user"></i> Log in
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}