import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Code,
  Award,
  Globe,
  Languages,
  Plus,
  Trash2,
  Save,
  Download,
  Eye,
  FileText,
  Edit2,
  ArrowLeft,
  LinkIcon,
} from "lucide-react";
import { toast } from "react-toastify";

const ResumeBuilder = ({ onBack }) => {
  const [resume, setResume] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    education: [],
    experience: [],
    skills: [{ category: "Technical Skills", items: [] }],
    projects: [],
    certifications: [],
    languages: [],
    template: "modern",
  });

  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");

  // Fetch existing resume data
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get("/api/resume", {
          withCredentials: true,
        });
        if (response.data) {
          console.log("Resume data received:", response.data);
          setResume(response.data);
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
        toast.error(
          error.response?.data?.message || "Failed to load resume data"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, []);

  // Handle personal info changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResume((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  // Handle education changes
  const handleEducationChange = (index, field, value) => {
    const newEducation = [...resume.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value,
    };
    setResume((prev) => ({ ...prev, education: newEducation }));
  };

  // Add new education entry
  const addEducation = () => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          grade: "",
        },
      ],
    }));
  };

  // Handle experience changes
  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...resume.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value,
    };
    setResume((prev) => ({ ...prev, experience: newExperience }));
  };

  // Add new experience entry
  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
          achievements: [],
        },
      ],
    }));
  };

  // Handle skills changes
  const handleSkillsChange = (categoryIndex, itemIndex, value) => {
    const newSkills = [...resume.skills];
    newSkills[categoryIndex].items[itemIndex] = value;
    setResume((prev) => ({ ...prev, skills: newSkills }));
  };

  // Add new skill
  const addSkill = (categoryIndex) => {
    const newSkills = [...resume.skills];
    newSkills[categoryIndex].items.push("");
    setResume((prev) => ({ ...prev, skills: newSkills }));
  };

  // Handle project changes
  const handleProjectChange = (index, field, value) => {
    const newProjects = [...resume.projects];
    newProjects[index] = {
      ...newProjects[index],
      [field]: value,
    };
    setResume((prev) => ({ ...prev, projects: newProjects }));
  };

  // Add new project
  const addProject = () => {
    setResume((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: "",
          description: "",
          technologies: [],
          startDate: "",
          endDate: "",
          link: "",
        },
      ],
    }));
  };

  // Handle certification changes
  const handleCertificationChange = (index, field, value) => {
    const newCertifications = [...resume.certifications];
    newCertifications[index] = {
      ...newCertifications[index],
      [field]: value,
    };
    setResume((prev) => ({ ...prev, certifications: newCertifications }));
  };

  // Add new certification
  const addCertification = () => {
    setResume((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: "",
          issuer: "",
          date: "",
          credentialId: "",
          link: "",
        },
      ],
    }));
  };

  // Handle language changes
  const handleLanguageChange = (index, field, value) => {
    const newLanguages = [...resume.languages];
    newLanguages[index] = {
      ...newLanguages[index],
      [field]: value,
    };
    setResume((prev) => ({ ...prev, languages: newLanguages }));
  };

  // Add new language
  const addLanguage = () => {
    setResume((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          name: "",
          proficiency: "",
        },
      ],
    }));
  };

  // Save resume
  const handleSave = async () => {
    try {
      await axios.post("/api/resume", resume);
      toast.success("Resume saved successfully!");
    } catch (error) {
      toast.error("Error saving resume");
      console.error("Error saving resume:", error);
    }
  };

  // Download resume as PDF
  const handleDownload = () => {
    // TODO: Implement PDF generation
    toast.info("PDF download feature coming soon!");
  };

  // Add delete handlers for each section
  const deleteEducation = (index) => {
    const newEducation = resume.education.filter((_, i) => i !== index);
    setResume((prev) => ({ ...prev, education: newEducation }));
  };

  const deleteExperience = (index) => {
    const newExperience = resume.experience.filter((_, i) => i !== index);
    setResume((prev) => ({ ...prev, experience: newExperience }));
  };

  const deleteSkill = (categoryIndex, itemIndex) => {
    const newSkills = [...resume.skills];
    newSkills[categoryIndex].items = newSkills[categoryIndex].items.filter(
      (_, i) => i !== itemIndex
    );
    setResume((prev) => ({ ...prev, skills: newSkills }));
  };

  const deleteProject = (index) => {
    const newProjects = resume.projects.filter((_, i) => i !== index);
    setResume((prev) => ({ ...prev, projects: newProjects }));
  };

  const deleteCertification = (index) => {
    const newCertifications = resume.certifications.filter(
      (_, i) => i !== index
    );
    setResume((prev) => ({ ...prev, certifications: newCertifications }));
  };

  const deleteLanguage = (index) => {
    const newLanguages = resume.languages.filter((_, i) => i !== index);
    setResume((prev) => ({ ...prev, languages: newLanguages }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 md:p-6">
      {/* Background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-60">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700 rounded-full filter blur-3xl opacity-10 transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-10 transform -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header with actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Profile
            </button>
            <h1 className="text-3xl font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                Resume Builder
              </span>
            </h1>
          </div>

          <div className="flex space-x-3 mt-4 md:mt-0">
            {!previewMode ? (
              <>
                <button
                  onClick={handleSave}
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
                      Save Resume
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  <Download size={16} className="mr-2" />
                  Download PDF
                </button>
                <button
                  onClick={() => setPreviewMode(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Eye size={16} className="mr-2" />
                  Preview
                </button>
              </>
            ) : (
              <button
                onClick={() => setPreviewMode(false)}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Edit2 size={16} className="mr-2" />
                Edit Resume
              </button>
            )}
          </div>
        </div>

        {!previewMode ? (
          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar Navigation */}
            <motion.div
              className="col-span-3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-[#1a1f2e] rounded-lg shadow-lg p-4 border border-blue-800">
                <h2 className="text-xl font-semibold mb-4 text-blue-400">
                  Sections
                </h2>
                <nav className="space-y-2">
                  {[
                    "personal",
                    "education",
                    "experience",
                    "skills",
                    "projects",
                    "certifications",
                    "languages",
                  ].map((section) => (
                    <motion.button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition duration-300 ${
                        activeSection === section
                          ? "bg-blue-900 text-blue-400"
                          : "hover:bg-blue-900 text-gray-300"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              className="col-span-9"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-[#1a1f2e] rounded-lg shadow-lg p-6 border border-blue-800">
                {activeSection === "personal" && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <label className="block text-sm font-medium text-gray-300">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={resume.personalInfo.fullName}
                          onChange={handlePersonalInfoChange}
                          className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <label className="block text-sm font-medium text-gray-300">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={resume.personalInfo.email}
                          onChange={handlePersonalInfoChange}
                          className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <label className="block text-sm font-medium text-gray-300">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={resume.personalInfo.phone}
                          onChange={handlePersonalInfoChange}
                          className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <label className="block text-sm font-medium text-gray-300">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={resume.personalInfo.location}
                          onChange={handlePersonalInfoChange}
                          className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </motion.div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300">
                        Professional Summary
                      </label>
                      <textarea
                        name="summary"
                        value={resume.personalInfo.summary}
                        onChange={handlePersonalInfoChange}
                        rows={4}
                        className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </motion.div>
                )}

                {activeSection === "education" && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-semibold text-blue-400">
                        Education
                      </h2>
                      <motion.button
                        onClick={addEducation}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus size={20} />
                        Add Education
                      </motion.button>
                    </div>
                    {resume.education.map((edu, index) => (
                      <motion.div
                        key={index}
                        className="border rounded-lg p-4 space-y-4 relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <button
                          onClick={() => deleteEducation(index)}
                          className="absolute top-2 right-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Institution
                            </label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "institution",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Degree
                            </label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "degree",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Field of Study
                            </label>
                            <input
                              type="text"
                              value={edu.fieldOfStudy}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "fieldOfStudy",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Grade
                            </label>
                            <input
                              type="text"
                              value={edu.grade}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "grade",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Start Date
                            </label>
                            <input
                              type="date"
                              value={edu.startDate}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "startDate",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              End Date
                            </label>
                            <input
                              type="date"
                              value={edu.endDate}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "endDate",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeSection === "experience" && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-semibold text-blue-400">
                        Experience
                      </h2>
                      <motion.button
                        onClick={addExperience}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus size={20} />
                        Add Experience
                      </motion.button>
                    </div>
                    {resume.experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        className="border rounded-lg p-4 space-y-4 relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <button
                          onClick={() => deleteExperience(index)}
                          className="absolute top-2 right-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Company
                            </label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "company",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Position
                            </label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "position",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Location
                            </label>
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "location",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Start Date
                            </label>
                            <input
                              type="date"
                              value={exp.startDate}
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "startDate",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              End Date
                            </label>
                            <input
                              type="date"
                              value={exp.endDate}
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "endDate",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300">
                            Description
                          </label>
                          <textarea
                            value={exp.description}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            rows={4}
                            className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeSection === "skills" && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-semibold text-blue-400">
                      Skills
                    </h2>
                    {resume.skills.map((skillCategory, categoryIndex) => (
                      <motion.div
                        key={categoryIndex}
                        className="border rounded-lg p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: categoryIndex * 0.1,
                        }}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-medium text-gray-300">
                            {skillCategory.category}
                          </h3>
                          <motion.button
                            onClick={() => addSkill(categoryIndex)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Plus size={20} />
                            Add Skill
                          </motion.button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {skillCategory.items.map((skill, itemIndex) => (
                            <motion.div
                              key={itemIndex}
                              className="relative"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: itemIndex * 0.1,
                              }}
                            >
                              <button
                                onClick={() =>
                                  deleteSkill(categoryIndex, itemIndex)
                                }
                                className="absolute -top-2 -right-2 text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                              <input
                                type="text"
                                value={skill}
                                onChange={(e) =>
                                  handleSkillsChange(
                                    categoryIndex,
                                    itemIndex,
                                    e.target.value
                                  )
                                }
                                className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter skill"
                              />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeSection === "projects" && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-semibold text-blue-400">
                        Projects
                      </h2>
                      <motion.button
                        onClick={addProject}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus size={20} />
                        Add Project
                      </motion.button>
                    </div>
                    {resume.projects.map((project, index) => (
                      <motion.div
                        key={index}
                        className="border rounded-lg p-4 space-y-4 relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <button
                          onClick={() => deleteProject(index)}
                          className="absolute top-2 right-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Project Name
                            </label>
                            <input
                              type="text"
                              value={project.name}
                              onChange={(e) =>
                                handleProjectChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Technologies
                            </label>
                            <input
                              type="text"
                              value={project.technologies.join(", ")}
                              onChange={(e) =>
                                handleProjectChange(
                                  index,
                                  "technologies",
                                  e.target.value.split(",").map((t) => t.trim())
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Separate with commas"
                            />
                          </motion.div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Start Date
                            </label>
                            <input
                              type="date"
                              value={project.startDate}
                              onChange={(e) =>
                                handleProjectChange(
                                  index,
                                  "startDate",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              End Date
                            </label>
                            <input
                              type="date"
                              value={project.endDate}
                              onChange={(e) =>
                                handleProjectChange(
                                  index,
                                  "endDate",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300">
                            Description
                          </label>
                          <textarea
                            value={project.description}
                            onChange={(e) =>
                              handleProjectChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            rows={4}
                            className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300">
                            Project Link
                          </label>
                          <input
                            type="url"
                            value={project.link}
                            onChange={(e) =>
                              handleProjectChange(index, "link", e.target.value)
                            }
                            className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeSection === "certifications" && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-semibold text-blue-400">
                        Certifications
                      </h2>
                      <motion.button
                        onClick={addCertification}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus size={20} />
                        Add Certification
                      </motion.button>
                    </div>
                    {resume.certifications.map((cert, index) => (
                      <motion.div
                        key={index}
                        className="border rounded-lg p-4 space-y-4 relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <button
                          onClick={() => deleteCertification(index)}
                          className="absolute top-2 right-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Certification Name
                            </label>
                            <input
                              type="text"
                              value={cert.name}
                              onChange={(e) =>
                                handleCertificationChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Issuer
                            </label>
                            <input
                              type="text"
                              value={cert.issuer}
                              onChange={(e) =>
                                handleCertificationChange(
                                  index,
                                  "issuer",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Date
                            </label>
                            <input
                              type="date"
                              value={cert.date}
                              onChange={(e) =>
                                handleCertificationChange(
                                  index,
                                  "date",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Credential ID
                            </label>
                            <input
                              type="text"
                              value={cert.credentialId}
                              onChange={(e) =>
                                handleCertificationChange(
                                  index,
                                  "credentialId",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300">
                            Certification Link
                          </label>
                          <input
                            type="url"
                            value={cert.link}
                            onChange={(e) =>
                              handleCertificationChange(
                                index,
                                "link",
                                e.target.value
                              )
                            }
                            className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeSection === "languages" && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-semibold text-blue-400">
                        Languages
                      </h2>
                      <motion.button
                        onClick={addLanguage}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus size={20} />
                        Add Language
                      </motion.button>
                    </div>
                    {resume.languages.map((lang, index) => (
                      <motion.div
                        key={index}
                        className="border rounded-lg p-4 space-y-4 relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <button
                          onClick={() => deleteLanguage(index)}
                          className="absolute top-2 right-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Language
                            </label>
                            <input
                              type="text"
                              value={lang.name}
                              onChange={(e) =>
                                handleLanguageChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <label className="block text-sm font-medium text-gray-300">
                              Proficiency
                            </label>
                            <select
                              value={lang.proficiency}
                              onChange={(e) =>
                                handleLanguageChange(
                                  index,
                                  "proficiency",
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full px-4 py-2 rounded-md border border-blue-800 bg-[#1a1f2e] text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Select Proficiency</option>
                              <option value="Native">Native</option>
                              <option value="Fluent">Fluent</option>
                              <option value="Advanced">Advanced</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Basic">Basic</option>
                            </select>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="bg-[#1a1f2e] rounded-lg shadow-lg p-8 border border-blue-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Resume Preview */}
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-400">
                  {resume.personalInfo.fullName}
                </h1>
                <div className="flex justify-center gap-4 mt-2 text-gray-300">
                  <span className="flex items-center gap-1">
                    <Mail size={16} />
                    {resume.personalInfo.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={16} />
                    {resume.personalInfo.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={16} />
                    {resume.personalInfo.location}
                  </span>
                </div>
              </div>

              {resume.personalInfo.summary && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-2 text-blue-400">
                    Professional Summary
                  </h2>
                  <p className="text-gray-300">{resume.personalInfo.summary}</p>
                </div>
              )}

              {resume.education.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-blue-400">
                    <GraduationCap size={24} />
                    Education
                  </h2>
                  {resume.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      className="mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-medium text-gray-300">
                        {edu.institution}
                      </h3>
                      <p className="text-gray-500">
                        {edu.degree} in {edu.fieldOfStudy}
                      </p>
                      <p className="text-gray-400">
                        {edu.startDate} - {edu.endDate}
                        {edu.grade && ` • ${edu.grade}`}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}

              {resume.experience.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-blue-400">
                    <Briefcase size={24} />
                    Experience
                  </h2>
                  {resume.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      className="mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-medium text-gray-300">
                        {exp.position}
                      </h3>
                      <p className="text-gray-500">
                        {exp.company} • {exp.location}
                      </p>
                      <p className="text-gray-400">
                        {exp.startDate} - {exp.endDate}
                      </p>
                      <p className="text-gray-300 mt-2">{exp.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {resume.skills.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-blue-400">
                    <Code size={24} />
                    Skills
                  </h2>
                  {resume.skills.map((skillCategory, categoryIndex) => (
                    <motion.div
                      key={categoryIndex}
                      className="mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                    >
                      <h3 className="text-xl font-medium text-gray-300">
                        {skillCategory.category}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skillCategory.items.map((skill, itemIndex) => (
                          <span
                            key={itemIndex}
                            className="bg-blue-800 text-blue-400 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {resume.projects.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-blue-400">
                    <FileText size={24} />
                    Projects
                  </h2>
                  {resume.projects.map((project, index) => (
                    <motion.div
                      key={index}
                      className="mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-medium text-gray-300">
                        {project.name}
                      </h3>
                      <p className="text-gray-500">
                        {project.technologies.join(", ")}
                      </p>
                      <p className="text-gray-400">
                        {project.startDate} - {project.endDate}
                      </p>
                      <p className="text-gray-300 mt-2">
                        {project.description}
                      </p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm mt-1 inline-flex items-center"
                        >
                          <LinkIcon size={14} className="mr-1" />
                          View Project
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {resume.certifications.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-blue-400">
                    <Award size={24} />
                    Certifications
                  </h2>
                  {resume.certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      className="mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-medium text-gray-300">
                        {cert.name}
                      </h3>
                      <p className="text-gray-500">
                        {cert.issuer}
                        {cert.credentialId && ` • ID: ${cert.credentialId}`}
                      </p>
                      <p className="text-gray-400">
                        {new Date(cert.date).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm mt-1 inline-flex items-center"
                        >
                          <LinkIcon size={14} className="mr-1" />
                          View Certificate
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {resume.languages.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-blue-400">
                    <Globe size={24} />
                    Languages
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {resume.languages.map((lang, index) => (
                      <motion.div
                        key={index}
                        className="bg-blue-800/50 text-blue-300 px-4 py-2 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <span className="font-medium">{lang.name}</span>
                        <span className="text-blue-400 ml-2">•</span>
                        <span className="ml-2">{lang.proficiency}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder;
