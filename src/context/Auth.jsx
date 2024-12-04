import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext({
  register: () => {},
  userInfo: "",
  login: () => {},
  logout: () => {},
});

const baseUrl = "https://42186.fullstack.clarusway.com";

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  if(!userInfo) checkAuth();

  useEffect(()=>{
    checkAuth()
  }, [userInfo])
  

  function checkAuth(){
    if(userInfo){
        // add user information to localstorage 
        localStorage.setItem('user', JSON.stringify(userInfo))
    }else{
        // retrive it from localstorage
        const user = localStorage.getItem('user') 
        if(user) setUserInfo(JSON.parse(user))

    }
  }

  const register = async (userData, navigate) => {
    // send a Post request to server
    try {
      const { data } = await axios.post(`${baseUrl}/users/register/`, userData);
      // update the userInfo state
      setUserInfo(data);
      // display a success message
      toast.success("User registered successfully!");
      // navigate the user to home page
      navigate("/");
    } catch (error) {
      // incase error - show error message and console log the error
      console.log(Object.values(error.response.data)[0][0]);
      toast.error(Object.values(error.response.data)[0][0]);
    }
  };
  const login = async (userData, navigate) => {
    try {
        const { data } = await axios.post(`${baseUrl}/users/auth/login/`, userData);
        // update the userInfo state
        setUserInfo({key: data.key, ...data.user});
        // display a success message
        toast.success("User logged in successfully!");
        // navigate the user to home page
        navigate("/");
      } catch (error) {
        // incase error - show error message and console log the error
        console.log(error);
        toast.error(error.message);
      }
  };
  const logout = async (navigate) => {
    let token = JSON.parse(localStorage.getItem('user')).key;
    try{
      axios.post(`${baseUrl}/users/auth/logout/`, {
        headers:{Authorization:`Token ${token}`}
      })
      toast.success('Logged out successfully ')
      localStorage.removeItem('user')
      navigate('/auth/login')
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  };
  return (
    <AuthContext.Provider value={{ register, login, logout, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
