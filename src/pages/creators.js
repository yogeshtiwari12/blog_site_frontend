import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, GitHub, Twitter, User, Award } from 'react-feather'; 
import { FaLinkedin } from 'react-icons/fa'; // Correct LinkedIn import
import { comon_url } from './commonroutes.js';
import { toast } from 'react-hot-toast';

function Creators() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${comon_url}/routes/getalladmin`, {
                    withCredentials: true,
                });
                setAdmins(response.data.adminusers);
            } catch (error) {
                console.error("Error fetching admin data: ", error);
                toast.error("Failed to load creators");
            } finally {
                setLoading(false);
            }
        };
        
        fetchAdmins();
    }, []);

    const filteredAdmins = admins.filter(admin => {
        const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            admin.email.toLowerCase().includes(searchTerm.toLowerCase());
        if (filter === 'all') return matchesSearch;
        return matchesSearch && admin.role === filter;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="text-center">
                    <motion.div
                        animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
                    />
                    <p className="mt-4 text-gray-600">Loading creators...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="container mx-auto"
            >
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                        <Award className="w-8 h-8 mr-3 text-blue-500" />
                        Meet Our Creative Team
                    </h1>
                    <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full mb-8" />

                    {/* Search and Filter Section */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <input
                                type="text"
                                placeholder="Search creators..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                            />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Roles</option>
                                <option value="admin">Admins</option>
                                <option value="moderator">Moderators</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    {filteredAdmins.length > 0 ? (
                        filteredAdmins.map((admin) => (
                            <motion.div
                                key={admin._id}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
                            >
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <img
                                        src={admin.photo.url}
                                        alt={admin.name}
                                        className="w-full h-64 object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x400?text=Profile+Image';
                                        }}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex justify-center space-x-4">
                                            {admin.socialLinks?.github && (
                                                <motion.a 
                                                    whileHover={{ scale: 1.2 }}
                                                    href={admin.socialLinks.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white hover:text-blue-400"
                                                >
                                                    <GitHub className="w-5 h-5" />
                                                </motion.a>
                                            )}
                                            {admin.socialLinks?.linkedin && (
                                                <motion.a 
                                                    whileHover={{ scale: 1.2 }}
                                                    href={admin.socialLinks.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white hover:text-blue-400"
                                                >
                                                    <FaLinkedin className="w-5 h-5" />
                                                </motion.a>
                                            )}
                                            {admin.socialLinks?.twitter && (
                                                <motion.a 
                                                    whileHover={{ scale: 1.2 }}
                                                    href={admin.socialLinks.twitter}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white hover:text-blue-400"
                                                >
                                                    <Twitter className="w-5 h-5" />
                                                </motion.a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">{admin.name}</h2>
                                    <div className="flex items-center justify-center mb-3 text-gray-600">
                                        <Mail className="w-4 h-4 mr-2" />
                                        <p className="text-sm">{admin.email}</p>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className="px-4 py-1.5 text-sm font-semibold text-white bg-blue-500 rounded-full flex items-center">
                                            <User className="w-4 h-4 mr-1" />
                                            {admin.role || 'Admin'}
                                        </span>
                                    </div>
                                    {admin.bio && (
                                        <p className="mt-4 text-gray-600 text-sm text-center line-clamp-2">
                                            {admin.bio}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full text-center py-12"
                        >
                            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-xl text-gray-500">No creators found matching your search.</p>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Creators;