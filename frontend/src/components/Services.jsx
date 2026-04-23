import { useContext } from "react";
import { Link } from "react-router-dom";
import { ServiceContext } from "../contexts/ServiceContext";

function Services() {
  const { loading } = useContext(ServiceContext);

  if (loading) return (
    <div className="loader-center">
      <div className="spinner"></div>
    </div>
  );

  return (
    <div className="services-grid">
      {/* Below Masters Service */}
      <div className="service-card">
        <div className="service-card-header">
          <div className="service-icon">
            <i className="fas fa-rocket"></i>
          </div>
          <h3>Below Masters Boosting</h3>
        </div>
        
        <div className="service-card-body">
          <p>Climb from Iron to Diamond with our professional boosters. Fast, secure, and guaranteed results.</p>
          
          <div className="service-features">
            <div className="service-feature">
              <i className="fas fa-check-circle"></i>
              <span>Iron to Diamond</span>
            </div>
            <div className="service-feature">
              <i className="fas fa-shield-alt"></i>
              <span>100% Secure</span>
            </div>
            <div className="service-feature">
              <i className="fas fa-headset"></i>
              <span>24/7 Support</span>
            </div>
            <div className="service-feature">
              <i className="fas fa-trophy"></i>
              <span>Guaranteed Rank</span>
            </div>
          </div>
        </div>
        
        <div className="service-card-footer">
          <div className="service-price">
            <span className="price-label">Starting from</span>
            <span className="price-amount">$15</span>
          </div>
          <Link to="/boosting-below-masters" className="service-order-btn">
            <i className="fas fa-shopping-cart"></i>
            Order Now
          </Link>
        </div>
      </div>

      {/* Above Masters Service */}
      <div className="service-card masters-service">
        <div className="service-card-header">
          <div className="service-icon masters-icon">
            <i className="fas fa-crown"></i>
          </div>
          <h3>Above Masters Boosting</h3>
        </div>
        
        <div className="service-card-body">
          <p>Elite boosting service for Master, Grandmaster, and Challenger ranks. Play with top-tier boosters.</p>
          
          <div className="service-features">
            <div className="service-feature">
              <i className="fas fa-check-circle"></i>
              <span>Master to Challenger</span>
            </div>
            <div className="service-feature">
              <i className="fas fa-user-shield"></i>
              <span>Top Tier Boosters</span>
            </div>
            <div className="service-feature">
              <i className="fas fa-video"></i>
              <span>Live Streaming</span>
            </div>
            <div className="service-feature">
              <i className="fas fa-users"></i>
              <span>Play with Booster</span>
            </div>
          </div>
        </div>
        
        <div className="service-card-footer">
          <div className="service-price">
            <span className="price-label">Starting from</span>
            <span className="price-amount">$50</span>
          </div>
          <Link to="/boosting-above-masters" className="service-order-btn masters-order-btn">
            <i className="fas fa-crown"></i>
            Order Elite Boost
          </Link>
        </div>
      </div>

      {/* Coaching Service */}
      <div className="service-card">
        <div className="service-card-header">
          <div className="service-icon">
            <i className="fas fa-chalkboard-teacher"></i>
          </div>
          <h3>Coaching Service</h3>
        </div>

        <div className="service-card-body">
          <p>1-on-1 coaching sessions with experienced players to improve your macro, mechanics, and decision-making.</p>

          <div className="service-features">
            <div className="service-feature">
              <i className="fas fa-video"></i>
              <span>Live Session Review</span>
            </div>
            <div className="service-feature">
              <i className="fas fa-brain"></i>
              <span>Personalized Feedback</span>
            </div>
            <div className="service-feature">
              <i className="fas fa-calendar-alt"></i>
              <span>Flexible Scheduling</span>
            </div>
          </div>
        </div>

        <div className="service-card-footer">
          <div className="service-price">
            <span className="price-label">Status</span>
            <span className="price-amount">Coming soon</span>
          </div>
          <span className="service-order-btn" aria-disabled="true">
            <i className="fas fa-hourglass-half"></i>
            Coming soon
          </span>
        </div>
      </div>
    </div>
  );
}

export default Services;
