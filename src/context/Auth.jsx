import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_URL;

const AuthContext = createContext({
  register: () => {},
  login: () => {},
  logout: () => {},
  userInfo: "",
});

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  if (!userInfo) checkAuth();

  useEffect(() => {
    checkAuth();
  }, [userInfo]);

  function checkAuth() {
    if (userInfo) {
      //? Add user information to localstorage
      localStorage.setItem("user", JSON.stringify(userInfo));
    } else {
      const user = localStorage.getItem("user");
      if (user) setUserInfo(JSON.parse(user));
    }
  }

  const register = async (userData, navigate) => {
    try {
      //? Send Post request to server
      const { data } = await axios.post(`${baseUrl}/users/register/`, userData);
      console.log(data);
      //? Update userInfo state
      setUserInfo(data);
      //? Display Success toast
      toast.success("User Registered Successfully!");
      //? Navigate the user to homepage
      navigate("/");
    } catch (error) {
      console.log(Object.values(error.response.data)[0][0]);
      toast.error(Object.values(error.response.data)[0][0]);
    }
  };
  const login = async (userData, navigate) => {
    try {
      //? Send Post request to server
      const { data } = await axios.post(
        `${baseUrl}/users/auth/login/`,
        userData
      );
      console.log(data);
      //? Update userInfo state
      setUserInfo({ key: data.key, ...data.user });
      //? Display Success toast
      toast.success("User Logged In Successfully!");
      //? Navigate the user to homepage
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const logout = async (navigate) => {
    let token = JSON.parse(localStorage.getItem("user")).key;
    try {
       axios.post(`${baseUrl}/users/auth/logout/`, {
        headers: { Authorization: `Token ${token}` },
      });
      toast.success("Logged out successfully!");
      localStorage.removeItem("user");
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ register, login, logout, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
