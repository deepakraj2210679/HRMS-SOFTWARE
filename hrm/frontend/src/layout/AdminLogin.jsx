import {useState} from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import toast from 'react-hot-toast';
import logo from '../assets/logo.png';
const LoginPage=()=>{


const Navigate=useNavigate();
    const [email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const [token,settoken]=useState(localStorage.getItem("authToken")  || null);
   


const actionSubmit=async(e)=>{
    e.preventDefault()

        const res=await axios.post("https://hrms-software-frontend.onrender.com/Login",{email,password})
        .then((res)=>{
           settoken(res.data.token)
            localStorage.setItem("authToken",res.data.token)
            Navigate("/dashboard")
        })
        .catch((error)=>{
  
            toast.error(error.response?.data?.message||"Login failed. Please try again" ,{ position: 'top-right', duration: 5000 }
);
        })
        
}

 return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-xl">
        <div className="flex flex-col items-center">
          <img src={logo}   className="w-32 h-32 object-contain rounded-full border border-gray-300 p-5 m-2 bg-white"/>
          <h2 className="text-3xl font-bold text-yellow-600">NoQu HRMS Login</h2>
        </div>
        <form onSubmit={actionSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              required
              onChange={(e) => setemail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              required
              onChange={(e) => setpassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-yellow-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 font-semibold"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <span className="text-yellow-600 font-semibold">Contact Admin</span>
        </p>
      </div>
    </div>
  );
};

export {LoginPage}