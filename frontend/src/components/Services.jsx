import { useContext } from "react";
import { ServiceContext } from "../contexts/ServiceContext";

function Services() {
  const { servicesLista, loading } = useContext(ServiceContext);

  if (loading) return <div className="loader-center">
  <div className="spinner"></div>
</div>;

  return (
    <div className="Service-lista">
      {servicesLista.map((item) => (
        <div key={item.id} className="Service">
          <h3>{item.title}</h3>
          
          <img src={item.photo} alt= {item.title} width="400" height="250"></img>

          <p>{item.description}</p>

          <a href="#">Order</a>

        </div>
      ))}
    </div>
  );
}


export default Services;
