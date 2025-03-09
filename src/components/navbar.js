import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../context/authcontext';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { comon_url } from '../pages/commonroutes.js';


function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { profile } = useAuth();  

  const navigate = useNavigate()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout = async () => {
    try {
      const response = await axios.post(`${comon_url}/routes/logout`, {}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });


      if (response.status) {
        swal({
          title: "Logout Successful",
          text: "Are you sure that you want to leave this page?",
          icon: "warning",
          dangerMode: true,
        })
      }
      setTimeout(() => {
        window.location.reload()
        navigate('/')

      }, 2000);
    } catch (error) {
      toast.error('Logout failed, please try again.');

    }
  };

  return (
    <div className="relative w-full shadow-lg ">
      <div className="  mx-auto  flex max-w-8xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 z-50 bg-blue-100">

        <div className="text-md font-bold text-gray-900 text-2xl">
          <h3>Focus<span className="text-2xl text-blue-500">Craft</span></h3>
        </div>

        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            <li>
              <Link to="/" className="text-sm font-semibold text-gray-500 hover:text-blue-400 duration-260">
                Home
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="text-sm font-semibold text-gray-500 hover:text-blue-400 duration-260">
                Blogs
              </Link>
            </li>
           
            <li>
              <Link to="/about" className="text-sm font-semibold text-gray-500 hover:text-blue-400 duration-260">
                About
              </Link>
            </li>
            <li>
              <Link to="/contactus" className="text-sm font-semibold text-gray-500 hover:text-blue-400 duration-260">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex space-x-4">
          {profile?.role === 'admin' && (
            <Link
              to="/dashboard"
              className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400"
            >
              Dashboard
            </Link>
          )}
          {profile ? (
            <button
              onClick={logout}
              className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400"
            >
              Login
            </Link>
          )}
        </div>

        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 cursor-pointer"
            >
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white px-4 pt-2 pb-4">
          <ul className="space-y-2">
            <li>
              <Link to="/" className="block text-gray-500 hover:text-blue-400 text-center py-2">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="block text-gray-500 hover:text-blue-400 text-center py-2">
                Blogs
              </Link>
            </li>
          
            <li>
              <Link to="/" className="block text-gray-500 hover:text-blue-400 text-center py-2">
                About
              </Link>
            </li>
            <li>
              <Link to="/contactus" className="block text-gray-500 hover:text-blue-400 text-center py-2">
                Contact
              </Link>
            </li>
            <div className="flex justify-between">
            {profile?.role === 'admin' && (
              <li>
                <Link
                  to="/dashboard"
                  className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              {profile ? (
                <button
                  onClick={logout}
                  className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400"
                >
                  Login
                </Link>
              )}

            </li>
              </div>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
