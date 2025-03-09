import React, { useState } from "react";
import { useAuth } from "../context/authcontext.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Heart, MessageCircle, Share2, Bookmark } from "react-feather";

function Trending() {
  const { blogs } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Check if blogs exist and have items
  const hasBlogs = blogs && blogs.length > 0;
  const visibleBlogs = hasBlogs ? blogs.slice(0, 8) : [];

  // Pagination functions
  const nextSlide = () => {
    if (hasBlogs) {
      setCurrentIndex((prevIndex) => 
        prevIndex === Math.floor((visibleBlogs.length - 1) / 4) * 4 ? 0 : prevIndex + 4
      );
    }
  };

  const prevSlide = () => {
    if (hasBlogs) {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? Math.floor((visibleBlogs.length - 1) / 4) * 4 : prevIndex - 4
      );
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.5 }
    }
  };

  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({ 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        damping: 12,
        stiffness: 100,
        delay: i * 0.08
      }
    }),
    hover: { 
      y: -8,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15 
      }
    }
  };

  // Custom skeleton loader component
  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="rounded-xl overflow-hidden bg-gray-100 h-96">
          <div className="h-1/2 bg-gray-200 animate-pulse"></div>
          <div className="p-4 space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="pt-4 flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <motion.div 
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center mb-10">
          <motion.div className="flex flex-col items-center" variants={headerVariants}>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Trending Stories
            </h2>
            <p className="mt-2 flex  text-base text-gray-500">
              Discover the most popular content from our community
            </p>
          </motion.div>
    
        </div>
        
        {hasBlogs ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleBlogs.slice(currentIndex, currentIndex + 4).map((blog, index) => (
              <motion.div
                key={blog._id}
                custom={index}
                variants={cardVariants}
                whileHover="hover"
                className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <Link to={`/singleblog/${blog._id}`} className="block">
                  <div className="relative overflow-hidden aspect-w-16 aspect-h-9">
                    <motion.img
                      src={blog.blogimage.url}
                      alt={blog.title}
                      className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/60"></div>
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                        {blog.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center space-x-1 text-white">
                      <Clock size={14} />
                      <span className="text-xs">5 min read</span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {blog.description || "Discover insights and perspectives on this trending topic..."}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={blog.adminphoto} 
                          alt={blog.adminname}
                          className="w-8 h-8 rounded-full object-cover border border-gray-200" 
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{blog.adminname}</p>
                          <p className="text-xs text-gray-500">Editor</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 text-gray-400">
                        <motion.button 
                          whileHover={{ scale: 1.1, color: "#ef4444" }}
                          whileTap={{ scale: 0.95 }}
                          className="focus:outline-none"
                        >
                          <Heart size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1, color: "#3b82f6" }}
                          whileTap={{ scale: 0.95 }}
                          className="focus:outline-none"
                        >
                          <Bookmark size={18} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <SkeletonLoader />
        )}
        
        {hasBlogs && (
          <div className="mt-10 flex justify-center">
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(visibleBlogs.length / 4) }).map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentIndex(i * 4)}
                  className={`w-3 h-3 rounded-full ${
                    Math.floor(currentIndex / 4) === i 
                      ? "bg-blue-600" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Trending;