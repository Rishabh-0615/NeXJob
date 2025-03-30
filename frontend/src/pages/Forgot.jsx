import React, { useState } from 'react';
import { Mail, AlertCircle, Send, ChevronRight } from 'lucide-react';
import { UserData } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import { LoadingAnimation } from '../components/Loading';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState('');
  const { btnLoading, forgotUser } = UserData();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email.trim()) {
      setFormError("Please enter your email address");
      return;
    }
    
    setFormError("");
    forgotUser(email, navigate);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-60">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-w-md w-full relative z-10 backdrop-blur-sm backdrop-filter">
        {/* Brand header */}
        <div className="relative px-8 pt-10 pb-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-10 rounded-bl-full"></div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
            NeX<span className="text-white">Job</span>
          </h1>
          <p className="text-neutral-400 mt-2 text-sm">The next generation job portal</p>
          
          <h2 className="text-2xl font-bold text-white mt-6">Reset Password</h2>
          <p className="text-neutral-400 text-sm">Enter your email to receive a password reset link</p>
        </div>
        
        <form onSubmit={submitHandler} className="px-8 pb-8 space-y-6">
          {formError && (
            <div className="bg-red-900/20 border border-red-800/50 text-red-400 px-4 py-3 rounded-lg flex items-center text-sm">
              <AlertCircle size={16} className="mr-2 flex-shrink-0" />
              {formError}
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-neutral-300">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-200" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={btnLoading}
              className="w-full flex justify-between items-center py-3 px-4 border border-transparent rounded-xl font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
            >
              <span className="flex items-center">
                {btnLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Send Reset Link
                  </>
                )}
              </span>
              <ChevronRight size={18} className="opacity-70 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
          
          <div className="pt-4 text-center">
            <p className="text-sm text-neutral-400">
              Remember your password?{' '}
              <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgot;