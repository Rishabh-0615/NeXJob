import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  salary: String,
});

export default mongoose.model("Job", JobSchema);
