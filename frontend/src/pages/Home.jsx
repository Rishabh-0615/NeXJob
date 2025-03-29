"use client";

import React, { useState } from "react";
import {
  Brain,
  Search,
  Shield,
  Video,
  FileText,
  TrendingUp,
  ChevronRight,
  ArrowRight,
  Star,
  Play,
} from "lucide-react";

import { Link } from "react-router-dom";


// Main App Component
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AIInActionSection />
      <JobListingsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

// Navbar Component


const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-900/30 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-400"></div>
            <div className="absolute inset-[2px] rounded-full bg-black flex items-center justify-center text-blue-400 font-bold">
              N
            </div>
          </div>
          <span className="text-xl font-bold text-white">NeXJob</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/login-seeker">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white border border-blue-500 rounded-md glow-border">
              Find Jobs
            </button>
          </Link>
          <Link to="/login-recruiter">
            <button className="px-6 py-3 border border-blue-700 text-blue-400 hover:bg-blue-900/50 rounded-md">
              Hire Talent
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};




// Hero Section
const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black to-blue-950 z-0"></div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay z-0"
        style={{
          backgroundImage: "url('https://via.placeholder.com/1920x1080')",
        }}
      ></div>
      <div className="absolute inset-0 grid-pattern z-0 opacity-30"></div>
      <div className="container relative z-10 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl leading-tight glow-text">
          Smart, Unbiased, AI-Driven Hiring –{" "}
          <span className="gradient-text">Your Dream Job Awaits!</span>
        </h1>
        <p className="text-lg md:text-xl text-blue-200 mb-8 max-w-2xl">
          Find jobs effortlessly with AI-powered skill matching and transparent
          recruitment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link to="/login-seeker">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white border border-blue-500 rounded-md glow-border">
              Find Jobs
            </button>
          </Link>
          <Link to="/login-recruiter">
            <button className="px-6 py-3 border border-blue-700 text-blue-400 hover:bg-blue-900/50 rounded-md">
              Hire Talent
            </button>
          </Link>
          <button className="px-6 py-3 text-blue-300 hover:bg-blue-900/50 rounded-md">
            Explore Features
          </button>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 text-blue-300 text-sm">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span>10,000+ Jobs</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span>5,000+ Companies</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span>98% Match Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 rounded-lg border border-blue-900/50 bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg relative overflow-hidden group">
    <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full"></div>
    <div className="mb-4 text-blue-400">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

// Features Section
const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-950">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Powered by <span className="text-blue-500">AI Technology</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our cutting-edge AI algorithms revolutionize the hiring process,
            making it faster, smarter, and unbiased.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="h-10 w-10" />}
            title="AI-Powered Resume Analysis 🧠"
            description="Our AI scans your resume to identify key skills, experiences, and potential matches with job openings."
          />
          <FeatureCard
            icon={<Search className="h-10 w-10" />}
            title="Smart Skill-Based Matching 🔍"
            description="Get matched with jobs based on your actual skills and potential, not just keywords on your resume."
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10" />}
            title="Verified Recruiters & Fraud Prevention 🛡️"
            description="All recruiters are verified to ensure legitimate job postings and protect your information."
          />
          <FeatureCard
            icon={<Video className="h-10 w-10" />}
            title="Integrated Interview IDE 🎥"
            description="Stand out against ordinary norms of Interview and eases the time consuming process"
          />
          <FeatureCard
            icon={<FileText className="h-10 w-10" />}
            title="Post-Interview Feedback Reports 📑"
            description="Receive detailed feedback after interviews to help improve your future performance."
          />
          <FeatureCard
            icon={<TrendingUp className="h-10 w-10" />}
            title="Integrated Career Growth Tools 📈"
            description="Access tools and resources to help you grow your skills and advance your career."
          />
        </div>
      </div>
    </section>
  );
};

