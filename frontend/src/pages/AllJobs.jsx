import React, { useEffect, useState } from "react";
import axios from "axios";
import JobPostCard from "../components/JobPostCard";

const AllJobs = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const response = await axios.get("/api/jobPost/getJob");
        setJobPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job posts", error);
        setLoading(false);
      }
    };

    fetchJobPosts();
  }, []);

  return (
    <div className="job-post-list">
      <h1>Job Listings</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {jobPosts.length === 0 ? (
            <p>No job posts found</p>
          ) : (
            jobPosts.map((jobPost) => (
              <JobPostCard key={jobPost._id} jobPost={jobPost} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllJobs;
