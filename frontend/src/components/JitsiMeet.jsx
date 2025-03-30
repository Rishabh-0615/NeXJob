import React from "react";

const JitsiMeet = ({ roomName }) => {
  return (
    <iframe
      src={`https://meet.jit.si/${roomName}`}
      allow="camera; microphone; fullscreen; display-capture"
      style={{ width: "100%", height: "500px", border: "none" }}
    />
  );
};

export default JitsiMeet;
