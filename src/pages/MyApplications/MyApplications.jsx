import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaClock,
  FaTrash,
  FaEye,
  FaFilter,
} from "react-icons/fa";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/job-application?email=${user.email}`)
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        setLoading(false);
      });
  }, [user.email, axiosSecure]);

  // Filter applications based on status
  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true;
    return app.status?.toLowerCase() === filter.toLowerCase();
  });

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "under review":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "interview":
      case "set interview":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "hired":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 animate-pulse">
            Loading your applications...
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
                My Applications
              </h1>
              <p className="text-lg text-gray-600">
                Track and manage your job applications
              </p>
            </div>

            {/* Stats Card */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="bg-white rounded-2xl shadow-lg p-4"
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {applications.length}
                </p>
                <p className="text-sm text-gray-500">Total Applications</p>
              </div>
            </motion.div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === "all"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Applications
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === "pending"
                  ? "bg-yellow-500 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("under review")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === "under review"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Under Review
            </button>
            <button
              onClick={() => setFilter("interview")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === "interview"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Interview
            </button>
            <button
              onClick={() => setFilter("hired")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === "hired"
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Hired
            </button>
            <button
              onClick={() => setFilter("rejected")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === "rejected"
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Rejected
            </button>
          </div>
        </div>

        {/* Applications Grid */}
        <AnimatePresence mode="wait">
          {filteredApplications.length > 0 ? (
            <motion.div
              key="applications"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredApplications.map((app, index) => (
                <motion.div
                  key={app._id}
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
                          {app.company_logo ? (
                            <img
                              className="w-full h-full object-contain p-2"
                              src={app.company_logo}
                              alt={app.company}
                            />
                          ) : (
                            <div className="w-full h-full bg-linear-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {app.company?.charAt(0) || "C"}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {app.title || "Job Title"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {app.company || "Company"}
                          </p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(app.status)}`}
                      >
                        {app.status || "Pending"}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaMapMarkerAlt className="text-red-400" />
                      <span>{app.location || "Location not specified"}</span>
                    </div>

                    {/* Applied Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaClock className="text-blue-400" />
                      <span>Applied: {formatDate(app.appliedDate)}</span>
                    </div>

                    {/* Job Details Link */}
                    {app.job_id && (
                      <Link to={`/jobs/${app.job_id}`}>
                        <button className="text-blue-600 text-sm hover:text-blue-800 font-medium flex items-center gap-1 mt-2">
                          <FaEye className="text-xs" />
                          View Job Details
                        </button>
                      </Link>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    {/* Delete Button */}
                    <button
                      className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                      onClick={() => {
                        // Add delete functionality here
                      }}
                    >
                      <FaTrash />
                    </button>

                    {/* Interview Badge (if set) */}
                    {app.interviewDate && (
                      <span className="text-xs text-purple-600 font-medium">
                        Interview: {formatDate(app.interviewDate)}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  No applications found
                </h3>
                <p className="text-gray-600 mb-6">
                  {filter !== "all"
                    ? `You don't have any ${filter} applications yet.`
                    : "You haven't applied to any jobs yet."}
                </p>
                <Link to="/jobs">
                  <button className="btn bg-linear-to-r from-blue-600 to-indigo-600 text-white border-none hover:from-blue-700 hover:to-indigo-700 px-8 py-3 rounded-xl shadow-lg">
                    Browse Jobs
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary Section */}
        {applications.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Application Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {applications.filter((a) => a.status === "pending").length}
                </p>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {
                    applications.filter((a) => a.status === "under review")
                      .length
                  }
                </p>
                <p className="text-sm text-gray-500">Under Review</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {
                    applications.filter(
                      (a) =>
                        a.status === "interview" ||
                        a.status === "set interview",
                    ).length
                  }
                </p>
                <p className="text-sm text-gray-500">Interview</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {applications.filter((a) => a.status === "hired").length}
                </p>
                <p className="text-sm text-gray-500">Hired</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {applications.filter((a) => a.status === "rejected").length}
                </p>
                <p className="text-sm text-gray-500">Rejected</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MyApplications;
