import React from "react";
import { useAuth } from "../context/authcontext.js";
import { Link } from "react-router-dom";

function Hero() {
  const { blogs } = useAuth();

  // Function to format date
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 4).map((element) => (
            <Link
              to={`/singleblog/${element._id}`}
              key={element._id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={element.blogimage.url}
                  alt=""
                  className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                {/* Category Badge - Top Left */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                    {element.category || 'Technology'}
                  </span>
                </div>

                {/* Read Time Badge - Top Right */}
            
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h1 className="text-white text-xl font-bold leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors duration-300 mb-4">
                    {element.title}
                  </h1>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={element.adminphoto}
                          alt=""
                          className="w-10 h-10 rounded-full border-2 border-blue-400 transform group-hover:scale-110 transition-transform duration-300"
                        />
                        {/* <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-gradient-to-tr from-blue-500 to-blue-400 rounded-full border-2 border-white"></div> */}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors duration-300">
                          {element.adminname}
                        </p>
                        {/* Date with icon */}
                        <div className="flex items-center text-gray-300 text-xs">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(new Date())}
                        </div>
                      </div>
                    </div>
                    
                    {/* View Count */}
                    <div className="flex items-center text-gray-300 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      1.2k
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex h-96 items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-300 rounded-full animate-pulse"></div>
              </div>
              <p className="text-lg font-medium text-gray-600">Loading blogs...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;