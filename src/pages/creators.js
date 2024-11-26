import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


function Creators() {
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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Meet Our Creators</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {admins.length > 0 ? (
                    admins.map((admin) => (
                        <div key={admin._id} className="bg-white shadow-lg rounded-lg p-6 text-center">
                            <div className="relative">
                                <img
                                    src={admin.photo.url} // Replace with the correct image field
                                    alt={admin.name}
                                    className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-gray-300"
                                />
                            </div>
                            <div className="mt-4">
                                <h2 className="text-xl font-bold text-gray-700">{admin.name}</h2>
                                <p className="text-gray-500">{admin.email}</p>
                                <span className="inline-block mt-2 px-4 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                                    Admin
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">No creators found.</div>
                )}
            </div>
        </div>
    );
}

export default Creators;
