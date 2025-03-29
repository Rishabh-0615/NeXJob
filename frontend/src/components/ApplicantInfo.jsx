import React from "react";

const ApplicantInfo = ({ applicant }) => {
  if (!applicant) return (
    <div className="bg-gray-50 border rounded p-4">
      <p className="text-gray-500">No applicant information available</p>
    </div>
  );

  return (
    <div className="bg-gray-50 border rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Applicant Information</h2>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="font-medium">{applicant.name}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{applicant.email}</p>
        </div>
        
        {applicant.phone && (
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{applicant.phone}</p>
          </div>
        )}
        
        {applicant.location && (
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium">{applicant.location}</p>
          </div>
        )}
        
        {applicant.linkedIn && (
          <div>
            <p className="text-sm text-gray-500">LinkedIn</p>
            <a 
              href={applicant.linkedIn} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              {applicant.linkedIn.replace(/^https?:\/\/(www\.)?linkedin\.com\//, '')}
            </a>
          </div>
        )}
        
        {applicant.portfolio && (
          <div>
            <p className="text-sm text-gray-500">Portfolio</p>
            <a 
              href={applicant.portfolio} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              {applicant.portfolio.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantInfo;