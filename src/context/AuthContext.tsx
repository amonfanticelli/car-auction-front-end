import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  IAuthContext,
  IProvider,
  IUser,
  ICreateUser,
} from "../interfaces/context";
import { api } from "../service/api";

export const AuthContext = createContext({} as IAuthContext);

export const Provider = ({ children }: IProvider) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleRegister = async (data: ICreateUser) => {
    await api
      .post("users", data)
      .then((response) => {
        toast.success("Conta criada com sucesso!");
        return navigate("/login");
      })
      .catch((err) => toast.error(`${err.response.data.message}`));
  };

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("@token");
      const userLogged = localStorage.getItem("@user");

      if (userLogged) {
        try {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          setUser(JSON.parse(userLogged));
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
