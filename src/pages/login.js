import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';



function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/routes/login', {
        email,
        password,
        role,
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
       toast.success("login success")
       
       setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1000); 

        const token = Cookies.get('token');
        console.log(token);
        console.log(response.data);

        setEmail('');
        setPassword('');
        setRole('');
      }
    } catch (error) {
      toast.error(error.response.data.message||"Invalid credentials")
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full min-h-[400px] flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Log<span className="text-blue-500">in</span>
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            value={password}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            id="userRole"
            name="userRole"
            onChange={(e) => setRole(e.target.value)}
            value={role}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select User Role
            </option>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-400"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:text-blue-400">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
