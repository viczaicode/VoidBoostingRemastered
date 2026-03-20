import { useContext } from "react";
import { Link } from "react-router-dom";
import { ServiceContext } from "../contexts/ServiceContext";

function Services() {
  const { servicesLista, loading } = useContext(ServiceContext);

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

      {/* Existing Services */}
      {servicesLista.map((item) => (
        <div key={item.id} className="service-card">
          <div className="service-card-header">
            <div className="service-icon">
              <img src={item.photo} alt={item.title} />
            </div>
            <h3>{item.title}</h3>
          </div>
          
          <div className="service-card-body">
            <p>{item.description}</p>
            
            <div className="service-features">
              <div className="service-feature">
                <i className="fas fa-check-circle"></i>
                <span>Fast Completion</span>
              </div>
              <div className="service-feature">
                <i className="fas fa-shield-alt"></i>
                <span>100% Secure</span>
              </div>
              <div className="service-feature">
                <i className="fas fa-headset"></i>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
          
          <div className="service-card-footer">
            <div className="service-price">
              <span className="price-label">Starting from</span>
              <span className="price-amount">${Math.floor(Math.random() * 50 + 20)}</span>
            </div>
            <a href="#" className="service-order-btn">
              <i className="fas fa-shopping-cart"></i>
              Order Now
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Services;
