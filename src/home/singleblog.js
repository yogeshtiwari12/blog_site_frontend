import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { comon_url } from '../pages/commonroutes.js';

const SingleBlog = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${comon_url}/blogroute/getsingleblog/${id}`,{
            withCredentials:true
          }
        );
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blogs) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <div>
        {blogs && (
          <section className="container mx-auto p-4">
            <div className="text-blue-500 uppercase text-xs font-bold mb-4">
              {blogs.category}
            </div>
            <h1 className="text-4xl font-bold mb-6">{blogs.title}</h1>
            <div className="flex items-center mb-6">
              <img
                src={blogs.adminphoto}
                alt="author_avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <p className="text-lg font-semibold">{blogs.adminname}</p>
            </div>

            <div className="flex flex-col md:flex-row">
              {blogs.blogimage && (
                <img
                  src={blogs.blogimage.url}
                  alt="mainblogsImg"
                  className="md:w-1/3 w-full h-[400px] mb-6 rounded-lg shadow-lg cursor-pointer border"
                />
              )}
              <div className="md:w-1/2 w-full md:pl-6 flex items-center">
                <p className="text-lg mb-6">{blogs.about}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SingleBlog;
