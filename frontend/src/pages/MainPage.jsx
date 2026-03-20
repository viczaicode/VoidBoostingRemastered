import React from 'react'
import { Link } from 'react-router-dom'
import logo2 from "../logo2.png";
import useAuthContext from '../contexts/AuthContext'
import TypeWriter from '../components/TypeWriter';

export default function MainPage() {
    const { user } = useAuthContext();
    const welcomeText =
    "Welcome, summoner. Your ascension begins.\nLet the Void carry you to the rank you deserve.";

  return (
    <div className="main-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="udvozlo">
            <img src={logo2} className="App-logo2" alt="logo" />
            <div className="hero-text">
              <p className="typing-text">
                <span className="intro-bold">
                  <TypeWriter text={welcomeText.split("\n")[0]} />
                </span>
                <br />
                <br />
                <TypeWriter text={welcomeText.split("\n")[1]} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose VoidBoosting?</h2>
            <p>Professional boosting services with guaranteed results</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>Fast Results</h3>
              <p>Quick and efficient rank boosting with professional players</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>100% Secure</h3>
              <p>Your account safety is our top priority with VPN protection</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <h3>Guaranteed Rank</h3>
              <p>We guarantee your desired rank or your money back</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer support for all your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview">
        <div className="container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>Choose from our wide range of boosting options</p>
          </div>
          
          <div className="services-grid">
            <div className="service-preview-card">
              <div className="service-preview-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Rank Boosting</h3>
              <p>Climb the ranks with our professional boosters</p>
              <Link to="/services" className="service-link">
                Learn More <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            
            <div className="service-preview-card">
              <div className="service-preview-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Coaching</h3>
              <p>Improve your skills with expert coaching sessions</p>
              <Link to="/services" className="service-link">
                Learn More <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            
            <div className="service-preview-card">
              <div className="service-preview-icon">
                <i className="fas fa-key"></i>
              </div>
              <h3>Account Recovery</h3>
              <p>Recover and secure your lost accounts</p>
              <Link to="/services" className="service-link">
                Learn More <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of satisfied customers who reached their dream rank</p>
            <div className="cta-buttons">
              {user ? (
                <Link to="/services" className="btn btn-primary btn-large">
                  <i className="fas fa-rocket"></i> View Services
                </Link>
              ) : (
                <>
                  <Link to="/regisztracio" className="btn btn-primary btn-large">
                    <i className="fas fa-user-plus"></i> Get Started
                  </Link>
                  <Link to="/bejelentkezes" className="btn btn-secondary btn-large">
                    <i className="fas fa-sign-in-alt"></i> Log In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Success Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Professional Boosters</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
