import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiCode, HiColorSwatch, HiDesktopComputer, HiServer } from 'react-icons/hi';

const teamMembers = [
  {
    name: 'Kush Bhardwaj',
    role: 'Designer',
    description: 'BTech CS 3rd year student with 2 years of experience in design. Provides resources and creates page designs.',
    icon: HiColorSwatch,
    color: 'from-purple-500 to-pink-500',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    name: 'Nitish Kumar',
    role: 'Backend Developer',
    description: 'BTech CS 3rd year student with 2 years of experience in backend development. Helps with backend designs, logic, and creating models.',
    icon: HiServer,
    color: 'from-blue-500 to-cyan-500',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    name: 'Tanya Shukla',
    role: 'Frontend Developer',
    description: 'BTech CS 3rd year student with 2 years of experience in frontend development. Creates user interfaces and designs.',
    icon: HiDesktopComputer,
    color: 'from-green-500 to-emerald-500',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    name: 'Yogesh Tiwari',
    role: 'Backend Developer',
    description: 'BTech CS 3rd year student with 2 years of experience in backend development. Creates backend logic and structures.',
    icon: HiCode,
    color: 'from-orange-500 to-red-500',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
];

function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            Meet Our <span className="text-blue-600">Amazing Team</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            We're a group of passionate developers and designers working together to create amazing experiences.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r w-full h-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to right, ${member.color})`
                }}
              />
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className={`h-2 bg-gradient-to-r ${member.color}`} />
                <div className="p-6">
                  <div className="flex justify-center mb-6">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${member.color}`}>
                      <member.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                    {member.name}
                  </h2>
                  <h3 className="text-lg font-medium text-blue-600 text-center mb-4">
                    {member.role}
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    {member.description}
                  </p>
                  <div className="flex justify-center space-x-4 pt-4 border-t">
                    <motion.a
                      whileHover={{ y: -3 }}
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <FaGithub className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -3 }}
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -3 }}
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-500"
                    >
                      <FaTwitter className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We're always looking for talented individuals to join our team.
          </p>
        
        </motion.div>
      </div>
    </div>
  );
}

export default AboutPage;