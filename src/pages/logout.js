// import axios from 'axios';
// import React from 'react';
// import toast from 'react-hot-toast';

// function Logout() {
//   const logout = async () => {
//     try {
//       const response = await axios.post('http://localhost:4000/routes/logout', {}, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

      
//       toast.success(response.data.message || 'Logged out successfully!');
//     } catch (error) {
//       // Show error if logout fails
//       toast.error('Logout failed, please try again.');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button
//         onClick={logout}
//         className="py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-full transition-colors duration-300"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

// export default Logout;
