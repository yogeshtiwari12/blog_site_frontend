import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';
import { comon_url } from './commonroutes.js';
import toast from 'react-hot-toast';


function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({ title: '', category: '', about: '' });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${comon_url}/blogroute/getmyblogs`, {
          withCredentials: true,
        });
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);
 

const deleteBlog = async (id) => {
  try {


    await axios.delete(`${comon_url}/blogroute/delete/${id}`, {
      withCredentials: true,
    });

 
    setBlogs(blogs.filter((blog) => blog._id !== id));
    toast.success('Blog deleted successfully');
  } catch (error) {
    toast.error('Error deleting blog');
    console.error('Error deleting blog:', error);
  }
};

  const openEditModal = (blog) => {
    setEditingBlog(blog._id);
    setFormData({
      title: blog.title,
      category: blog.category,
      about: blog.about,
    });
  };

  const closeEditModal = () => {
    setEditingBlog(null);
    setFormData({ title: '', category: '', about: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${comon_url}/blogroute/update/${editingBlog}`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success('Blog updated successfully');
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === editingBlog ? { ...blog, ...formData } : blog
          )
        );
        closeEditModal();
      }
    } catch (error) {
      toast.error('Error updating blog');
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 ml-64">
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
                  <button
                    onClick={() => openEditModal(blog)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400"
                  >
                    Update
                  </button>
                  <button
                    onClick={() =>
                      
                      deleteBlog(blog._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
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

      {editingBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-center mb-4">Update Blog</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select Category</option>
                <option value="devotional">Devotional</option>
                <option value="tech">Tech</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows="4"
                placeholder="About the Blog"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
