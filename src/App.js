import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './components/home';
import Contact from './pages/contact';
import About from './pages/about';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import Creators from './pages/creators';
import { Toaster } from 'react-hot-toast';
import Myprofile from './dashboard/myprofile';
import Createblogs from './dashboard/createblogs';
import Logout from './pages/logout';
import UpdateBlog from './pages/update';
import Blogs from './home/blogs';
import Singleblog from './home/singleblog';
import Errorpage from './home/errorpage';
import Profiles from './pages/profiles';
import { useAuth } from './context/authcontext'; // Assuming `useAuth` is defined in your project

function Layout() {
  const location = useLocation();
  const { profile } = useAuth(); // Retrieve the authentication status and profile
  const isAuthenticated = !!profile; // Check if the profile exists (user is authenticated)
  const hideNavbarFooter = ["/dashboard", "/login", "/register", "*"].includes(location.pathname);

  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {isAuthenticated ? (
          <>
            <Route path="/myprofile" element={<Myprofile />} />
            <Route path="/dashboard/createblogs" element={<Createblogs />} />
            <Route path="/creators" element={<Creators />} />
            <Route path="/contactus" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/updateblog/:id" element={<UpdateBlog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/singleblog/:id" element={<Singleblog />} />
            <Route path="/dashboard/profiles" element={<Profiles />} />
            <Route path="*" element={<Errorpage />} />
          </>
        ) : (
          <>
            <Route path="/myprofile" element={<Navigate to="/login" />} />
            <Route path="/createblogs" element={<Navigate to="/login" />} />
            <Route path="/creators" element={<Navigate to="/login" />} />
            <Route path="/contactus" element={<Navigate to="/login" />} />
            <Route path="/dashboard" element={<Navigate to="/login" />} />
            <Route path="/updateblog/:id" element={<Navigate to="/login" />} />
            <Route path="/blogs" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
