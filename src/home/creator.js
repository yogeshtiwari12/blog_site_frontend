import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Creator() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get('https://blog-site-backend-3b1g.onrender.com/routes/getalladmin');
                setAdmins(response.data.adminusers);
            } catch (error) {
                console.error("Error fetching admin data: ", error);
            }
        };

        fetchAdmins();
    }, []);

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">Creator</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {admins.length > 0 ? (
                    admins.map((admin) => (
                        <Link 
                            to={`/element/${admin._id}`} 
                            key={admin._id}
                            className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-xl p-6 bg-white"
                        >
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    <img
                                        src={admin.photo.url}
                                        alt={admin.name}
                                        className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="text-gray-800 text-xl font-semibold tracking-tight hover:text-blue-600 transition-colors duration-300">
                                        {admin.name}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="flex h-[500px] items-center justify-center col-span-full">
                        <p className="text-gray-500 text-xl font-medium">No elements found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Creator;
