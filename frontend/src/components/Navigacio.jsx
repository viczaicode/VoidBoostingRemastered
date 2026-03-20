import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function Navigacio() {

    const { user, logout } = useAuthContext();

    return (
        <nav className="navbar">
            <div className="header-container">
                <ul className="navbar-nav">
                    <li className="navbar-item">
                        <Link className="nav-link" to="/">
                            HomePage
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="nav-link" to="/services">
                            Services
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="nav-link" to="/aboutus">
                            About us
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="nav-link" to="/support">
                            Support
                        </Link>
                    </li>
                    {user ? (
                        <>
                            <li className="navbar-item">
                                <button className="nav-link" onClick={()=>{logout()}}>
                                    Kijelentkezés
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/bejelentkezes">
                                    Bejelentkezés
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/regisztracio">
                                    Regisztráció
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}