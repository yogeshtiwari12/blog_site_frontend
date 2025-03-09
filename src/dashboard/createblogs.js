import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { comon_url } from '../pages/commonroutes.js';

function Createblogs() {
  const [blogimage, setblogimage] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [about, setAbout] = useState('');

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setblogimage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('about', about);
    if (blogimage) {
      formData.append('blogimage', blogimage);
    }

    try {
      const response = await axios.post(`${comon_url}/blogroute/createblog`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (response.status) {
        toast.success("Successfully created");
        navigate('/dashboard'); 
      }
    } catch (error) {
      toast.error('Error creating blog');
      console.error('Error during blog creation:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl md:max-w-lg backdrop-blur-sm bg-opacity-80"
      >
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500"
        >
          Create Blog
        </motion.h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />

          <motion.select
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          >
            <option value="" disabled>Select Category</option>
            <option value="devotional">Devotional</option>
            <option value="tech">Tech</option>
            <option value="lifestyle">Lifestyle</option>
          </motion.select>

          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            placeholder="About the Blog"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows="4"
            className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-4"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block text-sm text-gray-600 file:py-2 file:px-4 file:border-0 file:rounded-full file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
            {blogimage && (
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                src={URL.createObjectURL(blogimage)}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-xl shadow-md"
              />
            )}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform"
          >
            Submit Blog
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Createblogs;