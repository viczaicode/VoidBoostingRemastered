import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo2.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src={logo} className="footer-logo-img" alt="VoidBoosting Logo" />
              <h3>VoidBoosting</h3>
              <p>Your trusted gaming companion</p>
            </div>
            <div className="footer-social">
              <a href="#" className="social-link">
                <i className="fab fa-discord"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/services">Services</NavLink></li>
              <li><NavLink to="/aboutus">About Us</NavLink></li>
              <li><NavLink to="/support">Support</NavLink></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><NavLink to="/services">Rank Boosting</NavLink></li>
              <li><NavLink to="/services">Coaching</NavLink></li>
              <li><NavLink to="/services">Account Recovery</NavLink></li>
              <li><NavLink to="/services">Tournament Prep</NavLink></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><NavLink to="/support">Help Center</NavLink></li>
              <li><NavLink to="/support">Contact Us</NavLink></li>
              <li><NavLink to="/support">FAQ</NavLink></li>
              <li><NavLink to="/support">Terms of Service</NavLink></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Account</h4>
            <div className="footer-account">
              <NavLink to="/bejelentkezes" className="footer-login-btn">
                <i className="fas fa-sign-in-alt"></i> Log in
              </NavLink>
              <NavLink to="/regisztracio" className="footer-register-btn">
                <i className="fas fa-user-plus"></i> Register
              </NavLink>
            </div>
            <div className="footer-payment">
              <h5>Payment Methods</h5>
              <div className="payment-icons">
                <i className="fab fa-cc-visa"></i>
                <i className="fab fa-cc-mastercard"></i>
                <i className="fab fa-cc-paypal"></i>
                <i className="fab fa-bitcoin"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 VoidBoosting. All rights reserved.</p>
            <div className="footer-bottom-links">
              <NavLink to="/support">Privacy Policy</NavLink>
              <NavLink to="/support">Terms of Service</NavLink>
              <NavLink to="/support">Cookie Policy</NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

