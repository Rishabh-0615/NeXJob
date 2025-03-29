import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Link as LinkIcon,
  Calendar,
  Award,
  MapPin,
  Edit2,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  Save,
  X,
  FileText,
} from "lucide-react";
import ResumeBuilder from "../components/ResumeBuilder";
import { toast } from "react-toastify";

const JobseekerProfile = () => {
  // State for profile data
  const [profile, setProfile] = useState({
    name: "",
    mobile: "",
    email: "",
    skills: [],
    experienceLevel: "",
    education: [],
    portfolioURL: "",
    experience: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [activeSection, setActiveSection] = useState("all");
  const [editMode, setEditMode] = useState(false);

  // Education form state
  const [educationForm, setEducationForm] = useState({
    degree: "",
    institution: "",
    startDate: "",
    endDate: "",
    grade: "",
  });
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [editingEducationIndex, setEditingEducationIndex] = useState(-1);

  // Experience form state
  const [experienceForm, setExperienceForm] = useState({
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [editingExperienceIndex, setEditingExperienceIndex] = useState(-1);

  // Experience levels for dropdown
  const experienceLevels = [
    "Fresher",
    "Junior",
    "Mid-level",
    "Senior",
    "Expert",
  ];

  // Fetch profile data
  const [name, setName] = useState("");
  const fetchProfile = async () => {
    console.log("Fetch profile function called");
    setLoading(true);
    try {
      const response = await axios.get("/api/user/profile");
      console.log("API Response:", response);

      if (response.data && response.data.profile) {
        console.log("Profile data:", response.data.profile);
        setProfile(response.data.profile);
        if (response.data.profile.name) {
          setName(response.data.profile.name);
        }
      } else {
        console.log("Unexpected response structure:", response.data);
        setError("Unexpected data format received from server");
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Use effect running");
    fetchProfile();
  }, []);

  // Handle skill addition
  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  // Handle skill removal
  const handleRemoveSkill = (skillToRemove) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  // Handle education form
  const handleEducationFormChange = (e) => {
    const { name, value } = e.target;
    setEducationForm({
      ...educationForm,
      [name]: value,
    });
  };

  // Handle education submission
  const handleEducationSubmit = () => {
    if (editingEducationIndex >= 0) {
      // Update existing education
      const updatedEducation = [...profile.education];
      updatedEducation[editingEducationIndex] = educationForm;
      setProfile({
        ...profile,
        education: updatedEducation,
      });
    } else {
      // Add new education
      setProfile({
        ...profile,
        education: [...profile.education, educationForm],
      });
    }

    // Reset form
    setEducationForm({
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      grade: "",
    });
    setShowEducationForm(false);
    setEditingEducationIndex(-1);
  };

  // Edit education
  const handleEditEducation = (index) => {
    setEducationForm(profile.education[index]);
    setEditingEducationIndex(index);
    setShowEducationForm(true);
  };

  // Remove education
  const handleRemoveEducation = (index) => {
    setProfile({
      ...profile,
      education: profile.education.filter((_, i) => i !== index),
    });
  };

  // Handle experience form
  const handleExperienceFormChange = (e) => {
    const { name, value } = e.target;
    setExperienceForm({
      ...experienceForm,
      [name]: value,
    });
  };

  // Handle experience submission
  const handleExperienceSubmit = () => {
    if (editingExperienceIndex >= 0) {
      // Update existing experience
      const updatedExperience = [...profile.experience];
      updatedExperience[editingExperienceIndex] = experienceForm;
      setProfile({
        ...profile,
        experience: updatedExperience,
      });
    } else {
      // Add new experience
      setProfile({
        ...profile,
        experience: [...profile.experience, experienceForm],
      });
    }

    // Reset form
    setExperienceForm({
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setShowExperienceForm(false);
    setEditingExperienceIndex(-1);
  };

  // Edit experience
  const handleEditExperience = (index) => {
    setExperienceForm(profile.experience[index]);
    setEditingExperienceIndex(index);
    setShowExperienceForm(true);
  };

  // Remove experience
  const handleRemoveExperience = (index) => {
    setProfile({
      ...profile,
      experience: profile.experience.filter((_, i) => i !== index),
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Present";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    try {
      setLoading(true);

      // Extract userId from auth or context if needed
      // For now using the name field as userId based on your backend code
      const userData = {
        userId: profile.name, // This should be replaced with actual userId from auth
        skills: profile.skills,
        experienceLevel: profile.experienceLevel,
        education: profile.education,
        portfolioURL: profile.portfolioURL,
        experience: profile.experience,
      };

      const response = await axios.put("/api/user/profile/update", userData);

      if (response.data.success) {
        console.log(
          "Profile updated successfully:",
          response.data.message,
          response.data.profile
        );
        setLoading(false);
        setEditMode(false);
      } else {
        throw new Error(response.data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Failed to save profile. Please try again.");
      setLoading(false);
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    // Refetch profile data to discard changes
    fetchProfile();
    setEditMode(false);
    setShowEducationForm(false);
    setShowExperienceForm(false);
  };

  const [showResumeBuilder, setShowResumeBuilder] = useState(false);

  if (showResumeBuilder) {
    return <ResumeBuilder onBack={() => setShowResumeBuilder(false)} />;
  }

  if (loading && !profile.name) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error && !profile.name) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-800/50 text-red-400 px-8 py-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-6">
      {/* Background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-60">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700 rounded-full filter blur-3xl opacity-10 transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-10 transform -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header with actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
              Profile
            </span>
          </h1>

          <div className="flex space-x-3">
            {editMode ? (
              <>
                <button
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Edit2 size={16} className="mr-2" />
                  Edit Profile
                </button>
                <button
                  onClick={() => setShowResumeBuilder(true)}
                  className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  <FileText size={16} className="mr-2" />
                  Build Resume
                </button>
              </>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-6 border-b border-slate-800">
          <button
            onClick={() => setActiveSection("all")}
            className={`px-4 py-2 mr-2 whitespace-nowrap rounded-t-lg transition-colors ${
              activeSection === "all"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All Information
          </button>
          <button
            onClick={() => setActiveSection("personal")}
            className={`px-4 py-2 mr-2 whitespace-nowrap rounded-t-lg transition-colors ${
              activeSection === "personal"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveSection("education")}
            className={`px-4 py-2 mr-2 whitespace-nowrap rounded-t-lg transition-colors ${
              activeSection === "education"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveSection("experience")}
            className={`px-4 py-2 mr-2 whitespace-nowrap rounded-t-lg transition-colors ${
              activeSection === "experience"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => setActiveSection("skills")}
            className={`px-4 py-2 mr-2 whitespace-nowrap rounded-t-lg transition-colors ${
              activeSection === "skills"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Skills
          </button>
        </div>

        {/* Main content with sections */}
        <div className="grid gap-6">
          {/* Personal Information Section */}
          {(activeSection === "all" || activeSection === "personal") && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-6">
                <User size={20} className="text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold text-white">
                  Personal Information
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Full Name
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-white text-lg">{profile.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Email Address
                  </label>
                  {editMode ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Mail size={16} className="text-slate-500 mr-2" />
                      <p className="text-white">{profile.email}</p>
                    </div>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Mobile Number
                  </label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={profile.mobile}
                      onChange={(e) =>
                        setProfile({ ...profile, mobile: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Phone size={16} className="text-slate-500 mr-2" />
                      <p className="text-white">{profile.mobile}</p>
                    </div>
                  )}
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Experience Level
                  </label>
                  {editMode ? (
                    <select
                      value={profile.experienceLevel}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          experienceLevel: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Experience Level</option>
                      {experienceLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex items-center">
                      <Briefcase size={16} className="text-slate-500 mr-2" />
                      <p className="text-white">
                        {profile.experienceLevel || "Not specified"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Portfolio URL */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Portfolio URL
                  </label>
                  {editMode ? (
                    <input
                      type="url"
                      value={profile.portfolioURL}
                      onChange={(e) =>
                        setProfile({ ...profile, portfolioURL: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://your-portfolio.com"
                    />
                  ) : (
                    <div className="flex items-center">
                      <LinkIcon size={16} className="text-slate-500 mr-2" />
                      {profile.portfolioURL ? (
                        <a
                          href={profile.portfolioURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          {profile.portfolioURL}
                        </a>
                      ) : (
                        <p className="text-slate-500 italic">
                          No portfolio URL specified
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Skills Section */}
          {(activeSection === "all" || activeSection === "skills") && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-6">
                <Award size={20} className="text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold text-white">Skills</h2>
              </div>

              {/* Skills list */}
              <div className="mb-4">
                {profile.skills && profile.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-slate-800 px-3 py-1.5 rounded-full"
                      >
                        <span className="text-white">{skill}</span>
                        {editMode && (
                          <button
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-2 text-slate-400 hover:text-red-400 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 italic">No skills added yet</p>
                )}
              </div>

              {/* Add skill form */}
              {editMode && (
                <div className="flex items-center mt-4">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill"
                    className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                  />
                  <button
                    onClick={handleAddSkill}
                    className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Education Section */}
          {(activeSection === "all" || activeSection === "education") && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <GraduationCap size={20} className="text-blue-500 mr-2" />
                  <h2 className="text-xl font-semibold text-white">
                    Education
                  </h2>
                </div>

                {editMode && !showEducationForm && (
                  <button
                    onClick={() => {
                      setEducationForm({
                        degree: "",
                        institution: "",
                        startDate: "",
                        endDate: "",
                        grade: "",
                      });
                      setEditingEducationIndex(-1);
                      setShowEducationForm(true);
                    }}
                    className="flex items-center text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Education
                  </button>
                )}
              </div>

              {/* Education list */}
              {profile.education && profile.education.length > 0 ? (
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div
                      key={index}
                      className="border border-slate-800 rounded-lg p-4 hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h3 className="text-lg font-medium text-white">
                            {edu.degree}
                          </h3>
                          <p className="text-slate-400">{edu.institution}</p>
                          <div className="flex items-center mt-2 text-sm text-slate-500">
                            <Calendar size={14} className="mr-1" />
                            <span>
                              {formatDate(edu.startDate)} -{" "}
                              {formatDate(edu.endDate)}
                            </span>
                          </div>
                          {edu.grade && (
                            <p className="text-blue-400 mt-1 text-sm">
                              {edu.grade}
                            </p>
                          )}
                        </div>

                        {editMode && (
                          <div className="flex mt-4 md:mt-0">
                            <button
                              onClick={() => handleEditEducation(index)}
                              className="text-slate-400 hover:text-blue-400 p-1"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleRemoveEducation(index)}
                              className="text-slate-400 hover:text-red-400 p-1 ml-2"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">
                  No education history added yet
                </p>
              )}

              {/* Education form */}
              {editMode && showEducationForm && (
                <div className="mt-6 border border-slate-700 rounded-lg p-4 bg-slate-800/50">
                  <h3 className="text-lg font-medium text-white mb-4">
                    {editingEducationIndex >= 0
                      ? "Edit Education"
                      : "Add Education"}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">
                        Degree
                      </label>
                      <input
                        type="text"
                        name="degree"
                        value={educationForm.degree}
                        onChange={handleEducationFormChange}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Bachelor of Science"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">
                        Institution
                      </label>
                      <input
                        type="text"
                        name="institution"
                        value={educationForm.institution}
                        onChange={handleEducationFormChange}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="University name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={educationForm.startDate}
                        onChange={handleEducationFormChange}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={educationForm.endDate}
                        onChange={handleEducationFormChange}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-400 mb-1">
                        Grade/GPA
                      </label>
                      <input
                        type="text"
                        name="grade"
                        value={educationForm.grade}
                        onChange={handleEducationFormChange}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="3.8 GPA"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-4 space-x-3">
                    <button
                      onClick={() => setShowEducationForm(false)}
                      className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEducationSubmit}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      {editingEducationIndex >= 0 ? "Update" : "Add"} Education
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Experience Section */}
          {(activeSection === "all" || activeSection === "experience") && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Briefcase size={20} className="text-blue-500 mr-2" />
                  <h2 className="text-xl font-semibold text-white">
                    Work Experience
                  </h2>
                </div>

                {editMode && !showExperienceForm && (
                  <button
                    onClick={() => {
                      setExperienceForm({
                        jobTitle: "",
                        company: "",
                        location: "",
                        startDate: "",
                        endDate: "",
                        description: "",
                      });
                      setEditingExperienceIndex(-1);
                      setShowExperienceForm(true);
                    }}
                    className="flex items-center text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Experience
                  </button>
                )}
              </div>

              {/* Experience list */}
              {profile.experience && profile.experience.length > 0 ? (
                <div className="space-y-4">
                  {profile.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="border border-slate-800 rounded-lg p-4 hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-white">
                            {exp.jobTitle}
                          </h3>
                          <p className="text-slate-400">{exp.company}</p>
                          <div className="flex items-center mt-2 text-sm text-slate-500">
                            <MapPin size={14} className="mr-1" />
                            <span>{exp.location || "Remote"}</span>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-slate-500">
                            <Calendar size={14} className="mr-1" />
                            <span>
                              {formatDate(exp.startDate)} -{" "}
                              {formatDate(exp.endDate)}
                            </span>
                          </div>
                          {exp.description && (
                            <p className="mt-3 text-slate-300 text-sm">
                              {exp.description}
                            </p>
                          )}
                        </div>

                        {editMode && (
                          <div className="flex mt-4 md:mt-0">
                            <button
                              onClick={() => handleEditExperience(index)}
                              className="text-slate-400 hover:text-blue-400 p-1"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleRemoveExperience(index)}
                              className="text-slate-400 hover:text-red-400 p-1 ml-2"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">
                  No work experience added yet
                </p>
              )}

              {/* Experience form */}
              {editMode && showExperienceForm && (
                <div className="mt-6 border border-slate-700 rounded-lg p-4 bg-slate-800/50">
                  <h3 className="text-lg font-medium text-white mb-4">
                    {editingExperienceIndex >= 0
                      ? "Edit Experience"
                      : "Add Experience"}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">
                        Job Title
                      </label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={experienceForm.jobTitle}
                        onChange={handleExperienceFormChange}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Software Developer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={experienceForm.company}
                        onChange={handleExperienceFormChange}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={experienceForm.location}
                        onChange={handleExperienceFormChange}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="City, Country or Remote"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">
                          Start Date
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          value={experienceForm.startDate}
                          onChange={handleExperienceFormChange}
                          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">
                          End Date
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          value={experienceForm.endDate}
                          onChange={handleExperienceFormChange}
                          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Leave empty if current"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-400 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={experienceForm.description}
                        onChange={handleExperienceFormChange}
                        rows="4"
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe your responsibilities and achievements"
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4 space-x-3">
                    <button
                      onClick={() => setShowExperienceForm(false)}
                      className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleExperienceSubmit}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      {editingExperienceIndex >= 0 ? "Update" : "Add"}{" "}
                      Experience
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default JobseekerProfile;
