import React, { useState } from "react";
import axios from "axios";
import {
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  ChevronDown,
  BookOpen,
  Clock,
  Hash,
  Award,
  Save,
  Send,
} from "lucide-react";
import {toast} from "react-toastify"


const industries = [
    "Technology & IT",
    "Finance",
    "Healthcare",
    "Education",
    "Manufacturing",
    "Other",
  ];
  
  const jobTypes = [
    "Full-Time",
    "Part-Time",
    "Contract",
    "Freelance",
    "Internship",
  ];
  
  const hiringForOptions = ["Experienced", "Entry Level", "Fresher", "Any"];
  
  const locationTypes = ["Onsite", "Remote", "Hybrid"];
  

const JobForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData || {
    title: "",
    description: "",
    skills: [],
    eligibility: {
      hiringFor: "Experienced",
      minExperience: 0,
      maxExperience: null,
      education: [{ degree: "", field: "", minPercentage: 0 }],
    },
    compensation: {
      salary: {
        min: null,
        max: null,
      },
      isNegotiable: false,
    },
    location: {
      type: "Onsite",
      city: "",
      country: "",
    },
    industry: "Technology & IT",
    jobType: "Full-Time",
    deadline: "",
    status: "Draft",
  });
  
    const [skillInput, setSkillInput] = useState("");
    const [activeSection, setActiveSection] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleNestedChange = (section, field, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: value,
        },
      }));
    };
  
    const handleLocationChange = (field, value) => {
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [field]: value,
        },
      }));
    };
  
    const handleSalaryChange = (field, value) => {
      setFormData((prevData) => ({
        ...prevData,
        compensation: {
          ...prevData.compensation,
          salary: {
            ...prevData.compensation.salary,
            [field]: value,
          },
        },
      }));
    };
  
    const toggleSection = (section) => {
      setActiveSection(activeSection === section ? null : section);
    };
  
    const addSkill = () => {
      if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
        setFormData((prevData) => ({
          ...prevData,
          skills: [...prevData.skills, skillInput.trim()],
        }));
        setSkillInput("");
      }
    };
  
    const removeSkill = (skillToRemove) => {
      setFormData((prevData) => ({
        ...prevData,
        skills: prevData.skills.filter((skill) => skill !== skillToRemove),
      }));
    };
  
    const addEducation = () => {
      setFormData((prevData) => ({
        ...prevData,
        eligibility: {
          ...prevData.eligibility,
          education: [
            ...prevData.eligibility.education,
            { degree: "", field: "", minPercentage: 0 },
          ],
        },
      }));
    };
  
    const removeEducation = (indexToRemove) => {
      setFormData((prevData) => ({
        ...prevData,
        eligibility: {
          ...prevData.eligibility,
          education: prevData.eligibility.education.filter(
            (_, index) => index !== indexToRemove
          ),
        },
      }));
    };
  
    const handleEducationChange = (index, field, value) => {
      const newEducation = [...formData.eligibility.education];
      newEducation[index] = {
        ...newEducation[index],
        [field]: value,
      };
  
      setFormData((prevData) => ({
        ...prevData,
        eligibility: {
          ...prevData.eligibility,
          education: newEducation,
        },
      }));
    };
    const [btnLoading, setBtnLoading] = useState(false)
    const LoadingAnimation = () => (
      <div className="flex justify-center items-center">
        <div className="spinner border-t-transparent border-4 border-violet-500 rounded-full w-6 h-6 animate-spin"></div>
      </div>
    );


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-gradient-to-r from-blue-900 to-black p-6 rounded-lg shadow-lg transform hover:scale-101 transition-all duration-300">
          <h1 className="text-3xl font-bold text-blue-300 mb-2">
            Update Job Posting
          </h1>
          <p className="text-gray-400">
            Update job posting for your
            company
          </p>
        </div>

        <form onSubmit={(e) => handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-blue-900 transition-all duration-300 hover:shadow-blue-900/20">
                <h2
                  className="text-xl font-semibold mb-6 text-blue-300 border-b border-blue-900 pb-2 flex items-center cursor-pointer"
                  onClick={() => toggleSection("basic")}
                >
                  <Briefcase size={20} className="mr-2 text-blue-500" />
                  Basic Job Information
                  <ChevronDown
                    size={18}
                    className={`ml-auto transform transition-transform duration-300 ${
                      activeSection === "basic" ? "rotate-180" : ""
                    }`}
                  />
                </h2>

                <div
                  className={`space-y-4 transition-all duration-500 ${
                    activeSection === "basic" ? "opacity-100" : "opacity-100"
                  }`}
                >
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-blue-300 mb-1 font-medium"
                    >
                      Job Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 transition-colors"
                      placeholder="e.g. Senior Full Stack Developer"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-blue-300 mb-1 font-medium"
                    >
                      Job Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="6"
                      className="w-full px-4 py-2 bg-gray-700 border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 transition-colors"
                      placeholder="Describe the job role, responsibilities, and requirements..."
                      required
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="industry"
                        className="block text-blue-300 mb-1 font-medium"
                      >
                        Industry *
                      </label>
                      <div className="relative">
                        <select
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-700 border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 appearance-none transition-colors"
                          required
                        >
                          {industries.map((industry) => (
                            <option key={industry} value={industry}>
                              {industry}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={18}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 pointer-events-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="jobType"
                        className="block text-blue-300 mb-1 font-medium"
                      >
                        Job Type *
                      </label>
                      <div className="relative">
                        <select
                          id="jobType"
                          name="jobType"
                          value={formData.jobType}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-700 border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 appearance-none transition-colors"
                          required
                        >
                          {jobTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={18}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 pointer-events-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="deadline"
                      className="block text-blue-300 mb-1 font-medium"
                    >
                      Application Deadline *
                    </label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-blue-900 transition-all duration-300 hover:shadow-blue-900/20">
                <h2
                  className="text-xl font-semibold mb-6 text-blue-300 border-b border-blue-900 pb-2 flex items-center cursor-pointer"
                  onClick={() => toggleSection("skills")}
                >
                  <Hash size={20} className="mr-2 text-blue-500" />
                  Required Skills
                  <ChevronDown
                    size={18}
                    className={`ml-auto transform transition-transform duration-300 ${
                      activeSection === "skills" ? "rotate-180" : ""
                    }`}
                  />
                </h2>

                <div
                  className={`transition-all duration-500 ${
                    activeSection === "skills" ? "opacity-100" : "opacity-100"
                  }`}
                >
                  <div className="mb-6">
                    <div className="flex">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        className="flex-grow px-4 py-2 bg-gray-700 border border-blue-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 transition-colors"
                        placeholder="Add a required skill"
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addSkill())
                        }
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      Press Enter or click Add to add a skill
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-blue-900 text-blue-100 px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-all duration-300 hover:bg-blue-700"
                      >
                        {skill}
                        <button
                          type="button"
                          className="text-blue-200 hover:text-blue-100 ml-1"
                          onClick={() => removeSkill(skill)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {formData.skills.length === 0 && (
                      <p className="text-gray-400 italic">
                        No skills added yet
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Eligibility */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-blue-900 transition-all duration-300 hover:shadow-blue-900/20">
                <h2
                  className="text-xl font-semibold mb-6 text-blue-300 border-b border-blue-900 pb-2 flex items-center cursor-pointer"
                  onClick={() => toggleSection("eligibility")}
                >
                  <Award size={20} className="mr-2 text-blue-500" />
                  Eligibility Requirements
                  <ChevronDown
                    size={18}
                    className={`ml-auto transform transition-transform duration-300 ${
                      activeSection === "eligibility" ? "rotate-180" : ""
                    }`}
                  />
                </h2>

                <div
                  className={`space-y-6 transition-all duration-500 ${
                    activeSection === "eligibility"
                      ? "opacity-100"
                      : "opacity-100"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="hiringFor"
                        className="block text-blue-300 mb-1 font-medium"
                      >
                        Hiring For *
                      </label>
                      <div className="relative">
                        <select
                          id="hiringFor"
                          value={formData.eligibility.hiringFor}
                          onChange={(e) =>
                            handleNestedChange(
                              "eligibility",
                              "hiringFor",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2 bg-gray-700 border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 appearance-none transition-colors"
                          required
                        >
                          {hiringForOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={18}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 pointer-events-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="minExperience"
                        className="block text-blue-300 mb-1 font-medium"
                      >
                        Min. Experience (years)
                      </label>
                      <input
                        type="number"
                        id="minExperience"
                        value={formData.eligibility.minExperience || ""}
                        onChange={(e) =>
                          handleNestedChange(
                            "eligibility",
                            "minExperience",
                            Number(e.target.value)
                          )
                        }
                        min="0"
                        className="w-full px-4 py-2 bg-gray-700 border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 transition-colors"
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="maxExperience"
                        className="block text-blue-300 mb-1 font-medium"
                      >
                        Max. Experience (years)
                      </label>
                      <input
                        type="number"
                        id="maxExperience"
                        value={formData.eligibility.maxExperience || ""}
                        onChange={(e) =>
                          handleNestedChange(
                            "eligibility",
                            "maxExperience",
                            Number(e.target.value)
                          )
                        }
                        min={formData.eligibility.minExperience || 0}
                        className="w-full px-4 py-2 bg-gray-700 border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 transition-colors"
                        placeholder="Any"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-blue-300 font-medium">
                        Education Requirements
                      </label>
                      <button
                        type="button"
                        onClick={addEducation}
                        className="text-blue-300 hover:text-blue-100 text-sm underline transition-colors"
                      >
                        + Add Another Degree
                      </button>
                    </div>

                    {formData.eligibility.education.map((edu, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-700 rounded-md mb-3 border border-blue-900 transform transition-all duration-300 hover:translate-x-1"
                      >
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium text-blue-300">
                            Degree {index + 1}
                          </h4>
                          {formData.eligibility.education.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeEducation(index)}
                              className="text-red-400 hover:text-red-300 text-sm transition-colors"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-gray-300 text-sm mb-1">
                              Degree Title *
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
                              className="w-full px-3 py-2 bg-gray-600 border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 transition-colors"
                              placeholder="e.g. Bachelor's"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-gray-300 text-sm mb-1">
                              Field of Study
                            </label>
                            <input
                              type="text"
                              value={edu.field}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "field",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 bg-gray-600 border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 transition-colors"
                              placeholder="e.g. Computer Science"
                            />
                          </div>

                          <div>
                            <label className="block text-gray-300 text-sm mb-1">
                              Min. Percentage
                            </label>
                            <input
                              type="number"
                              value={edu.minPercentage}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "minPercentage",
                                  Number(e.target.value)
                                )
                              }
                              min="0"
                              max="100"
                              className="w-full px-3 py-2 bg-gray-600 border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 transition-colors"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Location */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-blue-900 transition-all duration-300 hover:shadow-blue-900/20">
                <h2
                  className="text-xl font-semibold mb-4 text-blue-300 border-b border-blue-900 pb-2 flex items-center cursor-pointer"
                  onClick={() => toggleSection("location")}
                >
                  <MapPin size={20} className="mr-2 text-blue-500" />
                  Job Location
                  <ChevronDown
                    size={18}
                    className={`ml-auto transform transition-transform duration-300 ${
                      activeSection === "location" ? "rotate-180" : ""
                    }`}
                  />
                </h2>

                <div
                  className={`space-y-4 transition-all duration-500 ${
                    activeSection === "location" ? "opacity-100" : "opacity-100"
                  }`}
                >
                  <div>
                    <label
                      htmlFor="locationType"
                      className="block text-blue-300 mb-1 font-medium"
                    >
                      Location Type *
                    </label>
                    <div className="relative">
                      <select
                        id="locationType"
                        value={formData.location.type}
                        onChange={(e) =>
                          handleLocationChange("type", e.target.value)
                        }
                        className="w-full px-4 py-2 bg-gray-700 border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 appearance-none transition-colors"
                        required
                      >
                        {locationTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 pointer-events-none"
                      />
                    </div>
                  </div>

                  {formData.location.type !== "Remote" && (
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-blue-300 mb-1 font-medium"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={formData.location.city}
                        onChange={(e) =>
                          handleLocationChange("city", e.target.value)
                        }
                        className="w-full px-4 py-2 bg-gray-700 border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 transition-colors"
                        placeholder="e.g. San Francisco"
                      />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-blue-300 mb-1 font-medium"
                    >
                      Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      value={formData.location.country}
                      onChange={(e) =>
                        handleLocationChange("country", e.target.value)
                      }
                      className="w-full px-4 py-2 bg-gray-700 border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 transition-colors"
                      placeholder="e.g. USA"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Compensation */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-blue-900 transition-all duration-300 hover:shadow-blue-900/20">
                <h2
                  className="text-xl font-semibold mb-4 text-blue-300 border-b border-blue-900 pb-2 flex items-center cursor-pointer"
                  onClick={() => toggleSection("compensation")}
                >
                  <DollarSign size={20} className="mr-2 text-blue-500" />
                  Compensation
                  <ChevronDown
                    size={18}
                    className={`ml-auto transform transition-transform duration-300 ${
                      activeSection === "compensation" ? "rotate-180" : ""
                    }`}
                  />
                </h2>

                <div
                  className={`space-y-4 transition-all duration-500 ${
                    activeSection === "compensation"
                      ? "opacity-100"
                      : "opacity-100"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="minSalary"
                        className="block text-blue-300 mb-1 font-medium"
                      >
                        Min. Salary
                      </label>
                      <input
                        type="number"
                        id="minSalary"
                        value={formData.compensation.salary.min || ""}
                        onChange={(e) =>
                          handleSalaryChange("min", Number(e.target.value))
                        }
                        min="0"
                        className="w-full px-4 py-2 bg-gray-700 border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 transition-colors"
                        placeholder="e.g. 50000"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="maxSalary"
                        className="block text-blue-300 mb-1 font-medium"
                      >
                        Max. Salary
                      </label>
                      <input
                        type="number"
                        id="maxSalary"
                        value={formData.compensation.salary.max || ""}
                        onChange={(e) =>
                          handleSalaryChange("max", Number(e.target.value))
                        }
                        min={formData.compensation.salary.min || 0}
                        className="w-full px-4 py-2 bg-gray-700 border border-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 transition-colors"
                        placeholder="e.g. 70000"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isNegotiable"
                      checked={formData.compensation.isNegotiable}
                      onChange={(e) =>
                        handleNestedChange(
                          "compensation",
                          "isNegotiable",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 bg-gray-700 border-blue-900 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="isNegotiable" className="text-gray-300">
                      Salary is negotiable
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-blue-900 transition-all duration-300 hover:shadow-blue-900/20">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">
                  Ready to post?
                </h2>
                <p className="text-gray-400 mb-4">
                  Save as draft to edit later or publish immediately to start
                  receiving applications.
                </p>

                <div className="space-y-3">
                  

                  <button
                    type="button"
                    disabled={btnLoading}
                    onClick={(e) => handleSubmit(e, "Published")}
                    className="w-full bg-blue-700 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1"
                  >
                    <Send size={18} />
                    {btnLoading ? <LoadingAnimation /> : "Post The Job"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
