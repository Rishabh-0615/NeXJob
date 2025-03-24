import React, { useState } from 'react';
import { User, Mail, Phone, Lock, AlertCircle, UserPlus, ChevronRight } from 'lucide-react';
import { UserData } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const JobseekerRegister = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { registerUser, btnLoading } = UserData();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      await registerUser(name, email, password, navigate);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-w-md w-full relative z-10 backdrop-blur-sm backdrop-filter">
        <div className="relative px-8 pt-10 pb-6">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
            NeX<span className="text-white">Job</span>
          </h1>
          <h2 className="text-2xl font-bold text-white mt-6">Create Account</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
          {error && (
            <div className="bg-red-900/20 border border-red-800/50 text-red-400 px-4 py-3 rounded-lg flex items-center text-sm">
              <AlertCircle size={16} className="mr-2 flex-shrink-0" />
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-neutral-300">Full Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="block w-full p-3 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl" placeholder="John Doe" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-neutral-300">Email Address</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="block w-full p-3 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl" placeholder="your.email@example.com" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="mobile" className="block text-sm font-medium text-neutral-300">Mobile Number</label>
            <input id="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} className="block w-full p-3 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl" placeholder="1234567890" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-300">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full p-3 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl" placeholder="••••••••" />
          </div>
          
          <div className="mt-6">
            <button type="submit" disabled={btnLoading} className="w-full py-3 px-4 rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 disabled:opacity-50">
              {btnLoading ? "Processing..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobseekerRegister;
