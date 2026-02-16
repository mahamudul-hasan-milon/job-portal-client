import { FaMapMarkerAlt, FaClock, FaBriefcase } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HotJobsCard = ({ job }) => {
  const {
    _id,
    title,
    company,
    company_logo,
    requirements,
    description,
    location,
    salaryRange,
    jobType,
    applicationDeadline,
  } = job;

  // Calculate days remaining until deadline
  const getDaysRemaining = () => {
    if (!applicationDeadline) return null;
    const today = new Date();
    const deadline = new Date(applicationDeadline);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="card bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Card Header with Company Info */}
      <div className="p-5 pb-3">
        <div className="flex items-start gap-3">
          {/* Company Logo */}
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
            {company_logo ? (
              <img
                className="w-full h-full object-contain p-2"
                src={company_logo}
                alt={company}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {company?.charAt(0) || "C"}
                </span>
              </div>
            )}
          </div>

          {/* Company Name and Location */}
          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-bold text-gray-800 truncate">
              {company || "Company Name"}
            </h4>
            <p className="flex items-center gap-1 text-sm text-gray-500">
              <FaMapMarkerAlt className="text-red-400 text-xs" />
              <span className="truncate">
                {location || "Location not specified"}
              </span>
            </p>
          </div>

          {/* New Badge */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-5 pb-5">
        {/* Job Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {title || "Job Title"}
        </h2>

        {/* Job Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {description || "No description provided"}
        </p>

        {/* Job Type Badge */}
        {jobType && (
          <div className="flex items-center gap-1 mb-3">
            <FaBriefcase className="text-blue-500 text-xs" />
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {jobType}
            </span>
          </div>
        )}

        {/* Requirements Tags */}
        {requirements && requirements.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {requirements.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
              >
                {skill.length > 15 ? skill.substring(0, 15) + "..." : skill}
              </span>
            ))}
            {requirements.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                +{requirements.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Deadline and Salary Row */}
        <div className="flex items-center justify-between mb-4">
          {/* Deadline */}
          {daysRemaining !== null && (
            <div className="flex items-center gap-1 text-sm">
              <FaClock className="text-orange-400" />
              <span className="text-gray-600">
                {daysRemaining > 0 ? (
                  <span className="font-medium">
                    {daysRemaining} {daysRemaining === 1 ? "day" : "days"} left
                  </span>
                ) : (
                  <span className="text-red-500 font-medium">Expired</span>
                )}
              </span>
            </div>
          )}

          {/* Salary */}
          {salaryRange && (
            <div className="flex items-center gap-1 text-sm font-semibold">
              <TbCurrencyTaka className="text-green-500 text-lg" />
              <span className="text-gray-800">
                {salaryRange.min?.toLocaleString()} -{" "}
                {salaryRange.max?.toLocaleString()}
                <span className="text-gray-500 text-xs ml-1">
                  {salaryRange.currency || "BDT"}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Apply Button */}
        <Link to={`/jobs/${_id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            Apply Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
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

      {/* Card Footer with Additional Info */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>📍 {location?.split(",")[0] || "Remote"}</span>
          <span>🕒 Posted recently</span>
        </div>
      </div>
    </motion.div>
  );
};

export default HotJobsCard;
