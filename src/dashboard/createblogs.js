import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { comon_url } from '../pages/commonroutes.js';

function Createblogs() {
  const [blogimage, setblogimage] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [about, setAbout] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setblogimage(file);
  };

  const navigate = useNavigate();
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
        
        console.log(response.data.message)
        setTitle('');
        setCategory('');
        setAbout('');
        setblogimage('');
      }
    } catch (error) {
      toast.error('Error creating blog');
      console.error('Error during blog creation:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl md:max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Create Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select Category</option>
            <option value="devotional">Devotional</option>
            <option value="tech">Tech</option>
            <option value="lifestyle">Lifestyle</option>
         
          </select>

          <textarea
            placeholder="About the Blog"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-400"
            />
            {blogimage && (
              <img
                src={URL.createObjectURL(blogimage)}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-md"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-400"
          >
            Submit Blog
          </button>
        </form>

        {/* <div className="mt-4 text-center">
          <p>Back to <Link to="/" className="text-blue-500 hover:text-blue-400">Home</Link></p>
        </div> */}
      </div>
    </div>
  );
}

export default Createblogs;
