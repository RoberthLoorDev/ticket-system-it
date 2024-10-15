interface LocalUserInterface {
     email: string;
     rol: string;
     id: number | null;
}

interface AuthContextInterface {
     user: LocalUserInterface | null;
     handleLogin: (email: string, password: string) => Promise<any>;
     handleLogout: () => void;
     loading: boolean;
     getToken: () => string | null;
     checkTokenExpiration: () => boolean;
}

import { createContext, useContext, useEffect, useCallback, useState, ReactNode } from "react";
import CryptoJS from "crypto-js";
import { logIn as apiLogin } from "../services/api";

const AuthContext = createContext<AuthContextInterface | null>(null);

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
     const [user, setUser] = useState<LocalUserInterface | null>(null);
     const [loading, setLoading] = useState(true);

     const encryptToken = (token: string) => {
          return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
     };

     const descrypyToken = (encryptedToken: string) => {
          const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
          return bytes.toString(CryptoJS.enc.Utf8); //convert encrypted bytes in a string
     };

     //save token in session storage
     const setToken = useCallback((token: string) => {
          const encryptedToken = encryptToken(token);
          sessionStorage.setItem("encryptedToken", encryptedToken);
     }, []);

     const getToken = useCallback(() => {
          const encryptedToken = sessionStorage.getItem("encryptedToken");
          return encryptedToken ? descrypyToken(encryptedToken) : null;
     }, []);

     //delete token from session storage
     const removeToken = useCallback(() => {
          sessionStorage.removeItem("encryptedToken");
     }, []);

     //login
     const handleLogin = useCallback(
          async (email: string, password: string) => {
               try {
                    const sessionData = await apiLogin(email, password);
                    const { token } = sessionData;
                    const { data } = sessionData.data;
                    if (!token) return;
                    setToken(token); //save token

                    const decodedToken = JSON.parse(atob(token?.split(".")[1]));

                    setUser({
                         email: decodedToken.email,
                         rol: decodedToken.rol,
                         id: decodedToken.id,
                    });
                    return data;
               } catch (error) {
                    console.error("Error during login", error);
                    throw error;
               }
          },
          [setToken]
     );

     //close session
     const handleLogout = useCallback(() => {
          removeToken();
          setUser(null);
     }, [removeToken]);

     //verify token expired
     const checkTokenExpiration = useCallback(() => {
          const token = getToken();

          if (token) {
               const decodedToken = JSON.parse(atob(token.split(".")[1]));

               if (Date.now() >= decodedToken.exp * 1000) {
                    handleLogout();
                    return false;
               }
               return true;
          }
          return false;
     }, [getToken, handleLogout]);

     //hook inicialize autentication status
     useEffect(() => {
          const initAuth = () => {
               if (checkTokenExpiration()) {
                    const token = getToken();
                    if (!token) return;
                    const decodedToken = JSON.parse(atob(token.split(".")[1]));
                    setUser({
                         email: decodedToken.email,
                         rol: decodedToken.rol,
                         id: decodedToken.id,
                    });
               }
               setLoading(false);
          };

          initAuth();
     }, [getToken, checkTokenExpiration]);

     //hook interceptor
     useEffect(() => {
          const originalFetch = window.fetch;
          window.fetch = async (...args) => {
               try {
                    const response = await originalFetch(...args);

                    if (!response.ok) {
                         if (response.status === 401) {
                              handleLogout();
                         }
                         throw new Error(`HTTP error! status:  ${response.status}`);
                    }
                    return response;
               } catch (error) {
                    console.error("Fetch error:", error);
                    throw error;
               }
          };
          return () => {
               window.fetch = originalFetch;
          };
     }, [handleLogout]);

     //context provider

     return (
          <AuthContext.Provider value={{ user, handleLogin, handleLogout, loading, getToken, checkTokenExpiration }}>
               {children}
          </AuthContext.Provider>
     );
};

//hook that consume auth context in other components
export const useAuth = () => {
     const context = useContext(AuthContext);
     if (!context) {
          throw new Error("useAuth must be used within an AuthProvider");
     }
     return context;
};
