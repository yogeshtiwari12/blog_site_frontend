import React from 'react';

const teamMembers = [
  {
    name: 'Kush Bhardwaj',
    role: 'Designer',
    description: 'BTech CS 3rd year student with 2 years of experience in design. Provides resources and creates page designs.'
  },
  {
    name: 'Nitish Kumar',
    role: 'Backend Developer',
    description: 'BTech CS 3rd year student with 2 years of experience in backend development. Helps with backend designs, logic, and creating models.'
  },
  {
    name: 'Tanya Shukla',
    role: 'Frontend Developer',
    description: 'BTech CS 3rd year student with 2 years of experience in frontend development. Creates user interfaces and designs.'
  },
  {
    name: 'Yogesh Tiwari',
    role: 'Backend Developer',
    description: 'BTech CS 3rd year student with 2 years of experience in backend development. Creates backend logic and structures.'
  },
];

function AboutPage() {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 bg-gradient-to-br from-blue-100 to-blue-300 ">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">Meet Our Team</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center transition-transform transform hover:-translate-y-4 transform hover:-translate-x-4  hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-blue-500">{member.name}</h2>
              <h3 className="text-xl font-medium text-gray-700">{member.role}</h3>
              <p className="mt-4 text-gray-600">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
