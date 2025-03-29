import React, { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase, Search, Filter, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Simple Error Boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
          <div className="bg-neutral-900 border border-red-800 rounded-2xl p-8 text-center max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
            <p className="text-neutral-400 mb-4">
              We're having trouble loading the job listings. Please try refreshing the page.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-all duration-200"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper for the main component
const AllJobsWithErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <AllJobsContent />
    </ErrorBoundary>
  );
};

// Main component content
const AllJobsContent = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const response = await axios.get("/api/jobPost/getJob");
        const data = response?.data;
        
        // Validate the response data
        if (!data || !Array.isArray(data)) {
          console.error("Invalid job posts data format", data);
          setJobPosts([]);
        } else {
          setJobPosts(data);
        }
      } catch (error) {
        console.error("Error fetching job posts", error);
        setError("Failed to load job posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobPosts();
  }, []);

  // Safe filtering function with added filter type handling
  const filteredJobs = React.useMemo(() => {
    try {
      if (!Array.isArray(jobPosts)) return [];
      
      return jobPosts.filter(job => {
        if (!job) return false;
        
        // Search term filtering
        const titleMatch = job.title ? 
          job.title.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false;
        
        const companyMatch = job.company ? 
          job.company.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false;
        
        const locationCityMatch = job.location && job.location.city ? 
          job.location.city.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false;
        
        const matchesSearch = titleMatch || companyMatch || locationCityMatch;
        
        // Job type filtering
        let matchesFilter = true;
        if (filter !== "all") {
          const jobType = job.jobType ? job.jobType.toString().toLowerCase() : "";
          
          switch(filter) {
            case "fulltime":
              matchesFilter = jobType === "full-time" || jobType === "fulltime";
              break;
            case "parttime":
              matchesFilter = jobType === "part-time" || jobType === "parttime";
              break;
            case "remote":
              matchesFilter = jobType === "remote";
              break;
            default:
              matchesFilter = true;
          }
        }
        
        return matchesSearch && matchesFilter;
      });
    } catch (err) {
      console.error("Error filtering jobs:", err);
      return [];
    }
  }, [jobPosts, searchTerm, filter]);

  // If there's an error fetching data
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
        <div className="bg-neutral-900 border border-red-800 rounded-2xl p-8 text-center max-w-md">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-900/20 mb-4">
            <Briefcase className="h-8 w-8 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Error Loading Jobs</h3>
          <p className="text-neutral-400">{error}</p>
        </div>
      </div>
    );
  }

  // Safe rendering function for job item
  const renderJobItem = (jobPost, index) => {
    if (!jobPost) return null;
    
    try {
      const skills = jobPost.skills && Array.isArray(jobPost.skills) ? jobPost.skills : [];
      const createdAt = jobPost.createdAt ? new Date(jobPost.createdAt) : null;
      const formattedDate = createdAt && !isNaN(createdAt) ? 
        createdAt.toLocaleDateString() : "Unknown date";
      
      return (
        <div key={jobPost._id || `job-${index}`} className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg overflow-hidden hover:border-indigo-800 transition-colors duration-300">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {jobPost.title || "Untitled Position"}
                </h3>
                <div className="flex items-center text-neutral-400 text-sm mb-3">
                  {jobPost.company && (
                    <span className="mr-3">{String(jobPost.company)}</span>
                  )}
                  {jobPost.location && jobPost.location.city && (
                    <span className="flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {String(jobPost.location.city)}
                    </span>
                  )}
                </div>
              </div>
              <div className="bg-indigo-900/20 text-indigo-400 text-xs font-medium px-3 py-1 rounded-full">
                {jobPost.jobType || "Full-time"}
              </div>
            </div>
            
            <p className="text-neutral-300 mb-4 line-clamp-2">
              {jobPost.description || "No description provided"}
            </p>
            
            {skills.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    skill ? (
                      <span key={`skill-${i}`} className="bg-neutral-800 text-neutral-300 text-xs px-3 py-1 rounded-full">
                        {String(skill)}
                      </span>
                    ) : null
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-2">
              <div className="text-sm">
                <span className="text-neutral-400">Posted: </span>
                <span className="text-neutral-300">{formattedDate}</span>
              </div>
              <button 
                onClick={() => navigate(`/jobpost/${jobPost._id}`)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg text-sm font-medium transition-all duration-200">
                View Details
              </button>
            </div>
          </div>
        </div>
      );
    } catch (err) {
      console.error(`Error rendering job item ${index}:`, err);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-60 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <Briefcase className="text-indigo-400" size={28} />
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
              NeX<span className="text-white">Job</span>
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-white mt-6">Job Listings</h2>
          <p className="text-neutral-400 mt-1">Find your next career opportunity</p>
        </div>
        
        {/* Search and filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-neutral-500" />
            </div>
            <input
              type="text"
              placeholder="Search jobs by title, company or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>
          <div className="sm:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-neutral-500" />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none"
              >
                <option value="all">All Jobs</option>
                <option value="fulltime">Full-time</option>
                <option value="parttime">Part-time</option>
                <option value="remote">Remote</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Job listings */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader className="h-10 w-10 text-indigo-500 animate-spin mb-4" />
            <p className="text-neutral-400">Loading available positions...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.length === 0 ? (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-900/20 mb-4">
                  <Briefcase className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No job posts found</h3>
                <p className="text-neutral-400 max-w-md mx-auto">
                  We couldn't find any job listings matching your criteria. Try adjusting your search or check back later.
                </p>
              </div>
            ) : (
              filteredJobs.map((jobPost, index) => renderJobItem(jobPost, index))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobsWithErrorBoundary;