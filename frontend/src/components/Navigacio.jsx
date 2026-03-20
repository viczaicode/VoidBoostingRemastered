import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import useAuthContext from "../contexts/AuthContext";

export default function Navigacio() {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();

    async function handleLogout() {
        await logout();
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

                <nav className="nav-center">
                    <ul>
                        <li>
                            <NavLink to="/" end>
                                Homepage
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/services">Services</NavLink>
                        </li>
                        <li>
                            <NavLink to="/aboutus">About us</NavLink>
                        </li>
                        <li>
                            <NavLink to="/support">Support</NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="nav-right">
                    <button className="btn btn-trustpilot">
                        <i className="fa-solid fa-star"></i> Trustpilot
                    </button>
                    <button className="btn btn-cart">
                        <i className="fa-solid fa-shopping-cart"></i> Cart
                        <span className="cart-count">0</span>
                    </button>

                    {user ? (
                        <>
                            <span className="bejelentkezettFelhasznaloNev">{user?.nickname}</span>
                            <button className="btn btn-login" onClick={handleLogout}>
                                Log out
                            </button>
                        </>
                    ) : (
                        <NavLink to="/bejelentkezes">
                            <button className="btn btn-login">
                                <i className="fa-solid fa-user"></i>
                            </button>
                        </NavLink>
                    )}
                </div>
            </div>
        </header>
    );
}