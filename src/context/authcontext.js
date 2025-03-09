import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { comon_url } from "../pages/commonroutes.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(null); 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ispprofile, setIspprofile] = useState(false); 

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const response = await axios.get(`${comon_url}/routes/getmyprofile`, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.userprofile) {
          setProfile(response.data.userprofile);
          setIspprofile(true);
        }
      } catch (error) {
   
        setProfile(null); 
        setIspprofile(false);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProfile();
    
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${comon_url}/blogroute/getallblogs`,
          { withCredentials: true }
        );
        setBlogs(response.data || null);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
        setBlogs(null);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ blogs, profile, loading, ispprofile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
