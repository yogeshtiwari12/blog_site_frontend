import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignUp() {
  const [photo, setphoto] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [education, setEducation] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setphoto(file)
  
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response  = await axios.put('https://blog-site-backend-3b1g.onrender.com/routes/signup', {
        photo,
        name,
        email,
        phone,
        password,
        education,
        role,
      },
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true     }
    )
      if(response.data){
        console.log(response.data)
       toast.success("Signup successful")
      navigate('/login')
       console.log(response.data.message)
        
      setName('');
      setEmail('');
      setPhone('');
      setEmail('');
      setEducation('');
      setRole('');
      setphoto(null)
      setPassword('')

      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.error('Error during signup:', error);

    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full min-h-[600px] flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign<span className="text-blue-500">Up</span>
        </h2>
        <form className="space-y-4 flex-grow" onSubmit={handleSubmit}>

          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select User Role</option>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>

          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


          <select
            id="education"
            name="education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select your education</option>
            <option value="btech">BTech</option>
            <option value="mca">MCA</option>
            <option value="other">Other Tech Courses</option>
          </select>

          <div className="flex items-center space-x-4">
            <input
              type="file"
              id="fileUpload"
              name="fileUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="block text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-400"
            />
            {photo && (
              <img
                src={URL.createObjectURL(photo)}
                alt="Preview"
                className="w-14 h-14 object-cover rounded-full"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-400"
          >
            Submit
          </button>
        </form>


        <div className="mt-4 text-center">
          <p>Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-400">Login</Link></p>
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="w-1 h-1 bg-blue-500 rounded-full absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
