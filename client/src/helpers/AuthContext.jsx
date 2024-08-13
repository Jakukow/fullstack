import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  username: "",
  id: 0,
  status: false,
};

const AuthContext = createContext(initialState);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    ...initialState,
  });

  const checkAuth = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      if (data.error) {
        setAuthState({ ...authState, status: false });
        navigate("/login");
      } else {
        setAuthState({
          username: data.username,
          id: data.id,
          status: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    authState: authState,
    setAuthState,
    checkAuth,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useShop must be used within ShopContext");
  }

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export default useAuth;
