import React, { useEffect, useState } from "react";
import axios from "axios";

const InterviewList = () => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get(`/api/application/getstatus/${Interview}`);
        setInterviews(response.data);
      } catch (error) {
        console.error("Error fetching interviews", error);
      }
    };

    fetchInterviews();
  }, []);

  return (
    <div>
      <h2>Scheduled Interviews</h2>
      {interviews.length === 0 ? <p>No interviews scheduled.</p> : (
        <ul>
          {interviews.map((interview) => (
            <li key={interview._id}>
              Candidate ID: {interview.candidateId} | Job ID: {interview.jobId}
              <br />
              <a href={interview.interviewLink} target="_blank" rel="noopener noreferrer">Join Interview</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InterviewList;
