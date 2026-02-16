import { useState } from "react";
import useJobs from "../../hooks/useJobs";
import HotJobsCard from "../Home/HotJobsCard";
import { BiSearch } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

const AllJob = () => {
  const [sort, setSort] = useState(false);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [search, setSearch] = useState("");
  const { jobs, loading } = useJobs(sort, search, minSalary, maxSalary);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 animate-pulse">
            Loading amazing jobs...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Discover Your Next Role
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Browse through thousands of job opportunities from top companies
        </p>
      </motion.div>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-7xl mx-auto mb-10"
      >
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
            {/* Sort Button */}
            <div className="lg:col-span-1">
              <button
                onClick={() => setSort(!sort)}
                className={`w-full btn ${
                  sort
                    ? "bg-linear-to-r from-green-500 to-emerald-500 text-white border-none hover:from-green-600 hover:to-emerald-600"
                    : "bg-linear-to-r from-blue-600 to-indigo-600 text-white border-none hover:from-blue-700 hover:to-indigo-700"
                } rounded-xl py-3 shadow-md hover:shadow-lg transition-all duration-300`}
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
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
                {sort ? "✓ Sorted by Salary" : "Sort by Salary"}
              </button>
            </div>

            {/* Search Input */}
            <div className="lg:col-span-2">
              <div className="relative">
                <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  onKeyUp={(e) => setSearch(e.target.value)}
                  type="text"
                  className="input input-bordered w-full pl-12 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="Search jobs by location, title, or company..."
                />
              </div>
            </div>

            {/* Salary Range */}
            <div className="lg:col-span-1">
              <div className="flex gap-2">
                <input
                  onKeyUp={(e) => setMinSalary(e.target.value)}
                  type="number"
                  className="input input-bordered w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Min $"
                />
                <input
                  onKeyUp={(e) => setMaxSalary(e.target.value)}
                  type="number"
                  className="input input-bordered w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Max $"
                />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(search || minSalary || maxSalary || sort) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2"
            >
              <span className="text-sm text-gray-600 mr-2">
                Active filters:
              </span>
              {sort && (
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm flex items-center">
                  Salary: High to Low
                  <button
                    onClick={() => setSort(false)}
                    className="ml-2 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {search && (
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm flex items-center">
                  Search: {search}
                  <button
                    onClick={() => setSearch("")}
                    className="ml-2 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {(minSalary || maxSalary) && (
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm flex items-center">
                  Salary: {minSalary || "0"} - {maxSalary || "∞"}
                  <button
                    onClick={() => {
                      setMinSalary("");
                      setMaxSalary("");
                    }}
                    className="ml-2 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto mb-6"
      >
        <p className="text-gray-600">
          <span className="font-bold text-blue-600 text-xl">{jobs.length}</span>{" "}
          jobs found
        </p>
      </motion.div>

      {/* Jobs Grid */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {jobs.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {jobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <HotJobsCard job={job} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 text-gray-400 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search filters
                </p>
                <button
                  onClick={() => {
                    setSort(false);
                    setSearch("");
                    setMinSalary("");
                    setMaxSalary("");
                  }}
                  className="btn bg-blue-600 text-white hover:bg-blue-700 border-none"
                >
                  Clear all filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination (if needed later) */}
      {jobs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <div className="join">
            <button className="join-item btn btn-outline">«</button>
            <button className="join-item btn btn-outline btn-active">1</button>
            <button className="join-item btn btn-outline">2</button>
            <button className="join-item btn btn-outline">3</button>
            <button className="join-item btn btn-outline">4</button>
            <button className="join-item btn btn-outline">»</button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AllJob;
