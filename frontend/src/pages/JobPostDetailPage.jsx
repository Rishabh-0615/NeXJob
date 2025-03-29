import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ApplyButton from "../components/ApplyButton";

const JobPostDetailPage = () => {
  const [jobPost, setJobPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchJobPost = async () => {
      try {
        const response = await axios.get(`/api/jobPost/getJob/${id}`);
        setJobPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job post", error);
        setLoading(false);
      }
    };

    fetchJobPost();
  }, [id]);

  return (
    <div className="job-post-detail">
      {loading ? (
        <p>Loading...</p>
      ) : (
        jobPost && (
          <div>
            <h1>{jobPost.title}</h1>
            <p>{jobPost.description}</p>
            <h3>Skills: {jobPost.skills.join(", ")}</h3>
            <p>Location: {jobPost.location.city}, {jobPost.location.country}</p>
            <ApplyButton jobId={jobPost._id} />
          </div>
        )
      )}
    </div>
  );
};

export default JobPostDetailPage;
