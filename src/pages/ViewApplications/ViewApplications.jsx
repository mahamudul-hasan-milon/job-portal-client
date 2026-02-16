import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaFileAlt,
  FaCalendarAlt,
  FaFilter,
  FaSearch,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

const ViewApplications = () => {
  const applications = useLoaderData();
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleStatusUpdate = (e, id, applicantEmail) => {
    const newStatus = e.target.value;

    Swal.fire({
      title: "Update Application Status",
      text: `Change status for ${applicantEmail} to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, update it",
      background: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          status: newStatus,
        };

        fetch(
          `https://job-portal-server-for-recruiter-mu.vercel.app/job-applications/${id}`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          },
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount) {
              Swal.fire({
                icon: "success",
                title: "Status Updated!",
                text: `Application status changed to ${newStatus}`,
                showConfirmButton: false,
                timer: 1500,
                background: "#fff",
                iconColor: "#2563eb",
              });
            }
          });
      }
    });
  };

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

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "hired":
        return <FaCheckCircle className="text-green-600" />;
      case "rejected":
        return <FaTimesCircle className="text-red-600" />;
      case "interview":
      case "set interview":
        return <FaCalendarAlt className="text-purple-600" />;
      default:
        return <FaClock className="text-yellow-600" />;
    }
  };

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesStatus =
      filterStatus === "all" ||
      app.status?.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      app.applicant_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant_name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter((app) => app.status === "pending").length,
    review: applications.filter((app) => app.status === "under review").length,
    interview: applications.filter(
      (app) => app.status === "interview" || app.status === "set interview",
    ).length,
    hired: applications.filter((app) => app.status === "hired").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  };

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
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Job Applications
          </h1>
          <p className="text-lg text-gray-600">
            Review and manage all applications for this position
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-4 text-center cursor-pointer hover:shadow-xl transition-all"
            onClick={() => setFilterStatus("all")}
          >
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            <p className="text-sm text-gray-500">Total</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="bg-yellow-50 rounded-xl shadow-lg p-4 text-center cursor-pointer hover:shadow-xl transition-all border-2 border-yellow-200"
            onClick={() => setFilterStatus("pending")}
          >
            <p className="text-2xl font-bold text-yellow-700">
              {stats.pending}
            </p>
            <p className="text-sm text-yellow-600">Pending</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-50 rounded-xl shadow-lg p-4 text-center cursor-pointer hover:shadow-xl transition-all border-2 border-blue-200"
            onClick={() => setFilterStatus("under review")}
          >
            <p className="text-2xl font-bold text-blue-700">{stats.review}</p>
            <p className="text-sm text-blue-600">Review</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="bg-purple-50 rounded-xl shadow-lg p-4 text-center cursor-pointer hover:shadow-xl transition-all border-2 border-purple-200"
            onClick={() => setFilterStatus("interview")}
          >
            <p className="text-2xl font-bold text-purple-700">
              {stats.interview}
            </p>
            <p className="text-sm text-purple-600">Interview</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-green-50 rounded-xl shadow-lg p-4 text-center cursor-pointer hover:shadow-xl transition-all border-2 border-green-200"
            onClick={() => setFilterStatus("hired")}
          >
            <p className="text-2xl font-bold text-green-700">{stats.hired}</p>
            <p className="text-sm text-green-600">Hired</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="bg-red-50 rounded-xl shadow-lg p-4 text-center cursor-pointer hover:shadow-xl transition-all border-2 border-red-200"
            onClick={() => setFilterStatus("rejected")}
          >
            <p className="text-2xl font-bold text-red-700">{stats.rejected}</p>
            <p className="text-sm text-red-600">Rejected</p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-4 mb-8"
        >
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by email or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-12 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </motion.div>

        {/* Applications Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* Table Header */}
              <thead className="bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="font-semibold text-base">#</th>
                  <th className="font-semibold text-base">Applicant</th>
                  <th className="font-semibold text-base">Contact</th>
                  <th className="font-semibold text-base">Profiles</th>
                  <th className="font-semibold text-base">Resume</th>
                  <th className="font-semibold text-base">Status</th>
                  <th className="font-semibold text-base">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                <AnimatePresence>
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((app, index) => (
                      <motion.tr
                        key={app._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors border-b border-gray-200"
                      >
                        <th className="font-medium">{index + 1}</th>

                        {/* Applicant Info */}
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                              {app.applicant_email?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold">
                                {app.applicant_name || "Not provided"}
                              </p>
                              <p className="text-sm text-gray-500">
                                {app.applicant_email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact Info */}
                        <td>
                          <div className="space-y-1">
                            {app.linkedin && (
                              <a
                                href={app.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                              >
                                <FaLinkedin /> LinkedIn
                              </a>
                            )}
                            {app.github && (
                              <a
                                href={app.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-gray-700 hover:text-gray-900 text-sm"
                              >
                                <FaGithub /> GitHub
                              </a>
                            )}
                          </div>
                        </td>

                        {/* Profiles */}
                        <td>
                          <div className="flex gap-2">
                            {app.linkedin && (
                              <a
                                href={app.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-xs btn-ghost text-blue-600"
                              >
                                <FaLinkedin className="text-lg" />
                              </a>
                            )}
                            {app.github && (
                              <a
                                href={app.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-xs btn-ghost text-gray-700"
                              >
                                <FaGithub className="text-lg" />
                              </a>
                            )}
                          </div>
                        </td>

                        {/* Resume */}
                        <td>
                          {app.resume ? (
                            <a
                              href={app.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-xs btn-ghost text-green-600"
                            >
                              <FaFileAlt className="mr-1" /> View
                            </a>
                          ) : (
                            <span className="text-gray-400 text-sm">N/A</span>
                          )}
                        </td>

                        {/* Status Badge */}
                        <td>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(app.status)}
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(app.status)}`}
                            >
                              {app.status || "Pending"}
                            </span>
                          </div>
                        </td>

                        {/* Status Update Dropdown */}
                        <td>
                          <select
                            onChange={(e) =>
                              handleStatusUpdate(
                                e,
                                app._id,
                                app.applicant_email,
                              )
                            }
                            defaultValue={app.status || "pending"}
                            className="select select-sm select-bordered w-32 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                          >
                            <option value="pending">Pending</option>
                            <option value="under review">Under Review</option>
                            <option value="interview">Interview</option>
                            <option value="hired">Hired</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td colSpan="7" className="text-center py-12">
                        <div className="flex flex-col items-center">
                          <FaFileAlt className="text-5xl text-gray-300 mb-4" />
                          <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No applications found
                          </h3>
                          <p className="text-gray-500">
                            Try adjusting your filters
                          </p>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Summary Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 bg-white rounded-xl shadow-lg p-4 text-sm text-gray-600"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <FaEye className="text-blue-600" />
              <span>
                Showing {filteredApplications.length} of {applications.length}{" "}
                applications
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>{" "}
                Pending: {stats.pending}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>{" "}
                Review: {stats.review}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>{" "}
                Interview: {stats.interview}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>{" "}
                Hired: {stats.hired}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>{" "}
                Rejected: {stats.rejected}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ViewApplications;
