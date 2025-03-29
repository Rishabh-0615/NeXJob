import React from "react";

const StatsSummary = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800">Total</h3>
        <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700">Applied</h3>
        <p className="text-2xl font-bold text-gray-800">{stats.applied}</p>
      </div>
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-700">Shortlisted</h3>
        <p className="text-2xl font-bold text-yellow-800">{stats.shortlisted}</p>
      </div>
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-700">Interview</h3>
        <p className="text-2xl font-bold text-purple-800">{stats.interview}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-green-700">Hired</h3>
        <p className="text-2xl font-bold text-green-800">{stats.hired}</p>
      </div>
      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-red-700">Rejected</h3>
        <p className="text-2xl font-bold text-red-800">{stats.rejected}</p>
      </div>
    </div>
  );
};

export default StatsSummary;