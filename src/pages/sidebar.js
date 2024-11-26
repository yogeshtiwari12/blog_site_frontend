import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import { Home, Edit, User, LogOut, LayoutDashboard} from 'lucide-react';

function Sidebar() {
    const { profile } = useAuth();

    const logout = async () => {
        try {
            const response = await axios.post('http://localhost:4000/routes/logout', {}, {
                withCredentials: true,
            });

            toast.success(response.data.message || 'Logged out successfully!');
            Cookies.remove('token');
            window.location.reload();
        } catch (error) {
            toast.error('Logout failed, please try again.');
        }
    };

    // const userProfile = profile?.userprofile || {};
    const profilePhotoUrl = profile.photo?.url || 'https://via.placeholder.com/100';

    return (
        <div className="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white fixed top-0 left-0 flex flex-col items-center py-8 shadow-2xl">
            <div className="relative group mb-6">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-400 group-hover:border-blue-300 transition-all duration-300 shadow-lg mx-auto">
                    <img
                        src={profilePhotoUrl}
                        alt="Admin"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500"
                    />
                </div>
                <div className="mt-4 text-center">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                        {profile?.name}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        {profile?.email}
                    </p>
                </div>
            </div>

            <div className="w-full px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-6" />
            </div>

            <nav className="flex flex-col space-y-3 w-full px-6">
            <Link to="/dashboard/profiles" className="w-full">
                    <button className="flex items-center  w-full px-4 py-3 rounded-lg bg-gray-700/50 hover:bg-blue-600/50 transition-all duration-300 group">
                        <LayoutDashboard className="w-5 h-5 mr-3 text-blue-400 group-hover:text-white" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">Dashboard</span>
                    </button>
                </Link>
                <Link to="/dashboard/createblogs" className="w-full">
                    <button className="flex  items-center w-full px-4 py-3 rounded-lg bg-gray-700/50 hover:bg-blue-600/50 transition-all duration-300 group">
                        <Edit className="w-5 h-5 mr-3 text-blue-400 group-hover:text-white" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">Create Blog</span>
                    </button>
                </Link>

                <Link to="/myprofile" className="w-full">
                    <button className="flex items-center w-full px-4 py-3 rounded-lg bg-gray-700/50 hover:bg-blue-600/50 transition-all duration-300 group">
                        <User className="w-5 h-5 mr-3 text-blue-400 group-hover:text-white" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">My Profile</span>
                    </button>
                </Link>

                <Link to="/" className="w-full">
                    <button className="flex items-center w-full px-4 py-3 rounded-lg bg-gray-700/50 hover:bg-blue-600/50 transition-all duration-300 group">
                        <Home className="w-5 h-5 mr-3 text-blue-400 group-hover:text-white" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">Home</span>
                    </button>
                </Link>
              
                <div className="w-full pt-4">
                    <button 
                        onClick={logout} 
                        className="flex items-center w-full px-4 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 hover:text-white transition-all duration-300 group"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        <span className="group-hover:translate-x-1 transition-transform duration-300">Logout</span>
                    </button>
                </div>
            </nav>

            <div className="mt-auto px-6 py-4">
                <div className="text-xs text-gray-500 text-center">
                    © 2024 Your Blog Platform
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
