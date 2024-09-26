import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Creator() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get('http://localhost:4000/routes/getalladmin');
                setAdmins(response.data.adminusers);
            } catch (error) {
                console.error("Error fetching admin data: ", error);
            }
        };
        
        fetchAdmins();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-4">Creator</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {admins.length > 0 ? (
                    admins.map((admin) => (
                        <Link to={`/element/${admin._id}`} key={admin._id}>
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    <img
                                        src={admin.photo.url}  // Replace with the correct image field
                                        alt={admin.name}
                                        className="w-40 h-40 object-cover rounded-full border-4 border-gray-300"
                                    />
                                </div>
                                <div className="mt-2 text-center">
                                    <p className="text-black text-xl font-bold">
                                        {admin.name}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="flex h-screen items-center justify-center">
                        No elements found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Creator;
