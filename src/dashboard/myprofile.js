import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEnvelope, FaPhone, FaGraduationCap, FaUser } from 'react-icons/fa';
import { AiFillLock } from 'react-icons/ai';

function Myprofile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:4000/routes/getmyprofile', {
                    withCredentials: true,
                });
                setProfile(response.data.userprofile);
            } catch (error) {
                console.error('Error fetching profile:', error.response ? error.response.data : error.message);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex items-center justify-center mb-6">
                    <img
                        src={profile.photo.url}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                    />
                </div>
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">{profile.name}</h1>
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <FaEnvelope className="text-blue-500" />
                        <span className="text-gray-700">{profile.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaPhone className="text-blue-500" />
                        <span className="text-gray-700">{profile.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaGraduationCap className="text-blue-500" />
                        <span className="text-gray-700">{profile.education}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaUser className="text-blue-500" />
                        <span className="text-gray-700">{profile.role}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Myprofile;
