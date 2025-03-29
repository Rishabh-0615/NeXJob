import { createContext, useState, useEffect, useCallback } from "react";
import { getAllJobApplications, getJobApplications, updateApplicationStatus } from "../services/api";

export const JobApplicationContext = createContext();

export const JobApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    jobId: "",
  });


  useEffect(() => {
    fetchAllApplications();
  }, []);

  useEffect(() => {
    if (applications.length > 0) {
      applyFilters();
    }
  }, [filters, applications]);

  const fetchAllApplications = async () => {
    setLoading(true);
    try {
      const data = await getAllJobApplications();
      setApplications(data);
      setFilteredApplications(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching applications", error);
      setError("Failed to load applications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchJobApplications = useCallback(async (jobId) => {
    setLoading(true);
    try {
      const data = await getJobApplications(jobId);
      setApplications(data);
      setFilteredApplications(data);
      setFilters(prev => ({ ...prev, jobId }));
      setError(null);
    } catch (error) {
      console.error("Error fetching job applications", error);
      setError("Failed to load job applications. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = useCallback(async (applicationId, newStatus) => {
    try {
      await updateApplicationStatus(applicationId, newStatus);
      
      setApplications(prevApps => 
        prevApps.map(app => 
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      
      return { success: true };
    } catch (error) {
      console.error("Error updating application status", error);
      return { success: false, error: error.message };
    }
  }, []);

  const applyFilters = () => {
    let result = [...applications];
    
    if (filters.status) {
      result = result.filter(app => app.status === filters.status);
    }
    
    setFilteredApplications(result);
  };

  const setStatusFilter = (status) => {
    setFilters(prev => ({ ...prev, status }));
  };

  return (
    <JobApplicationContext.Provider 
      value={{ 
        applications: filteredApplications, 
        allApplications: applications,
        loading, 
        error,
        fetchJobApplications,
        fetchAllApplications,
        updateStatus,
        filters,
        setStatusFilter
      }}
    >
      {children}
    </JobApplicationContext.Provider>
  );
};