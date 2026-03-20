import { NavLink } from "react-router-dom";
import logo from "../logo.png";

function Footer() {
  return (
    <footer>
      <img src={logo} className="App-logo" alt="logo" />

      <div className="footer-right">
        <button className="cart-btn">🛒</button>
        <NavLink to="/login">
          <button className="login-btn">Log in</button>
        </NavLink>
      </div>
    </footer>
  );
}

export default Footer;

