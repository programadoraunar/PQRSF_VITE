import { createContext, useContext, useState } from "react";
import getUserInfo from "../supabase/actions/getUserInfo";
import getUserSesion from "../supabase/actions/getUserSesion";
import { supabase } from "../supabase/client";

export const AuthContext = createContext();
// Hook personalizado que utiliza el contexto de autenticación.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Define estados para el usuario, estado de autenticación y errores.
  const [user, setUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  // Función asincrónica para el inicio de sesión de usuarios.
  const signin = async (email, password) => {
    try {
      //sola para iniciar sesion la informacion por el momento no la usaremos

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        throw new Error(error.message); // Lanzar un error si hay un error de autenticación
      }
      //obtenesmo la informacion de si es un admin
      const userInfo = await getUserInfo();
      setUser(userInfo);
      console.log(userInfo)
      setIsAdmin(userInfo.id_rol);
      setisAuthenticated(true);
    } catch (error) {
      console.error("Error de inicio de sesión:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ signin, user, isAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
