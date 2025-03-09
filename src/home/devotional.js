import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authcontext.js';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Heart, Calendar, ArrowRight, Loader, Search, Filter, ChevronDown, Share, Bookmark, Clock } from 'react-feather';

function Devotional() {
    const { blogs } = useAuth();
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('latest');
    const [isLoading, setIsLoading] = useState(true);
    const [savedPosts, setSavedPosts] = useState([]);
    
    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        
        return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {
        if (blogs) {
            let filtered = blogs.filter(blog => blog.category === 'devotional');
            
            // Apply search filter
            if (searchTerm.trim() !== '') {
                filtered = filtered.filter(blog => 
                    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (blog.description && blog.description.toLowerCase().includes(searchTerm.toLowerCase()))
                );
            }
            
            // Apply sorting
            if (selectedSort === 'latest') {
                filtered.sort((a, b) => new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now()));
            } else if (selectedSort === 'oldest') {
                filtered.sort((a, b) => new Date(a.createdAt || Date.now()) - new Date(b.createdAt || Date.now()));
            } else if (selectedSort === 'alphabetical') {
                filtered.sort((a, b) => a.title.localeCompare(b.title));
            }
            
            setFilteredBlogs(filtered);
        }
    }, [blogs, searchTerm, selectedSort]);
    
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    const toggleSaved = (id) => {
        setSavedPosts(prev => 
            prev.includes(id) 
                ? prev.filter(postId => postId !== id) 
                : [...prev, id]
        );
    };

    const getReadTime = (content) => {
     
        if (!content) return "2 min read";
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);
        return `${readTime} min read`;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        },
        hover: {
            y: -10,
            scale: 1.02,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    const filterVariants = {
        closed: { height: 0, opacity: 0, overflow: "hidden" },
        open: { height: "auto", opacity: 1, overflow: "visible" }
    };

    return (
        <motion.div 
            className="container mx-auto px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-col items-center justify-center mb-8"
            >
                <div className="flex items-center justify-center mb-2">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="bg-blue-100 p-3 rounded-full mr-3"
                    >
                        <Book className="text-blue-600" size={24} />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-800 text-center">
                        Daily Devotional
                    </h1>
                </div>
                <motion.p 
                    className="text-gray-600 text-center max-w-lg mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Inspirational content to nurture your spiritual growth and daily reflection
                </motion.p>
            </motion.div>

            <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
         
                <AnimatePresence>
                    {isFilterOpen && (
                        <motion.div 
                            className="mt-4 bg-white p-4 rounded-lg shadow-md"
                            variants={filterVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            transition={{ duration: 0.3 }}
                        >
                        
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {isLoading ? (
                <motion.div 
                    className="flex h-64 items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.div 
                        animate={{ 
                            rotate: 360,
                            transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
                        }}
                        className="mr-3"
                    >
                        <Loader size={28} className="text-blue-600" />
                    </motion.div>
                    <div className="text-lg text-gray-600 font-medium">
                        Loading inspirational content...
                    </div>
                </motion.div>
            ) : filteredBlogs.length > 0 ? (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Carousel
                        responsive={responsive}
                        showDots={true}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={3000}
                        className="pb-12"
                        keyBoardControl={true}
                        customTransition="transform 500ms ease-in-out"
                        renderDotsOutside={true}
                        dotListClass="custom-dot-list-style"
                    >
                        {filteredBlogs.map((element) => (
                            <motion.div
                                key={element._id}
                                className="p-4"
                                variants={itemVariants}
                                whileHover="hover"
                            >
                                <div className="bg-white border border-gray-100 shadow-md rounded-lg overflow-hidden h-full flex flex-col">
                                    <Link to={`/blog/${element._id}`} className="block relative overflow-hidden">
                                        <motion.img
                                            src={element.blogimage.url}
                                            alt={element.title}
                                            className="w-full h-56 object-cover"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                        
                                        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {element.category}
                                        </div>
                                        
                                        <motion.button
                                            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleSaved(element._id);
                                            }}
                                        >
                                            <Bookmark 
                                                size={16} 
                                                className={savedPosts.includes(element._id) ? "text-blue-600 fill-blue-600" : "text-gray-500"} 
                                            />
                                        </motion.button>
                                    </Link>
                                    
                                    <div className="p-4 flex-grow">
                                        <Link to={`/blog/${element._id}`}>
                                            <h1 className="text-gray-800 text-xl font-bold hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                                {element.title}
                                            </h1>
                                        </Link>
                                        
                                        {element.description && (
                                            <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                                                {element.description}
                                            </p>
                                        )}
                                        
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center">
                                                <Calendar size={14} className="text-gray-400 mr-1" />
                                                <p className="text-gray-500 text-xs">
                                                    {new Date(element.createdAt || Date.now()).toLocaleDateString(undefined, {
                                                        year: 'numeric', 
                                                        month: 'short', 
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            
                                            <div className="flex items-center">
                                                <Clock size={14} className="text-gray-400 mr-1" />
                                                <p className="text-gray-500 text-xs">
                                                    {getReadTime(element.content)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="border-t border-gray-100">
                                        <div className="flex justify-between items-center p-4">
                                      
                                            
                                            <Link 
                                                to={`/blog/${element._id}`}
                                                className="flex items-center text-blue-600 font-medium text-sm"
                                            >
                                                <motion.div
                                                    className="flex items-center"
                                                    whileHover={{ x: 5 }}
                                                    transition={{ type: "spring", stiffness: 400 }}
                                                >
                                                    Read more
                                                    <ArrowRight size={16} className="ml-1" />
                                                </motion.div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </Carousel>
                </motion.div>
            ) : (
                <motion.div 
                    className="bg-gray-50 rounded-lg p-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="inline-block bg-gray-200 p-4 rounded-full mb-4"
                    >
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No devotionals found</h3>
                    <p className="text-gray-500 mb-4">
                        {searchTerm ? `No results for "${searchTerm}"` : "Check back later for new devotional content"}
                    </p>
                    {searchTerm && (
                        <motion.button
                            onClick={() => setSearchTerm('')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Clear search
                        </motion.button>
                    )}
                </motion.div>
            )}
        </motion.div>
    );
}

export default Devotional;