import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import '../styles/market.css';

const JobMarketDashboard = () => {
  const [jobData, setJobData] = useState({
    locationDemand: [],
    salaryByLocation: [],
    experienceDistribution: [],
    industryDistribution: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days');
  const [selectedLocation, setSelectedLocation] = useState('All India');

  // Hardcoded data for Role Demand
  const roleDemandData = [
    { role: 'Software Engineer', demand: 1245 },
    { role: 'Data Scientist', demand: 892 },
    { role: 'Product Manager', demand: 756 },
    { role: 'UX Designer', demand: 543 },
    { role: 'DevOps Engineer', demand: 687 },
    { role: 'Cloud Architect', demand: 512 }
  ];

  // Hardcoded data for Skill Demand
  const skillDemandData = [
    { skill: 'JavaScript', demand: 1560 },
    { skill: 'Python', demand: 1340 },
    { skill: 'React', demand: 1120 },
    { skill: 'AWS', demand: 980 },
    { skill: 'Machine Learning', demand: 870 },
    { skill: 'SQL', demand: 1250 }
  ];

  useEffect(() => {
    fetchJobMarketData();
  }, [selectedTimeframe, selectedLocation]);

  const fetchJobMarketData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/job-market-data', {
        params: {
          timeframe: selectedTimeframe,
          location: selectedLocation
        }
      });
      setJobData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching job market data:', err);
      setJobData({
        locationDemand: [
          { location: 'Bangalore', job_count: 1520 },
          { location: 'Hyderabad', job_count: 1250 },
          { location: 'Mumbai', job_count: 980 },
          { location: 'Delhi NCR', job_count: 1750 },
          { location: 'Pune', job_count: 820 }
        ],
        salaryByLocation: [
          { location: 'Bangalore', avg_salary: 12.8 },
          { location: 'Hyderabad', avg_salary: 11.5 },
          { location: 'Mumbai', avg_salary: 13.2 },
          { location: 'Delhi NCR', avg_salary: 12.9 },
          { location: 'Pune', avg_salary: 10.7 }
        ],
        experienceDistribution: [
          { experience: '0-2 years', count: 1250 },
          { experience: '2-5 years', count: 1850 },
          { experience: '5-10 years', count: 920 },
          { experience: '10+ years', count: 430 }
        ],
        industryDistribution: [
          { industry: 'IT Services', count: 2250 },
          { industry: 'Finance', count: 850 },
          { industry: 'Healthcare', count: 650 },
          { industry: 'E-commerce', count: 1250 },
          { industry: 'Education', count: 450 }
        ],
        timestamp: new Date().toLocaleString(),
        totalJobs: 5450
      });
      setError('Failed to load job market data. Showing sample data.');
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  const BAR_COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  if (loading) {
    return <div className="loading">Loading job market data...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Indian Job Market Trends Dashboard</h1>
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="location">Location:</label>
            <select 
              id="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="filter-select"
            >
              <option value="All India">All India</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Timeframe:</label>
            <div className="timeframe-buttons">
              <button 
                className={`timeframe-btn ${selectedTimeframe === '30days' ? 'active' : ''}`}
                onClick={() => setSelectedTimeframe('30days')}
              >
                30 Days
              </button>
              <button 
                className={`timeframe-btn ${selectedTimeframe === '90days' ? 'active' : ''}`}
                onClick={() => setSelectedTimeframe('90days')}
              >
                90 Days
              </button>
              <button 
                className={`timeframe-btn ${selectedTimeframe === '1year' ? 'active' : ''}`}
                onClick={() => setSelectedTimeframe('1year')}
              >
                1 Year
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {error && <div className="error-notice">{error}</div>}
      
      <div className="dashboard-grid">
        {/* Job Demand by City */}
        <div className="dashboard-card">
          <h2>Job Demand by City</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobData.locationDemand}>
                <XAxis 
                  dataKey="location" 
                  tick={{ fill: '#E5E7EB' }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <YAxis 
                  tick={{ fill: '#E5E7EB' }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    borderColor: '#4B5563',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Bar 
                  dataKey="job_count" 
                  fill={BAR_COLORS[0]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* HARDCODED Role Demand */}
        <div className="dashboard-card">
          <h2>Role Demand</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={roleDemandData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <XAxis 
                  dataKey="role" 
                  tick={{ fill: '#E5E7EB', fontSize: 12 }}
                  axisLine={{ stroke: '#4B5563' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tick={{ fill: '#E5E7EB', fontSize: 12 }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    borderColor: '#4B5563',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Bar 
                  dataKey="demand" 
                  fill={BAR_COLORS[1]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Salary by Location */}
        <div className="dashboard-card">
          <h2>Salary by Location (LPA)</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobData.salaryByLocation}>
                <XAxis 
                  dataKey="location" 
                  tick={{ fill: '#E5E7EB' }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <YAxis 
                  tick={{ fill: '#E5E7EB' }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    borderColor: '#4B5563',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Bar 
                  dataKey="avg_salary" 
                  fill={BAR_COLORS[2]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* HARDCODED Skill Demand */}
        <div className="dashboard-card">
          <h2>Skill Demand</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie 
                  data={skillDemandData} 
                  dataKey="demand" 
                  nameKey="skill" 
                  cx="50%" 
                  cy="50%"
                  outerRadius={100}
                  innerRadius={40}
                  paddingAngle={5}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {skillDemandData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend 
                  layout="vertical" 
                  align="right" 
                  verticalAlign="middle"
                  wrapperStyle={{ color: '#E5E7EB', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    borderColor: '#4B5563',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                  formatter={(value, name, props) => [`${value}`, props.payload.skill]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Experience Distribution */}
        <div className="dashboard-card">
          <h2>Experience Distribution</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobData.experienceDistribution}>
                <XAxis 
                  dataKey="experience" 
                  tick={{ fill: '#E5E7EB' }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <YAxis 
                  tick={{ fill: '#E5E7EB' }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    borderColor: '#4B5563',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill={BAR_COLORS[3]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Industry Distribution */}
        <div className="dashboard-card">
          <h2>Industry Distribution</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie 
                  data={jobData.industryDistribution} 
                  dataKey="count" 
                  nameKey="industry" 
                  cx="50%" 
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {jobData.industryDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend 
                  layout="vertical" 
                  align="right" 
                  verticalAlign="middle"
                  wrapperStyle={{ color: '#E5E7EB' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    borderColor: '#4B5563',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="dashboard-footer">
        <p>Data last updated: {jobData.timestamp || 'Unknown'}</p>
        <p>Total jobs analyzed: {jobData.totalJobs?.toLocaleString() || '0'}</p>
      </div>
    </div>
  );
};

export default JobMarketDashboard;