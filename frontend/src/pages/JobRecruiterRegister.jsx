import React, { useState } from 'react';
import { Mail, Lock, Building, Phone, Globe, MapPin, Briefcase, User, Upload, AlertCircle, ChevronRight } from 'lucide-react';
import { UserData } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios

const JobRecruiterRegister = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    location: '',
    password: '',
    confirmPassword: '',
    companyLogo: null
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {registerRecruiter} = UserData();
  const navigate = useNavigate();

  const industries = [
    "Technology & IT",
    "Finance & Banking",
    "Healthcare & Pharmaceuticals",
    "Education & Training",
    "Manufacturing & Engineering",
    "Retail & E-commerce",
    "Marketing & Advertising",
    "Construction & Real Estate",
    "Logistics & Transportation",
    "Hospitality & Tourism",
    "Government & Public Sector",
    "Legal & Consulting",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        companyLogo: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    // Prepare form data for API submission
    const registrationData = new FormData();
    registrationData.append('companyName', formData.companyName);
    registrationData.append('email', formData.email);
    registrationData.append('password', formData.password);
    registrationData.append('phone', formData.phone);
    registrationData.append('website', formData.website || '');
    registrationData.append('industry', formData.industry);
    registrationData.append('location', formData.location);
    
    // Append company logo if provided
    if (formData.companyLogo) {
      registrationData.append('companyLogo', formData.companyLogo);
    }
    
    try {
      const response = await axios.post('/api/recruiter/register', registrationData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      

    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
      console.error('Registration error:', err);
    }
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
      
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-w-md w-full relative z-10 backdrop-blur-sm backdrop-filter my-8">
        {/* Brand header */}
        <div className="relative px-8 pt-10 pb-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-10 rounded-bl-full"></div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
            NeX<span className="text-white">Job</span>
          </h1>
          <p className="text-neutral-400 mt-2 text-sm">Recruiter Portal</p>
          
          <h2 className="text-2xl font-bold text-white mt-6">Create Recruiter Account</h2>
          <p className="text-neutral-400 text-sm">Start hiring top talent for your company</p>
        </div>
        
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
          {error && (
            <div className="bg-red-900/20 border border-red-800/50 text-red-400 px-4 py-3 rounded-lg flex items-center text-sm">
              <AlertCircle size={16} className="mr-2 flex-shrink-0" />
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="companyName" className="block text-sm font-medium text-neutral-300">
              Company Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building size={18} className="text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-200" />
              </div>
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                value={formData.companyName}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="Company Name"
              />
            </div>
          </div>
          
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
                value={formData.email}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="company@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-neutral-300">
              Phone Number
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={18} className="text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-200" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="+1 (123) 456-7890"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="website" className="block text-sm font-medium text-neutral-300">
              Website (Optional)
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe size={18} className="text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-200" />
              </div>
              <input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="https://yourcompany.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="industry" className="block text-sm font-medium text-neutral-300">
              Industry
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase size={18} className="text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-200" />
              </div>
              <select
                id="industry"
                name="industry"
                required
                value={formData.industry}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              >
                <option value="" disabled>Select industry</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-medium text-neutral-300">
              Location
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-200" />
              </div>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="City, Country"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="companyLogo" className="block text-sm font-medium text-neutral-300">
              Company Logo (Optional)
            </label>
            <div className="relative group">
              <label className="flex items-center justify-center w-full py-3 px-3 bg-neutral-800 border border-neutral-700 border-dashed text-neutral-400 rounded-xl cursor-pointer hover:bg-neutral-750 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200">
                <div className="flex items-center">
                  <Upload size={18} className="mr-2 text-neutral-400" />
                  <span className="text-sm">
                    {formData.companyLogo ? formData.companyLogo.name : 'Upload logo image'}
                  </span>
                </div>
                <input
                  id="companyLogo"
                  name="companyLogo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-300">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-200" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-300">
              Confirm Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-200" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-between items-center py-3 px-4 border border-transparent rounded-xl font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
            >
              <span className="flex items-center">
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <User size={18} className="mr-2" />
                    Create Account
                  </>
                )}
              </span>
              <ChevronRight size={18} className="opacity-70 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
          
          <div className="pt-4 text-center">
            <p className="text-sm text-neutral-400">
              Already have a recruiter account?{' '}
              <a href="/recruiter/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                Sign in
              </a>
            </p>
          </div>
          
          <div className="text-xs text-neutral-500 text-center pt-2">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
            <br />
            <span className="text-neutral-400">Note: Your account will need verification by admin before you can post jobs.</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobRecruiterRegister;