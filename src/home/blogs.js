import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authcontext.js';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiOutlineClock, 
  HiOutlineTag, 
  HiOutlineUser, 
  HiOutlineHeart,
  HiOutlineSearch,
  HiOutlineFilter
} from 'react-icons/hi';

function Blogs() {
    const { blogs } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('latest');

    // Get unique categories
    const categories = ['all', ...new Set(blogs?.map(blog => blog.category) || [])];

    const filteredBlogs = blogs?.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            blog.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
        return matchesSearch && matchesCategory;
    }).sort((a, b) => {
        if (sortBy === 'latest') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return new Date(a.createdAt) - new Date(b.createdAt);
    });

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-12">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Our <span className="text-blue-600">Blog Posts</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Discover insights, stories, and knowledge
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
                    <div className="relative flex-1 max-w-lg">
                        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="latest">Latest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>

                {blogs ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBlogs.map((blog) => (
                            <div
                                key={blog._id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <Link to={`/singleblog/${blog._id}`} className="block">
                                    <div className="relative">
                                        <img
                                            src={blog.blogimage.url}
                                            alt={blog.title}
                                            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/400x300?text=Blog+Image';
                                            }}
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center space-x-2 mb-4">
                                            <HiOutlineTag className="text-blue-500" />
                                            <span className="text-sm font-medium text-blue-500">
                                                {blog.category}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                            {blog.title}
                                        </h2>
                                        {blog.about && (
                                            <p className="text-gray-600 mb-4 line-clamp-3">
                                                {blog.about}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <div className="flex items-center space-x-2">
                                                <img
                                                    src={blog.adminphoto}
                                                    alt={blog.adminname}
                                                    className="w-8 h-8 rounded-full"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/32?text=A';
                                                    }}
                                                />
                                                <span className="text-sm text-gray-600">
                                                    {blog.adminname}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-gray-500">
                                                <HiOutlineClock className="w-4 h-4" />
                                                <span className="text-sm">
                                                    {Math.ceil(blog.about?.length / 200) || 1} min read
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <p className="mt-4 text-lg text-gray-600">Loading blogs...</p>
                    </div>
                )}

                {filteredBlogs?.length === 0 && (
                    <div className="text-center py-12">
                        <HiOutlineFilter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-900">No blogs found</h3>
                        <p className="text-gray-600 mt-2">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Blogs;


