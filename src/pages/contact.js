import React from 'react';
import { useForm } from 'react-hook-form';
import { 
  HiOutlineUser, 
  HiOutlineMail, 
  HiOutlineLocationMarker, 
  HiOutlinePhone 
} from 'react-icons/hi';
import { 
  FaGithub, 
  FaLinkedinIn, 
  FaTwitter, 
  FaInstagram 
} from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

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
      reset();
    } catch (error) {
      console.error("Error details:", error.response ? error.response.data : error.message);
      toast.error("Failed to send message. Please try again later");
    }
  };

  const socialLinks = [
    { name: 'GitHub', icon: FaGithub, url: '#', color: 'hover:text-gray-800' },
    { name: 'LinkedIn', icon: FaLinkedinIn, url: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: FaTwitter, url: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: FaInstagram, url: '#', color: 'hover:text-pink-500' }
  ];

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 lg:w-2/5">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-8">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-4 text-white group"
                    >
                      <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30">
                        <HiOutlineUser className="text-xl" />
                      </div>
                      <span>Yogesh Tiwari</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-4 text-white group"
                    >
                      <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30">
                        <HiOutlineMail className="text-xl" />
                      </div>
                      <span>yt781703@gmail.com</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-4 text-white group"
                    >
                      <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30">
                        <HiOutlinePhone className="text-xl" />
                      </div>
                      <span>+91 7276245838</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-4 text-white group"
                    >
                      <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30">
                        <HiOutlineLocationMarker className="text-xl" />
                      </div>
                      <span>Mathura</span>
                    </motion.div>
                  </div>
                </div>
                
                <div className="mt-12 lg:mt-0">
                  <h3 className="text-white text-lg font-semibold mb-4">
                    Connect With Us
                  </h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        href={social.url}
                        className={`bg-white/20 p-3 rounded-full transition-colors ${social.color}`}
                      >
                        <span className="sr-only">{social.name}</span>
                        <social.icon className="w-5 h-5 text-white" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 lg:w-3/5">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <BiMessageDetail className="absolute left-3 top-3 text-gray-400 text-xl" />
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows="4"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <BiMessageDetail className="text-xl" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Contact;