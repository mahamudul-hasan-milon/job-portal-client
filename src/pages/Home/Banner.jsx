import { motion } from "framer-motion";
import team1 from "../../assets/team1.jpg";
import team2 from "../../assets/team2.jpg";

const Banner = () => {
  return (
    <div className="hero min-h-screen bg-linear-to-br from-blue-50 to-indigo-50">
      <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl mx-auto px-4 gap-12">
        {/* Images Section */}
        <div className="flex-1 relative">
          <div className="relative flex flex-col items-center">
            {/* First Image */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <img
                src={team1}
                alt="Team member"
                className="w-72 h-96 object-cover rounded-2xl shadow-2xl border-4 border-white"
              />
            </motion.div>

            {/* Second Image */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="relative -mt-20 ml-20"
            >
              <img
                src={team2}
                alt="Team collaboration"
                className="w-72 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white"
              />
            </motion.div>

            {/* Stats Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-4 -left-4 bg-white px-4 py-2 rounded-lg shadow-lg"
            >
              <p className="font-bold text-blue-600">10K+ Jobs</p>
            </motion.div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 space-y-6">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold"
          >
            ⚡ Find Your Dream Job
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            <span className="text-gray-800">Browse </span>
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Thousands
            </span>
            <br />
            <span className="text-gray-800">of Jobs Near You</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Connect with top companies and find the perfect role that matches
            your skills and experience.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button className="btn bg-blue-600 text-white hover:bg-blue-700 border-none px-8 py-3 text-lg rounded-xl shadow-lg">
              Browse Jobs
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>

            <button className="btn bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg rounded-xl">
              Post a Job
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-8 pt-6"
          >
            <div>
              <p className="text-2xl font-bold text-blue-600">10K+</p>
              <p className="text-sm text-gray-500">Active Jobs</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">5K+</p>
              <p className="text-sm text-gray-500">Companies</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">50K+</p>
              <p className="text-sm text-gray-500">Job Seekers</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
