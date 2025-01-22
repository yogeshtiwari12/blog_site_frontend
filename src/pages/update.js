import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { comon_url } from './commonroutes.js';

function UpdateBlog() {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [about, setAbout] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${comon_url}/blogroute/getsingleblog/${id}`, {
                    withCredentials: true,
                });
                const { title, category, about } = response.data;

                setTitle(title);
                setCategory(category);
                setAbout(about);
            } catch (error) {
                toast.error('Error fetching blog');
                console.error('Error fetching blog:', error.response ? error.response.data : error.message);
            }
        };

        fetchBlog();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('about', about);

        try {
            const response = await axios.put(`${comon_url}/blogroute/update/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            if (response.status === 200) {
                toast.success('Successfully updated');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000); 
            }
        } catch (error) {
            toast.error('Error updating blog');
            console.error('Error during blog update:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-300">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl md:max-w-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Update Blog</h2>
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

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-400"
                    >
                        Update Blog
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateBlog;