// Step Item Component
const StepItem = ({ number, title, description }) => (
  <div className="flex items-start gap-4 group">
    <div className="rounded-full bg-blue-600 text-white w-8 h-8 flex items-center justify-center font-bold group-hover:bg-blue-500 transition-colors duration-300">
      {number}
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-1 text-white">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

// How It Works Section
const HowItWorksSection = () => {
  const [activeTab, setActiveTab] = useState("jobSeeker");

  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="container relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">
            How It <span className="text-blue-500">Works</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform streamlines the hiring process for both job seekers and
            recruiters.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          <div className="grid w-full grid-cols-2 mb-8 bg-gray-900 border border-blue-900/50 rounded-md overflow-hidden">
            <button
              className={`py-2 px-4 ${
                activeTab === "jobSeeker"
                  ? "bg-blue-900/50 text-white"
                  : "text-gray-300 hover:bg-blue-900/20"
              }`}
              onClick={() => setActiveTab("jobSeeker")}
            >
              For Job Seekers
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "recruiter"
                  ? "bg-blue-900/50 text-white"
                  : "text-gray-300 hover:bg-blue-900/20"
              }`}
              onClick={() => setActiveTab("recruiter")}
            >
              For Recruiters
            </button>
          </div>

          <div className="space-y-4">
            {activeTab === "jobSeeker" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center border border-blue-900/50">
                    <img
                      src="https://via.placeholder.com/600x400"
                      alt="Job seeker process"
                      className="object-cover opacity-80"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                </div>
                <div className="space-y-6">
                  <StepItem
                    number="01"
                    title="Sign Up & Upload Resume"
                    description="Create your profile and upload your resume. Our AI will analyze your skills and experience."
                  />
                  <StepItem
                    number="02"
                    title="AI Matches You with Jobs"
                    description="Our algorithm finds the best job matches based on your skills, experience, and preferences."
                  />
                  <StepItem
                    number="03"
                    title="Apply & Track Applications"
                    description="Apply to jobs with one click and track your application status in real-time."
                  />
                  <StepItem
                    number="04"
                    title="Receive Interview Feedback"
                    description="Get detailed feedback after interviews to help improve your future performance."
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center border border-blue-900/50">
                    <img
                      src="https://via.placeholder.com/600x400"
                      alt="Recruiter process"
                      className="object-cover opacity-80"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                </div>
                <div className="space-y-6">
                  <StepItem
                    number="01"
                    title="Create Company Profile"
                    description="Set up your company profile and showcase your culture, benefits, and work environment."
                  />
                  <StepItem
                    number="02"
                    title="Post Job Openings"
                    description="Create detailed job listings with required skills, experience, and qualifications."
                  />
                  <StepItem
                    number="03"
                    title="AI-Powered Candidate Matching"
                    description="Our algorithm identifies and ranks candidates based on skills, experience, and cultural fit."
                  />
                  <StepItem
                    number="04"
                    title="Interview & Hire"
                    description="Schedule interviews, provide feedback, and make offers all within our platform."
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// AI In Action Section
const AIInActionSection = () => {
  return (
    <section className="py-16 bg-gray-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="container relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">
            AI in <span className="text-blue-500">Action</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See how our AI technology transforms the hiring process for both job
            seekers and recruiters.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto aspect-video rounded-lg overflow-hidden bg-gray-900 border border-blue-900/50">
          <img
            src="https://via.placeholder.com/1280x720"
            alt="AI in action video thumbnail"
            className="object-cover w-full h-full opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="rounded-full w-16 h-16 p-0 flex items-center justify-center border border-blue-500 bg-black/50 hover:bg-black/70 hover:border-blue-400 glow-border">
              <Play className="h-8 w-8 text-blue-400" />
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-blue-500 mb-2">
              <Brain className="h-10 w-10 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">
              Smart Matching
            </h3>
            <p className="text-gray-400">
              Our AI analyzes skills, experience, and potential to find the
              perfect match.
            </p>
          </div>
          <div className="text-center">
            <div className="text-blue-500 mb-2">
              <Shield className="h-10 w-10 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">
              Bias Elimination
            </h3>
            <p className="text-gray-400">
              Our algorithms are designed to eliminate unconscious bias in the
              hiring process.
            </p>
          </div>
          <div className="text-center">
            <div className="text-blue-500 mb-2">
              <TrendingUp className="h-10 w-10 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">
              Continuous Learning
            </h3>
            <p className="text-gray-400">
              Our AI continuously improves based on hiring outcomes and
              feedback.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Job Card Component
const JobCard = ({ title, company, location, type, salary, skills, match }) => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-900/50 shadow-lg overflow-hidden hover:border-blue-700/50 transition-all duration-300 rounded-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <div
        className={`bg-blue-900/50 text-blue-300 rounded-full px-2 py-1 text-xs font-medium ${
          match > 90 ? "border border-blue-500" : ""
        }`}
      >
        {match}% Match
      </div>
    </div>
    <div className="text-gray-300 mb-2">
      {company} - {location}
    </div>
    <div className="text-gray-400 text-sm mb-4">
      {type} | {salary}
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="text-blue-300 border border-blue-800 rounded-full px-2 py-1 text-xs font-medium"
        >
          {skill}
        </div>
      ))}
    </div>
  </div>
);

// Urgent Job Badge Component
const UrgentJobBadge = ({ title, company, location }) => (
  <div className="bg-blue-900/50 text-blue-300 border border-blue-800 rounded-full px-3 py-1 text-sm font-medium">
    {title} - {company} ({location})
  </div>
);

// Job Listings Section
const JobListingsSection = () => {
  return (
    <section className="py-16 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="container relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Live <span className="text-blue-500">Job Listings</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse through our latest job openings or filter by skills,
            experience, and location.
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search jobs by title, skills, or company"
              className="w-full bg-gray-900 border border-blue-900/50 text-white placeholder:text-gray-500 px-4 py-2 rounded-md"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 border border-blue-900/50 text-blue-400 hover:bg-blue-900/20 rounded-md">
              Location
            </button>
            <button className="px-4 py-2 border border-blue-900/50 text-blue-400 hover:bg-blue-900/20 rounded-md">
              Experience
            </button>
            <button className="px-4 py-2 border border-blue-900/50 text-blue-400 hover:bg-blue-900/20 rounded-md">
              Job Type
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md">
              Search
            </button>
          </div>
        </div>

        <div className="mb-8 p-3 bg-blue-900/20 rounded-lg overflow-hidden border border-blue-900/50">
          <div className="flex gap-4 animate-marquee">
            <UrgentJobBadge
              title="Senior React Developer"
              company="TechCorp"
              location="Remote"
            />
            <UrgentJobBadge
              title="AI Engineer"
              company="DataMinds"
              location="New York"
            />
            <UrgentJobBadge
              title="Product Manager"
              company="InnovateCo"
              location="San Francisco"
            />
            <UrgentJobBadge
              title="UX Designer"
              company="DesignHub"
              location="London"
            />
            <UrgentJobBadge
              title="Data Scientist"
              company="AnalyticsPro"
              location="Berlin"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <JobCard
            title="Frontend Developer"
            company="WebTech Solutions"
            location="San Francisco, CA"
            type="Full-time"
            salary="$90,000 - $120,000"
            skills={["React", "TypeScript", "CSS"]}
            match={95}
          />
          <JobCard
            title="Data Scientist"
            company="DataCorp Analytics"
            location="Remote"
            type="Full-time"
            salary="$110,000 - $140,000"
            skills={["Python", "Machine Learning", "SQL"]}
            match={88}
          />
          <JobCard
            title="Product Manager"
            company="InnovateNow"
            location="New York, NY"
            type="Full-time"
            salary="$100,000 - $130,000"
            skills={["Product Strategy", "Agile", "User Research"]}
            match={92}
          />
          <JobCard
            title="UX/UI Designer"
            company="Creative Designs"
            location="Austin, TX"
            type="Full-time"
            salary="$85,000 - $110,000"
            skills={["Figma", "User Testing", "Wireframing"]}
            match={90}
          />
          <JobCard
            title="DevOps Engineer"
            company="CloudTech Systems"
            location="Seattle, WA"
            type="Full-time"
            salary="$120,000 - $150,000"
            skills={["AWS", "Docker", "Kubernetes"]}
            match={85}
          />
          <JobCard
            title="Marketing Specialist"
            company="GrowthHackers"
            location="Chicago, IL"
            type="Full-time"
            salary="$70,000 - $90,000"
            skills={["Digital Marketing", "SEO", "Content Strategy"]}
            match={82}
          />
        </div>

        <div className="mt-8 text-center">
          <button className="px-4 py-2 flex items-center gap-2 border border-blue-900/50 text-blue-400 hover:bg-blue-900/20 rounded-md mx-auto">
            View All Jobs <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ name, role, company, image, rating, quote }) => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-900/50 shadow-lg overflow-hidden rounded-lg p-6">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border border-blue-700">
        <img
          src={image || "https://via.placeholder.com/48"}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white">{name}</h4>
        <div className="text-gray-400 text-sm">
          {role} at {company}
        </div>
      </div>
    </div>
    <div className="flex items-center mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="h-5 w-5 text-blue-500" />
      ))}
      {[...Array(5 - rating)].map((_, i) => (
        <Star key={i} className="h-5 w-5 text-gray-700" />
      ))}
    </div>
    <p className="text-gray-300 italic">"{quote}"</p>
  </div>
);


// CTA Section
const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="container relative text-center">
        <h2 className="text-3xl font-bold mb-4 text-white glow-text">
          Join Now & Start Your Career Journey!
        </h2>
        <p className="text-blue-100 max-w-2xl mx-auto mb-8">
          Whether you're looking for your dream job or searching for the perfect
          candidate, NeXJob has you covered.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 border border-blue-300 rounded-md glow-border">
            Sign Up as Job Seeker
          </button>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white border border-blue-500 rounded-md glow-border">
            Sign Up as Recruiter
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 text-blue-100">
          <a
            href="#"
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Contact Us</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>FAQ</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-blue-900/30 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-400"></div>
                <div className="absolute inset-[2px] rounded-full bg-gray-950 flex items-center justify-center text-blue-400 font-bold">
                  N
                </div>
              </div>
              <span className="text-xl font-bold text-white">NeXJob</span>
            </div>
            <p className="text-gray-400 mb-4">
              Revolutionizing hiring with AI-driven matching, ensuring the
              perfect fit for job seekers and companies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-blue-400 hover:text-blue-300">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                </svg>
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.481 0-.237-.008-.866-.013-1.7-2.782.602-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">For Job Seekers</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  Upload Resume
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  Post a Job
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  AI Recruitment
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  Our Team
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-900/30 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} NeXJob. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingPage;
