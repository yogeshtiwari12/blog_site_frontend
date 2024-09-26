import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setUser] = useState([]);

  useEffect(() => {
    const fetchmyprofile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/routes/getmyprofile',{
          withCredentials: true,  
        }
      
      );
        setUser(response.data);
        console.log("user profilres: " + response.data)
      } catch (error) {
        console.error("Error fetching blogs", error.message);
      }
    };

    fetchmyprofile()
  }, []); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/blogroute/getallblogs');
        setBlogs(response.data); 
      } catch (error) {
        console.error("Error fetching blogs", error.message);
      }
    };

    fetchData();
  }, []); 

  return (
    <AuthContext.Provider value={{blogs,profile}}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
