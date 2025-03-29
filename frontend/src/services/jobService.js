import axios from "axios";

export const getMyJobs = () => axios.get("/api/jobPost/myJob");
export const getJobById = (id) => axios.get(`/api/jobPost/getJob/${id}`);
export const updateJobPost = (id, data) => axios.put(`/api/jobPost/updateJob/${id}`, data);
export const deleteJobPost = (id) => axios.delete(`/api/jobPost/delete/${id}`);
