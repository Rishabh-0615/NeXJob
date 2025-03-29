import axios from "axios";

const API = axios.create({ baseURL: "/api/application" });

export const getAllJobApplications = async () => {
  const res = await API.get("/getAll");
  return res.data;
};

export const getJobApplications = async (jobId) => {
  const res = await API.get(`/jobapplicants/${jobId}`);
  return res.data;
};

export const getJobApplicationById = async (id) => {
  const res = await API.get(`/jobapplicantsId/${id}`);
  return res.data;
};

export const updateApplicationStatus = async (id, status) => {
  try {
    const res = await API.patch(`/status/${id}`, { status });
    return res.data;
  } catch (error) {
    console.error("API Error updating status:", error);
    throw error;
  }
};

