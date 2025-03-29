import React from "react";

const JobApplicationsList = ({ applications, onRowClick }) => {
  if (!applications || applications.length === 0) {
    return (
      <div className="bg-gray-50 border rounded p-8 text-center">
        <p className="text-gray-500">No applications found.</p>
      </div>
    );
  }

  const getStatusBadgeClass = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
    const statusClasses = {
      "Applied": "bg-blue-100 text-blue-800",
      "Shortlisted": "bg-yellow-100 text-yellow-800",
      "Interview": "bg-purple-100 text-purple-800",
      "Hired": "bg-green-100 text-green-800",
      "Rejected": "bg-red-100 text-red-800"
    };
    
    return `${baseClasses} ${statusClasses[status] || "bg-gray-100 text-gray-800"}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applicant
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applied Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((app) => (
            <tr 
              key={app._id} 
              onClick={() => onRowClick(app._id)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {app.applicant?.name || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {app.applicant?.email || "N/A"}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{app.job?.title || "Unknown Job"}</div>
                <div className="text-xs text-gray-500">{app.job?.company?.name || "Unknown Company"}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {new Date(app.appliedAt).toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(app.appliedAt).toLocaleTimeString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={getStatusBadgeClass(app.status)}>
                  {app.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobApplicationsList;