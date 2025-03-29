import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ApplicationDetailPage = () => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get(`/api/application/getapplications/${id}`, {

        });
        setApplication(response.data);
      } catch (error) {
        console.error("Error fetching application", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  return (
    <div className="application-detail">
      {loading ? (
        <p>Loading...</p>
      ) : application ? (
        <div>
          <h1>{application?.job?.title}</h1>
          <p>Status: {application?.status}</p>
          <p>
            Resume: 
            <a href={application?.resume} target="_blank" rel="noopener noreferrer">
              View
            </a>
          </p>
          {application?.coverLetter && (
            <p>
              Cover Letter: 
              <a href={application?.coverLetter} target="_blank" rel="noopener noreferrer">
                View
              </a>
            </p>
          )}
        </div>
      ) : (
        <p>No application found.</p>
      )}
    </div>
  );
};

export default ApplicationDetailPage;
