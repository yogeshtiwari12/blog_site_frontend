import React from 'react';
import { useAuth } from '../context/authcontext.js';
import { Link } from 'react-router-dom';

function Blogs() {
    const { blogs } = useAuth();
    console.log("blogs avd ", blogs);

  
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-extrabold text-center text-blue-500  mb-8">Blogs</h1>
            {blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {blogs.map((element) => (
                        <div
                            key={element._id}
                            className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <Link to={`/singleblog/${element._id}`} 
                            className="group block">
                                <div className="relative">
                                    <img
                                        src={element.blogimage.url}
                                        alt={element.title}
                                        className="w-full h-64 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-4 left-4 bg-gradient-to-t from-black to-transparent p-3 rounded-lg">
                                        <h1 className="text-white text-xl font-semibold group-hover:text-yellow-300 transition-colors duration-300">
                                            {element.title}
                                        </h1>
                                        <p className="text-white text-sm mt-1 group-hover:text-yellow-200 transition-colors duration-300">
                                            {element.category}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex h-screen items-center justify-center text-gray-500 text-lg">
                    Loading....
                </div>
            )}
        </div>
    );
}

export default Blogs;
