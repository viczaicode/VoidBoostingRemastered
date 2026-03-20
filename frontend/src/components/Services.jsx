import { useContext } from "react";
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
