import React, { useState, useEffect } from 'react';
import { Mail, Phone, GraduationCap, Search, MapPin, Briefcase } from 'lucide-react';
import { comon_url } from './commonroutes.js';

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(`${comon_url}/routes/getalladminanduser`, {
          credentials: 'include'
        });
        const data = await response.json();
        setProfiles(data || []);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || profile.role.toLowerCase() === selectedRole;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="space-y-4">
          <div className="w-32 h-32 bg-gradient-to-tr from-teal-400 to-blue-500 rounded-full animate-pulse mx-auto" />
          <p className="text-gray-500 text-center animate-pulse">Loading profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Meet Our Team
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Discover the talented individuals behind our success
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-teal-400 focus:ring-2 focus:ring-teal-200 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedRole('all')}
                className={`px-6 py-3 rounded-xl transition-all duration-200 ${
                  selectedRole === 'all'
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedRole('admin')}
                className={`px-6 py-3 rounded-xl transition-all duration-200 ${
                  selectedRole === 'admin'
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Admins
              </button>
              <button
                onClick={() => setSelectedRole('user')}
                className={`px-6 py-3 rounded-xl transition-all duration-200 ${
                  selectedRole === 'user'
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Users
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProfiles.map((profile) => (
            <div
              key={profile._id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-teal-400 to-blue-500" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={profile.photo?.url || '/api/placeholder/100/100'}
                      alt={profile.name}
                      className="w-16 h-16 rounded-xl object-cover ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
                      <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium mt-1
                        ${profile.role.toLowerCase() === 'admin' 
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-teal-100 text-teal-700'
                        }`}
                      >
                        {profile.role}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-600 group-hover:text-teal-600 transition-colors duration-300">
                    <Mail className="w-5 h-5 mr-3" />
                    <span>{profile.email}</span>
                  </div>
                  {profile.phone && (
                    <div className="flex items-center text-gray-600 group-hover:text-teal-600 transition-colors duration-300">
                      <Phone className="w-5 h-5 mr-3" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                  {profile.education && (
                    <div className="flex items-center text-gray-600 group-hover:text-teal-600 transition-colors duration-300">
                      <GraduationCap className="w-5 h-5 mr-3" />
                      <span>{profile.education}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No profiles found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profiles;