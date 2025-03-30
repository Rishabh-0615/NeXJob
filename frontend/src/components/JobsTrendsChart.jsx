import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const JobTrendsChart = () => {
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    axios.get("/api/")
      .then(response => setJobData(response.data))
      .catch(error => console.error("Error fetching jobs:", error));
  }, []);

  // Process data for chart
  const locations = jobData.map(job => job.location);
  const salaries = jobData.map(job => parseInt(job.salary.replace(/[^\d]/g, "")) || 0);

  const data = {
    labels: locations,
    datasets: [
      {
        label: "Average Salary",
        data: salaries,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      }
    ]
  };

  return (
    <div>
      <h2>📊 Job Market Insights</h2>
      <Bar data={data} />
    </div>
  );
};

export default JobTrendsChart;
