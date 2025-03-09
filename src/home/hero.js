import React from "react";
import { useAuth } from "../context/authcontext.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Calendar, ArrowRight } from "react-feather";

function Hero() {
  const { blogs } = useAuth();

  // Function to format date
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const blogCardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (index) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: index * 0.08
      }
    }),
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.5 }
    }
  };

  const badgeVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.2, duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-16 max-w-7xl mt-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
          Latest Articles
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our most recent stories, insights, and perspectives
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogs && blogs.length > 0 ? (
          blogs.map((element, index) => (
            <motion.div
              key={element._id}
              custom={index}
              variants={blogCardVariants}
              whileHover="hover"
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full"
            >
              <Link to={`/singleblog/${element._id}`} className="block flex-grow">
                <div className="relative">
                  {/* Image on Top */}
                  <div className="relative h-72 overflow-hidden">
                    <motion.img
                      src={element.blogimage.url}
                      alt={element.title}
                      className="w-full h-full object-cover"
                      variants={imageVariants}
                      whileHover="hover"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                    
                    {/* Category Badge - Top Left */}
                    <motion.div 
                      className="absolute top-4 left-4"
                      variants={badgeVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                        {element.category || 'Technology'}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content Below */}
                  <div className="p-6">
                    <h1 className="text-xl font-bold leading-tight line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-4">
                      {element.title}
                    </h1>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <motion.div 
                          className="relative"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <img
                            src={element.adminphoto}
                            alt={element.adminname}
                            className="w-10 h-10 rounded-full border-2 border-blue-400"
                          />
                        </motion.div>
                        <div>
                          <p className="text-gray-800 font-medium text-sm group-hover:text-blue-600 transition-colors duration-300">
                            {element.adminname}
                          </p>
                          {/* Date with icon */}
                          <div className="flex items-center text-gray-500 text-xs">
                            <Calendar size={12} className="mr-1" />
                            {formatDate(new Date())}
                          </div>
                        </div>
                      </div>
                      
                      {/* View Count */}
                      <div className="flex items-center text-gray-500 text-sm">
                        <Eye size={14} className="mr-1" />
                        1.2k
                      </div>
                    </div>
                    
                    {/* Read More Link */}
                    <motion.div 
                      className="mt-5 flex items-center text-blue-600 text-sm font-medium"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <span>Read article</span>
                      <motion.div 
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <ArrowRight size={16} className="ml-1" />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <motion.div 
            className="col-span-full flex h-96 items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col items-center space-y-4">
              <motion.div 
                className="relative w-16 h-16"
                animate={{ rotate: 360 }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5, 
                  ease: "linear" 
                }}
              >
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                <motion.div 
                  className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-300 rounded-full opacity-50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    repeatType: "reverse"
                  }}
                ></motion.div>
              </motion.div>
              <motion.p 
                className="text-lg font-medium text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                Loading the latest blogs...
              </motion.p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Hero;