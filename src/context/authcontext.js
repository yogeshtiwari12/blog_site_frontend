import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(null); // Default to null when no data
  const [profile, setProfile] = useState(null); // Default to null when no data

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const response = await axios.get(
          "https://blog-site-backend-3b1g.onrender.com/routes/getmyprofile",
          { withCredentials: true }
        );
        setProfile(response.data.userprofile); // Fallback to null if no userprofile
        console.log("User profile:", response.data.userprofile);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        setProfile(null); // Explicitly set null on error
      }
    };

    fetchMyProfile();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://blog-site-backend-3b1g.onrender.com/blogroute/getallblogs"
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
    <AuthContext.Provider value={{ blogs, profile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
