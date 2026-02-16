import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaClock,
  FaBriefcase,
  FaUserTie,
  FaCalendarAlt,
  FaDollarSign,
} from "react-icons/fa";

const JobDetails = () => {
  const job = useLoaderData();
  const {
    _id,
    title,
    company,
    company_logo,
    location,
    description,
    requirements,
    responsibilities,
    salaryRange,
    jobType,
    applicationDeadline,
    hr_name,
    hr_email,
    postedDate,
  } = job;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate days remaining
  const getDaysRemaining = () => {
    if (!applicationDeadline) return null;
    const today = new Date();
    const deadline = new Date(applicationDeadline);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Jobs
          </Link>
        </motion.div>

        {/* Header Section with Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Company Logo */}
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 border border-gray-200 shrink-0">
              {company_logo ? (
                <img
                  className="w-full h-full object-contain p-3"
                  src={company_logo}
                  alt={company}
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">
                    {company?.charAt(0) || "C"}
                  </span>
                </div>
              )}
            </div>

            {/* Company and Job Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {title}
                </h1>
                {daysRemaining && daysRemaining > 0 && daysRemaining <= 7 && (
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                    🔥 {daysRemaining} days left
                  </span>
                )}
              </div>
              <p className="text-xl text-gray-600 mb-2">{company}</p>

              {/* Quick Info Tags */}
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                  <FaMapMarkerAlt className="text-xs" />
                  {location || "Remote"}
                </span>
                {jobType && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                    <FaBriefcase className="text-xs" />
                    {jobType}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                  <FaCalendarAlt className="text-xs" />
                  Posted: {formatDate(postedDate)}
                </span>
              </div>
            </div>

            {/* Apply Button - Mobile */}
            <div className="md:hidden w-full mt-4">
              <Link to={`/jobApply/${_id}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn bg-linear-to-r from-blue-600 to-indigo-600 text-white border-none hover:from-blue-700 hover:to-indigo-700 py-3 rounded-xl shadow-lg"
                >
                  Apply Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Job Description */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                Job Description
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {description || "No description provided."}
              </p>
            </div>

            {/* Responsibilities */}
            {responsibilities && responsibilities.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-green-600 rounded-full"></span>
                  Responsibilities
                </h2>
                <ul className="space-y-3">
                  {responsibilities.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      </span>
                      <span className="text-gray-600">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {requirements && requirements.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {requirements.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <span className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      </span>
                      <span className="text-gray-600">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Right Column - Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Apply Card - Desktop */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Apply Now
              </h3>

              {/* Salary Info */}
              {salaryRange && (
                <div className="mb-4 p-4 bg-green-50 rounded-xl">
                  <p className="text-sm text-green-600 mb-1">Salary Range</p>
                  <p className="text-2xl font-bold text-green-700">
                    {salaryRange.min?.toLocaleString()} -{" "}
                    {salaryRange.max?.toLocaleString()}
                    <span className="text-sm ml-1">
                      {salaryRange.currency || "BDT"}
                    </span>
                  </p>
                </div>
              )}

              {/* Deadline */}
              {applicationDeadline && (
                <div className="mb-4 p-4 bg-orange-50 rounded-xl">
                  <p className="text-sm text-orange-600 mb-1">
                    Application Deadline
                  </p>
                  <p className="text-lg font-semibold text-orange-700">
                    {formatDate(applicationDeadline)}
                  </p>
                  {daysRemaining && daysRemaining > 0 ? (
                    <p className="text-sm text-orange-600 mt-1">
                      {daysRemaining} days remaining
                    </p>
                  ) : (
                    <p className="text-sm text-red-600 mt-1">Deadline passed</p>
                  )}
                </div>
              )}

              {/* HR Contact */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                  <FaUserTie className="text-blue-600" />
                  Contact HR
                </p>
                <p className="font-semibold text-gray-800">
                  {hr_name || "Not specified"}
                </p>
                <p className="text-sm text-gray-600">{hr_email}</p>
              </div>

              {/* Apply Button */}
              <Link to={`/jobApply/${_id}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn bg-linear-to-r from-blue-600 to-indigo-600 text-white border-none hover:from-blue-700 hover:to-indigo-700 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Apply Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </motion.button>
              </Link>

              {/* Share Options */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Share this job</p>
                <div className="flex gap-2">
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.775-4.764 13.94 13.94 0 001.543-6.104c0-.213-.005-.425-.014-.637A10.025 10.025 0 0024 4.59z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDetails;
