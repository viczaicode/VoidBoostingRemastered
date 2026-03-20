import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("authUser");
      }
    }

    setLoading(false);
  }, []);

  async function login(email, password) {
    const response = await axios.post("http://127.0.0.1:8000/api/login", {
      email,
      password,
    });

    const { token: apiToken, user: apiUser } = response.data;

    setToken(apiToken);
    setUser(apiUser);

    setLoading(false);

    localStorage.setItem("authToken", apiToken);
    localStorage.setItem("authUser", JSON.stringify(apiUser));

    axios.defaults.headers.common["Authorization"] = `Bearer ${apiToken}`;
  }

  async function logout() {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout");
    } catch {
      // ignore network / server errors on logout
    }

    setToken(null);
    setUser(null);

    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");

    delete axios.defaults.headers.common["Authorization"];
  }

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

