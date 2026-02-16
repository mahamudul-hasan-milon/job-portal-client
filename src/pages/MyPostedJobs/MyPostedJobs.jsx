import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEye,
  FaTrash,
  FaEdit,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";
import Swal from "sweetalert2";

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetch(
      `https://job-portal-server-for-recruiter-mu.vercel.app/jobs?email=${user.email}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, [user.email]);

  const handleDeleteJob = (jobId, jobTitle) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${jobTitle}". This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
      backdrop: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://job-portal-server-for-recruiter-mu.vercel.app/jobs/${jobId}`,
          {
            method: "DELETE",
          },
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setJobs(jobs.filter((job) => job._id !== jobId));
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Job has been deleted successfully.",
                showConfirmButton: false,
                timer: 1500,
                background: "#fff",
                iconColor: "#2563eb",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to delete job. Please try again.",
              confirmButtonColor: "#2563eb",
            });
          });
      }
    });
  };

  // Calculate days remaining
  const getDaysRemaining = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status color based on deadline
  const getDeadlineStatus = (deadline) => {
    const days = getDaysRemaining(deadline);
    if (!days) return "bg-gray-100 text-gray-600";
    if (days < 0) return "bg-red-100 text-red-600";
    if (days <= 3) return "bg-orange-100 text-orange-600";
    if (days <= 7) return "bg-yellow-100 text-yellow-600";
    return "bg-green-100 text-green-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 animate-pulse">
            Loading your posted jobs...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                My Posted Jobs
              </h1>
              <p className="text-lg text-gray-600">
                Manage and track all your job postings
              </p>
            </div>

            {/* Post New Job Button */}
            <Link to="/addJob">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-linear-to-r from-blue-600 to-indigo-600 text-white border-none hover:from-blue-700 hover:to-indigo-700 px-6 py-3 rounded-xl shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Post New Job
              </motion.button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaUsers className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Jobs</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {jobs.length}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaClock className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {
                      jobs.filter(
                        (job) => getDaysRemaining(job.applicationDeadline) > 0,
                      ).length
                    }
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">!</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expiring Soon</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {
                      jobs.filter((job) => {
                        const days = getDaysRemaining(job.applicationDeadline);
                        return days > 0 && days <= 3;
                      }).length
                    }
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FaEye className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Views</p>
                  <p className="text-2xl font-bold text-gray-800">0</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Jobs Grid */}
        <AnimatePresence mode="wait">
          {jobs.length > 0 ? (
            <motion.div
              key="jobs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {jobs.map((job, index) => {
                const daysRemaining = getDaysRemaining(job.applicationDeadline);
                const deadlineStatus = getDeadlineStatus(
                  job.applicationDeadline,
                );

                return (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    {/* Card Header */}
                    <div className="p-5 border-b border-gray-100">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {/* Company Logo */}
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                            {job.company_logo ? (
                              <img
                                className="w-full h-full object-contain p-2"
                                src={job.company_logo}
                                alt={job.company}
                              />
                            ) : (
                              <div className="w-full h-full bg-linear-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                  {job.company?.charAt(0) || "C"}
                                </span>
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 line-clamp-1">
                              {job.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {job.company}
                            </p>
                          </div>
                        </div>

                        {/* Application Count Badge */}
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                          {job.applicationCount || 0} Applications
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-3">
                      {/* Location */}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaMapMarkerAlt className="text-red-400" />
                        <span>{job.location || "Location not specified"}</span>
                      </div>

                      {/* Deadline */}
                      <div className="flex items-center gap-2 text-sm">
                        <FaClock className="text-blue-400" />
                        <span className="text-gray-600">Deadline: </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${deadlineStatus}`}
                        >
                          {job.applicationDeadline
                            ? new Date(
                                job.applicationDeadline,
                              ).toLocaleDateString()
                            : "Not specified"}
                        </span>
                      </div>

                      {/* Days Remaining */}
                      {daysRemaining && (
                        <div className="text-sm">
                          {daysRemaining > 0 ? (
                            <span className="text-green-600 font-medium">
                              {daysRemaining} days remaining
                            </span>
                          ) : (
                            <span className="text-red-600 font-medium">
                              Deadline passed
                            </span>
                          )}
                        </div>
                      )}

                      {/* Salary Range (if available) */}
                      {job.salaryRange && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Salary: </span>
                          {job.salaryRange.min} - {job.salaryRange.max}{" "}
                          {job.salaryRange.currency}
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex gap-2">
                        {/* View Applications Button */}
                        <Link to={`/viewApplications/${job._id}`}>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            title="View Applications"
                          >
                            <FaEye />
                          </motion.button>
                        </Link>

                        {/* Edit Button */}
                        <Link to={`/editJob/${job._id}`}>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                            title="Edit Job"
                          >
                            <FaEdit />
                          </motion.button>
                        </Link>

                        {/* Delete Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteJob(job._id, job.title)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          title="Delete Job"
                        >
                          <FaTrash />
                        </motion.button>
                      </div>

                      {/* Status Indicator */}
                      <div
                        className={`w-2 h-2 rounded-full ${
                          daysRemaining > 0 ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  No jobs posted yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start by posting your first job opportunity
                </p>
                <Link to="/addJob">
                  <button className="btn bg-linear-to-r from-blue-600 to-indigo-600 text-white border-none hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-xl shadow-lg">
                    Post a Job
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MyPostedJobs;
