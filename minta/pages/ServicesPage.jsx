import Services from "../components/Services";
import { ServiceProvider } from "../contexts/ServiceContext";

function ServicesPage() {
  return (
    <div className="container">
      <h2 style={{ color: "#e4e2ee", marginTop: 0 }}>Services</h2>
      <ServiceProvider>
        <Services />
      </ServiceProvider>
    </div>
  );
}

export default ServicesPage;

