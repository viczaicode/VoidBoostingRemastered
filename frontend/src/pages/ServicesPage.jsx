import Services from "../components/Services";
import { ServiceProvider } from "../contexts/ServiceContext";

function ServicesPage() {
  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <div className="services-hero-content">
            <h1>Our Services</h1>
            <p>Professional boosting services tailored to your needs</p>
            <div className="services-hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">98%</div>
                <div className="hero-stat-label">Success Rate</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">24h</div>
                <div className="hero-stat-label">Avg. Completion</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">50+</div>
                <div className="hero-stat-label">Expert Boosters</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="services-list-section">
        <div className="container">
          <div className="section-header">
            <h2>Choose Your Service</h2>
            <p>Select from our comprehensive range of boosting options</p>
          </div>
          
          <ServiceProvider>
            <Services />
          </ServiceProvider>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Simple 3-step process to get your desired rank</p>
          </div>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Choose Service</h3>
                <p>Select the boosting service that fits your needs</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Provide Details</h3>
                <p>Share your account information and requirements</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Watch Progress</h3>
                <p>Sit back and track your rank improvement</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;

