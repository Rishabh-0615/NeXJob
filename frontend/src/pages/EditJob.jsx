import React, { useEffect, useState } from "react";
import { getJobById, updateJobPost } from "../services/jobService";
import JobForm from "../components/JobForm";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(id);
        setJobData(response.data);
      } catch (error) {
        toast.error("Failed to load job details");
      }
    };
    fetchJob();
  }, [id]);

   const [btnLoading, setBtnLoading] = useState(false)
    const LoadingAnimation = () => (
      <div className="flex justify-center items-center">
        <div className="spinner border-t-transparent border-4 border-violet-500 rounded-full w-6 h-6 animate-spin"></div>
      </div>
    );

  const handleSubmit = async (updatedData) => {
    setBtnLoading(true)
    try {
      await updateJobPost(id, updatedData);
      toast.success("Job updated successfully!");
      navigate("/myjobs");
      setBtnLoading(false)
    } catch (error) {
      toast.error("Failed to update job");
      setBtnLoading(false)

    }
  };

  return jobData ? <JobForm initialData={jobData} onSubmit={handleSubmit} /> : <LoadingAnimation/>;
};

export default EditJob;
