import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MonacoEditor from "@monaco-editor/react";
import JitsiMeet from "./JitsiMeet";
import { io } from "socket.io-client";
import axios from "axios";

const InterviewRoom = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState("// Start coding here...");
  const [language, setLanguage] = useState("javascript");
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [socket, setSocket] = useState(null);
  const [notes, setNotes] = useState("");
  const [feedback, setFeedback] = useState("");
  
  // Available programming languages
  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" }
  ];

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:5001");
    setSocket(newSocket);
    
    // Fetch interview details
    const fetchInterviewDetails = async () => {
      try {
        const response = await axios.get(`/api/interview/details/${interviewId}`, {
          withCredentials: true
        });
        setInterviewDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching interview details:", err);
        setError("Failed to load interview details. The interview may not exist or you may not have permission to access it.");
        setLoading(false);
      }
    };
    
    fetchInterviewDetails();
    
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [interviewId]);

  // Join room and set up socket events once socket is initialized
  useEffect(() => {
    if (!socket) return;
    
    socket.emit("join-room", interviewId);
    
    socket.on("code-update", (newCode) => {
      setCode(newCode);
    });
    
    socket.on("language-change", (newLanguage) => {
      setLanguage(newLanguage);
    });
    
    socket.on("notes-update", (newNotes) => {
      setNotes(newNotes);
    });
    
    return () => {
      socket.off("code-update");
      socket.off("language-change");
      socket.off("notes-update");
    };
  }, [socket, interviewId]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (socket) {
      socket.emit("code-update", { interviewId, code: newCode });
    }
  };
  
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    if (socket) {
      socket.emit("language-change", { interviewId, language: newLanguage });
    }
  };
  
  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    if (socket) {
      socket.emit("notes-update", { interviewId, notes: newNotes });
    }
  };
  
  const handleFinishInterview = async () => {
    try {
      await axios.put(`/api/interview/update-status/${interviewId}`, {
        status: "Completed",
        feedback
      }, { withCredentials: true });
      
      alert("Interview completed successfully!");
      navigate("/dashboard"); // Navigate back to dashboard
    } catch (err) {
      console.error("Error completing interview:", err);
      alert("Failed to complete interview. Please try again.");
    }
  };
  
  if (loading) {
    return <div className="p-8 text-center">Loading interview room...</div>;
  }
  
  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-red-500 text-xl mb-4">Error</h2>
        <p>{error}</p>
        <button 
          onClick={() => navigate("/dashboard")}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="interview-container p-4">
      <div className="mb-4 bg-gray-100 p-4 rounded">
        <h1 className="text-xl font-bold mb-2">Interview Session</h1>
        {interviewDetails && (
          <div className="text-sm">
            <p><span className="font-semibold">Job:</span> {interviewDetails.jobTitle}</p>
            <p><span className="font-semibold">Candidate:</span> {interviewDetails.candidateName}</p>
            <p><span className="font-semibold">Interviewer:</span> {interviewDetails.recruiterName}</p>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="video-section">
          <h2 className="text-lg font-semibold mb-2">Video Conference</h2>
          <JitsiMeet roomName={interviewId} />
        </div>
        
        <div className="code-section">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Coding Exercise</h2>
            <select 
              value={language}
              onChange={handleLanguageChange}
              className="border rounded px-2 py-1"
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
          </div>
          
          <MonacoEditor
            height="400px"
            language={language}
            value={code}
            onChange={handleCodeChange}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14
            }}
          />
        </div>
      </div>
      
      <div className="notes-section mt-4">
        <h2 className="text-lg font-semibold mb-2">Interview Notes</h2>
        <textarea
          value={notes}
          onChange={handleNotesChange}
          className="w-full border rounded p-2 h-32"
          placeholder="Take notes during the interview (shared in real-time)..."
        />
      </div>
      
      <div className="feedback-section mt-4">
        <h2 className="text-lg font-semibold mb-2">Interview Feedback (Private)</h2>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full border rounded p-2 h-32"
          placeholder="Enter feedback about the candidate (only visible to you)..."
        />
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleFinishInterview}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Complete Interview
        </button>
      </div>
    </div>
  );
};

export default InterviewRoom;