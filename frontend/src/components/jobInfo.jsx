// JobInfo.jsx
import React from "react";

const JobInfo = ({ job }) => {
  if (!job) return (
    <div className="bg-gray-50 border rounded p-4">
      <p className="text-gray-500">No job information available</p>
    </div>
  );

  return (
    <div className="bg-gray-50 border rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Job Details</h2>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Position</p>
          <p className="font-medium">{job.title}</p>
        </div>
        
        {job.company && (
          <div>
            <p className="text-sm text-gray-500">Company</p>
            <p className="font-medium">{job.company.name}</p>
          </div>
        )}
        
        <div>
          <p className="text-sm text-gray-500">Job Type</p>
          <p className="font-medium">{job.jobType}</p>
        </div>
        
        {job.location && (
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium">
              {job.location.type}
              {job.location.city && ` · ${job.location.city}`}
              {job.location.country && `, ${job.location.country}`}
            </p>
          </div>
        )}
        
        {job.industry && (
          <div>
            <p className="text-sm text-gray-500">Industry</p>
            <p className="font-medium">{job.industry}</p>
          </div>
        )}
        
        {job.compensation && (
          <div>
            <p className="text-sm text-gray-500">Compensation</p>
            <p className="font-medium">
              {job.compensation.salary?.min && job.compensation.salary?.max 
                ? `$${job.compensation.salary.min.toLocaleString()} - $${job.compensation.salary.max.toLocaleString()}`
                : job.compensation.salary?.min 
                  ? `From $${job.compensation.salary.min.toLocaleString()}`
                  : job.compensation.salary?.max
                    ? `Up to $${job.compensation.salary.max.toLocaleString()}`
                    : "Not specified"
              }
              {job.compensation.isNegotiable && " (Negotiable)"}
            </p>
          </div>
        )}
        
        {job.eligibility && (
          <>
            <div>
              <p className="text-sm text-gray-500">Hiring For</p>
              <p className="font-medium">{job.eligibility.hiringFor}</p>
            </div>
            
            {job.eligibility.minExperience !== undefined && (
              <div>
                <p className="text-sm text-gray-500">Experience Required</p>
                <p className="font-medium">
                  {job.eligibility.maxExperience 
                    ? `${job.eligibility.minExperience} - ${job.eligibility.maxExperience} years`
                    : `Minimum ${job.eligibility.minExperience} years`
                  }
                </p>
              </div>
            )}
            
            {job.eligibility.education && job.eligibility.education.length > 0 && (
              <div>
                <p className="text-sm text-gray-500">Education</p>
                <ul className="list-disc list-inside">
                  {job.eligibility.education.map((edu, index) => (
                    <li key={index} className="font-medium">
                      {Array.isArray(edu.degree) 
                        ? edu.degree.join(', ')
                        : edu.degree
                      }
                      {edu.field && Array.isArray(edu.field) && edu.field.length > 0 && 
                        ` in ${edu.field.join(', ')}`
                      }
                      {edu.minPercentage && Array.isArray(edu.minPercentage) && edu.minPercentage.length > 0 && 
                        ` (Min. ${edu.minPercentage[0]}%)`
                      }
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        
        {job.skills && job.skills.length > 0 && (
          <div>
            <p className="text-sm text-gray-500">Required Skills</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {job.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {job.deadline && (
          <div>
            <p className="text-sm text-gray-500">Application Deadline</p>
            <p className="font-medium">
              {new Date(job.deadline).toLocaleDateString()}
            </p>
          </div>
        )}
        
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className={`font-medium ${
            job.status === "Published" 
              ? "text-green-600" 
              : job.status === "Closed" 
                ? "text-red-600" 
                : "text-yellow-600"
          }`}>
            {job.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobInfo;