import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

function Sidebar() {
    const { profile } = useAuth();

    const logout = async () => {
        try {
            const response = await axios.post('http://localhost:4000/routes/logout', {}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            toast.success(response.data.message || 'Logged out successfully!');
            Cookies.remove('token');
            window.location.reload();
        } catch (error) {
            toast.error('Logout failed, please try again.');
        }
    };

    const userProfile = profile?.userprofile || {};
    const profilePhotoUrl = userProfile.photo?.url || 'https://via.placeholder.com/100';

    return (
        <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 flex flex-col items-center py-10">
            <div className="mb-8">
                <img
                    src={profilePhotoUrl}
                    alt="Profile"
                    className="w-24 h-24 rounded-full"
                />
            </div>

            <nav className="flex flex-col space-y-4 w-full ml-12">
                {/* <Link to="/myblogs">
                    <button className="py-2 px-4 bg-gray-700 hover:bg-gray-600 w-3/4 mx-auto rounded-full transition-colors duration-300 text-center">My Blogs</button>
                </Link> */}
                <Link to="/createblogs">
                    <button className="py-2 px-4 bg-gray-700 hover:bg-gray-600 w-3/4 mx-auto rounded-full transition-colors duration-300 text-center">Create Blog</button>
                </Link>
                <Link to="/myprofile">
                    <button className="py-2 px-4 bg-gray-700 hover:bg-gray-600 w-3/4 mx-auto rounded-full transition-colors duration-300 text-center">My Profile</button>
                </Link>
                <Link to="/">
                    <button className="py-2 px-4 bg-gray-700 hover:bg-gray-600 w-3/4 mx-auto rounded-full transition-colors duration-300 text-center">Home</button>
                </Link>
                <Link to="/logout">
                    <button onClick={logout} className="py-2 px-4 bg-red-600 hover:bg-red-500 w-3/4 mx-auto rounded-full transition-colors duration-300 text-center">Logout</button>
                </Link>
            </nav>
        </div>
    );
}

export default Sidebar;
