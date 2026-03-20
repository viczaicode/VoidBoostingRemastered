import axios from "axios";
import { createContext, useState, useEffect } from "react";

// Context
export const ServiceContext = createContext();

// Provider
export function ServiceProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [servicesLista, setServicesLista] = useState([]);

  useEffect(() => {
    getServices();
  }, []);

  function getServices() {
    axios
      .get("http://127.0.0.1:8000/api/services")
      .then((response) => {
        setServicesLista(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <ServiceContext.Provider
      value={{
        servicesLista,
        loading,
        getServices,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}
