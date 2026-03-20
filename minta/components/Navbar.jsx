import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import logo from "../logo.png";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
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
              <NavLink to="/about">About us</NavLink>
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

          {isAuthenticated ? (
            <>
              <span className="bejelentkezettFelhasznaloNev">{user?.name}</span>
              <button className="btn btn-login" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <NavLink to="/login">
              <button className="btn btn-login">
                <i className="fa-solid fa-user"></i> Log in
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

