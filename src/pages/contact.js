import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formdata = {
      access_key: "666c7cf2-c7e7-4eed-b864-21852d7e59d1",
      name: data.name,
      email: data.email,
      message: data.message
    };
  
    try {
      await axios.post('https://api.web3forms.com/submit', formdata);
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Error details:", error.response ? error.response.data : error.message);
      toast.error("Failed to send message. Please try again later");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-md overflow-hidden">
        {/* Contact Form */}
        <div className="w-1/2 p-6 border-r border-gray-300">
          <h1 className="text-xl font-semibold mb-4">Contact Us</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                {...register('name', { required: true })}
                placeholder="Enter your name"
                className="w-full p-2 border border-gray-300 rounded  outline-none"
              />
              {errors.name && <span className="text-red-500">This field is required</span>}
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 rounded  outline-none"
              />
              {errors.email && <span className="text-red-500">This field is required</span>}
            </div>

            

            <div>
              <label className="block mb-1">Message</label>
              <textarea
                {...register('message', { required: true })}
                placeholder="Enter your message"
                className="w-full p-2 border border-gray-300 rounded  outline-none"
              ></textarea>
              {errors.message && <span className="text-red-500">This field is required</span>}
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="w-1/2 p-6 flex flex-col justify-center bg-white shadow-lg rounded-md">
          <div className="ml-12">
            <h1 className="text-xl font-semibold mb-4">Contact Information</h1>
            <div className="flex flex-col items-start space-y-4">
              <div className="flex items-center space-x-4">
                <FaUser className="text-gray-600 text-xl" />
                <span className="text-gray-800">Yogesh Tiwari</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-red-700 text-xl" />
                <span className="text-gray-800">your.email@example.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaPhone className="text-green-600 text-xl" />
                <span className="text-gray-800">+1234567890</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
