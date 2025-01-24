import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { comon_url } from "../pages/commonroutes.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(null); // Blog state
  const [profile, setProfile] = useState(null); // User profile state
  const [loading, setLoading] = useState(true); // Loading state for authentication
  const [ispprofile, setIspprofile] = useState(false); // Boolean for profile availability
  // console.log(ispprofile)

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
        // console.error("Error fetching profile:", error.message);
        setProfile(null); 
        setIspprofile(false);
      } finally {
        setLoading(false); // Set loading to false once finished
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
        setBlogs(response.data || null); // Fallback to null if no blogs
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
        setBlogs(null); // Explicitly set null on error
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
