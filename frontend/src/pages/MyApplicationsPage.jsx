import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/api/application/getapplications");
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications", error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleWithdraw = async (applicationId) => {
    try {
      await axios.delete(`/api/application/withdraw/${applicationId}`);
      setApplications((prev) => prev.filter((app) => app._id !== applicationId));
    } catch (error) {
      console.error("Error withdrawing application", error);
    }
  };

  return (
    <div className="my-applications">
      <h1>My Applications</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {applications.length === 0 ? (
            <p>No applications found</p>
          ) : (
            applications.map((application) => (
              <div key={application._id} className="application-card">
                <h3>{application.job.title}</h3>
                <p>Status: {application.status}</p>
                <button onClick={() => handleWithdraw(application._id)}>
                  Withdraw
                </button>
                <Link to={`/application/${application._id}`}>View Details</Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyApplicationsPage;
