import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");

  //bejelentkezett felhasználó adatainak lekérdezése
  const getUser = async () => {
    try {
      const { data } = await myAxios.get("/api/user");
      setUser(data);
      return data;
    } catch (error) {
      setUser(null);
      return null;
    }
  };

  const logout = async () => {
    await csrf();

    myAxios.post("/logout").then(() => {
      setUser(null);
    });
  };

  const loginReg = async ({ ...adat }, vegpont) => {
    //lekérjük a csrf tokent
    await csrf();
    setErrors({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

    try {
      await myAxios.post(vegpont, adat);
      await getUser();
    } catch (error) {
      if (error?.response?.status === 422) {
        setErrors(error.response.data.errors);
      }

      throw error;
    }
  };

  useEffect(() => {
    getUser().finally(() => setAuthLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ logout, loginReg, errors, getUser, user, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
export default function useAuthContext() {
  return useContext(AuthContext);
}