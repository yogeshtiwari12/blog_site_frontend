import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
import { useAuth } from '../context/authcontext';
import { comon_url } from './commonroutes.js';

function Createblogs() {
  const { profile } = useAuth();
  const [blogs, setBlogs] = useState([]);
  console.log(blogs)

  const deleteblog = async (id) => {
    try {
      await axios.delete(`${comon_url}/blogroute/delete/${id}`, {
        withCredentials: true,
      });
    
      setBlogs(blogs.filter(blog => blog._id !== id));
      console.log('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  }
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${comon_url}/blogroute/getmyblogs`, {
          withCredentials: true,
        });
        console.log("blogs data",response.data);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 ml-64">
        {/* Adjust margin-left based on the width of your sidebar */}
        <h1 className="text-2xl font-semibold mb-4">My Blogs</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white border border-gray-200 rounded-lg shadow-md p-4"
              >
                <img
                  src={blog.blogimage.url}
                  alt={blog.title}
                  className="w-full h-32 object-cover rounded-t-lg mb-4"
                />
                <h2 className="text-lg font-bold mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{blog.category}</p>
                <p className="text-sm text-gray-600 mb-4">{blog.about}</p>
                <div className="flex space-x-4">
                  <a
                    href={`/updateblog/${blog?._id}`}
                    
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400"
                  >
                    Update
                  </a>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
                    onClick={(e) => {
                 
                      deleteblog(blog._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center">No blogs available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Createblogs;
