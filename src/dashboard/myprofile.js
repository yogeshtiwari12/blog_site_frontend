import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEnvelope, FaPhone, FaGraduationCap } from 'react-icons/fa';
import { comon_url } from '../pages/commonroutes.js';

function Myprofile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${comon_url}/routes/getmyprofile`, {
                    withCredentials: true,
                });
                setProfile(response.data.userprofile);
            } catch (error) {
                console.error('Error fetching profile:', error.response ? error.response.data : error.message);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 bg-indigo-200 rounded-full mb-4"></div>
                    <div className="text-lg text-indigo-400 font-semibold">Loading profile...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50 flex items-center justify-center p-6">
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 opacity-90"></div>
                
                {/* Profile content */}
                <div className="relative">
                    {/* Profile photo */}
                    <div className="flex items-center justify-center">
                        <div className="relative">
                            <div className="w-32 h-32 absolute -top-1 -left-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 animate-spin-slow"></div>
                            <img
                                src={profile.photo.url}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-white relative z-10 shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Name and details */}
                    <div className="mt-6 text-center">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                            {profile.name}
                        </h1>
                        <p className="text-gray-600 mt-2 font-medium">{profile.role}</p>
                    </div>

                    {/* Profile information */}
                    <div className="mt-8 space-y-6">
                        <div className="transform hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-sm">
                                <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 rounded-full">
                                    <FaEnvelope className="text-indigo-600 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-gray-700 font-medium">{profile.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="transform hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-teal-50 rounded-xl shadow-sm">
                                <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-full">
                                    <FaPhone className="text-purple-600 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="text-gray-700 font-medium">{profile.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="transform hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-teal-50 to-indigo-50 rounded-xl shadow-sm">
                                <div className="w-10 h-10 flex items-center justify-center bg-teal-100 rounded-full">
                                    <FaGraduationCap className="text-teal-600 w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Education</p>
                                    <p className="text-gray-700 font-medium">{profile.education}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            
            </div>
        </div>
    );
}

export default Myprofile;
