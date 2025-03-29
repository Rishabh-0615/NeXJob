import React, { useState } from "react";

const ResumeViewer = ({ resumeUrl }) => {
  const [loading, setLoading] = useState(true);

  // Determine file type (PDF, DOC, etc.)
  const getFileType = (url) => {
    if (!url) return null;
    const extension = url.split('.').pop().toLowerCase();
    return extension;
  };

  const fileType = getFileType(resumeUrl);
  
  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
  };

  if (!resumeUrl) {
    return (
      <div className="bg-gray-50 border rounded p-8 text-center">
        <p className="text-gray-500">No resume uploaded.</p>
      </div>
    );
  }

  // If it's a PDF, we can display it in an iframe
  if (fileType === 'pdf') {
    return (
      <div className="bg-gray-50 border rounded">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
        <iframe 
          src={resumeUrl} 
          className="w-full h-96"
          title="Resume Viewer" 
          onLoad={handleLoad}
          onError={handleError}
        ></iframe>
      </div>
    );
  }

  // For other file types, provide a download link
  return (
    <div className="bg-gray-50 border rounded p-8 text-center">
      <p className="mb-4">Resume file: {resumeUrl.split('/').pop()}</p>
      <a 
        href={resumeUrl} 
        download
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded inline-flex items-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
        </svg>
        Download Resume
      </a>
    </div>
  );
};

export default ResumeViewer;