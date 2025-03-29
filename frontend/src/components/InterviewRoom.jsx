import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MonacoEditor from "@monaco-editor/react";
import JitsiMeet from "./JitsiMeet"; 
import { io } from "socket.io-client";

const InterviewRoom = () => {
  const { interviewId } = useParams();
  const [code, setCode] = useState("// Start coding here...");
  const socket = io("http://localhost:5001");

  useEffect(() => {
    socket.emit("join-room", interviewId);

    socket.on("code-update", (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.disconnect();
    };
  }, [interviewId, socket]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("code-update", { interviewId, code: newCode });
  };

  return (
    <div className="interview-container">
      <JitsiMeet roomName={interviewId} />
      <MonacoEditor
        height="500px"
        language="cpp"
        value={code}
        onChange={handleCodeChange}
      />
    </div>
  );
};

export default InterviewRoom;
