import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { KeyRound, AlertCircle, Send, ChevronRight, Clock } from 'lucide-react';
import { LoadingAnimation } from "../components/Loading";

const VerifyR = () => {
  const [otp, setOtp] = useState("");
  const [formError, setFormError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const { verifyRecruiter, btnLoading } = UserData();
  const navigate = useNavigate();
  const { token } = useParams();
  const inputRef = useRef(null);

  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      setFormError("Please enter the verification code");
      return;
    }
    
    if (otp.length !== 6) {
      setFormError("Verification code must be 6 digits");
      return;
    }
    
    setFormError("");
    verifyRecruiter(token, otp, navigate);
  };

  const handleResendOtp = () => {
    // Logic for resending OTP would go here
    setTimeLeft(300); // Reset timer
    // You would need to call an API function here to resend the OTP
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
          
          <h2 className="text-2xl font-bold text-white mt-6">Verify Recruiter Account</h2>
          <p className="text-neutral-400 text-sm">Enter the 6-digit verification code sent to your email</p>
        </div>
        
        <form onSubmit={submitHandler} className="px-8 pb-8 space-y-6">
          {formError && (
            <div className="bg-red-900/20 border border-red-800/50 text-red-400 px-4 py-3 rounded-lg flex items-center text-sm">
              <AlertCircle size={16} className="mr-2 flex-shrink-0" />
              {formError}
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="otp" className="block text-sm font-medium text-neutral-300">
              Verification Code
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound size={18} className="text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-200" />
              </div>
              <input
                ref={inputRef}
                id="otp"
                name="otp"
                type="text"
                required
                value={otp}
                onChange={(e) => {
                  // Only allow digits
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 6) {
                    setOtp(value);
                  }
                }}
                maxLength={6}
                pattern="\d{6}"
                className="block w-full pl-10 pr-3 py-3 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 tracking-widest text-center font-mono"
                placeholder="Enter 6-digit code"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <Clock size={16} className={`flex-shrink-0 ${timeLeft > 60 ? 'text-neutral-400' : 'text-red-400'}`} />
            <p className={`text-sm ${timeLeft > 60 ? 'text-neutral-400' : 'text-red-400'}`}>
              Code expires in {formatTime(timeLeft)}
            </p>
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
                    Verify Code
                  </>
                )}
              </span>
              <ChevronRight size={18} className="opacity-70 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
          
          <div className="pt-2 text-center">
            <button 
              onClick={handleResendOtp} 
              disabled={timeLeft > 0}
              className={`text-sm font-medium ${timeLeft > 0 ? 'text-neutral-500 cursor-not-allowed' : 'text-indigo-400 hover:text-indigo-300 transition-colors duration-200 cursor-pointer'}`}
            >
              {timeLeft > 0 ? "Resend code available after countdown" : "Didn't receive the code? Resend"}
            </button>
            
            <div className="mt-4 text-sm text-neutral-400">
              <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                Return to login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyR;