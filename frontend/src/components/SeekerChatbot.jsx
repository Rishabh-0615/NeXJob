import React, { useState } from "react";
import axios from "axios";
import "../styles/Chatbot.css";

const SeekerChatbot = () => {
  const [careerGoal, setCareerGoal] = useState("");
  const [currentSkills, setCurrentSkills] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateRoadmap = async () => {
    // Basic front-end validation
    if (!careerGoal.trim() || !currentSkills.trim()) {
      setError("Please provide both a career goal and your current skills.");
      return;
    }
    
    setLoading(true);
    setError("");
    setRoadmap(null);

    try {
      console.log("🟢 Sending Request to AI:", { careerGoal, currentSkills });

      const response = await axios.post(
        "http://localhost:5173/api/chatbot/roadmap",
        { careerGoal, currentSkills },
        { withCredentials: true }
      );

      console.log("🟢 Response Received:", response.data);
      setRoadmap(response.data);
    } catch (error) {
      console.error("❌ Error generating roadmap", error);
      setError(
        error.response?.data?.error || 
        "Failed to generate roadmap. Please try again with a specific career goal."
      );
    }

    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      <h2>AI Roadmap Generator</h2>
      <p className="instruction">Enter a specific career goal and your current skills to get a personalized learning roadmap.</p>

      <div className="input-group">
        <label htmlFor="career-goal">Career Goal:</label>
        <input
          id="career-goal"
          type="text"
          placeholder="e.g., Frontend Developer, Data Scientist, UX Designer"
          value={careerGoal}
          onChange={(e) => setCareerGoal(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="current-skills">Current Skills:</label>
        <input
          id="current-skills"
          type="text"
          placeholder="e.g., HTML, CSS, basic JavaScript, Figma"
          value={currentSkills}
          onChange={(e) => setCurrentSkills(e.target.value)}
        />
      </div>

      <button 
        onClick={handleGenerateRoadmap} 
        disabled={loading || !careerGoal.trim() || !currentSkills.trim()}
      >
        {loading ? "Generating..." : "Get Roadmap"}
      </button>

      {error && <p className="error-message">{error}</p>}

      {roadmap && (
        <div className="roadmap-output">
          <h3>Roadmap for {roadmap.careerGoal}</h3>

          <div className="roadmap-list">
            {Array.isArray(roadmap.steps) && roadmap.steps.length > 0 ? (
              roadmap.steps.map((step, index) => (
                <div key={index} className="roadmap-step">
                  <h4>Step {index + 1}: {step.title}</h4>
                  <p className="step-description">{step.description}</p>

                  {Array.isArray(step.substeps) && step.substeps.length > 0 && (
                    <ul className="substeps-list">
                      {step.substeps.map((substep, subIndex) => (
                        <li key={subIndex}>
                          <strong>{substep.title}:</strong> {substep.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <p className="error-message">⚠️ No roadmap steps available.</p>
            )}
          </div>

          {roadmap.resources && Array.isArray(roadmap.resources) && roadmap.resources.length > 0 && (
            <div className="resources">
              <h4>📚 Recommended Resources:</h4>
              <ul className="resources-list">
                {roadmap.resources.map((resource, index) => (
                  <li key={index}>
                    {resource.url ? (
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        {resource.name}
                      </a>
                    ) : (
                      resource.name
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SeekerChatbot;