import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";

const AddJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddJob = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());
    const { min, max, currency, ...newJob } = initialData;

    newJob.salaryRange = { min: parseInt(min), max: parseInt(max), currency };
    newJob.requirements = newJob.requirements
      .split("\n")
      .filter((req) => req.trim() !== "");
    newJob.responsibilities = newJob.responsibilities
      .split("\n")
      .filter((res) => res.trim() !== "");
    newJob.applicationCount = 0;
    newJob.postedDate = new Date().toISOString();

    fetch("https://job-portal-server-for-recruiter-mu.vercel.app/jobs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Job posted successfully",
            showConfirmButton: false,
            timer: 1500,
            background: "#fff",
            iconColor: "#2563eb",
          });
          navigate("/myPostedJobs");
        }
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Post a New Job
          </h1>
          <p className="text-gray-600 text-lg">
            Fill in the details below to attract the best candidates
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleAddJob} className="space-y-6">
            {/* Basic Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Title */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Job Title *</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. Senior Software Engineer"
                    name="title"
                    required
                  />
                </div>

                {/* Job Location */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Job Location *
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. Dhaka, Bangladesh"
                    name="location"
                    required
                  />
                </div>

                {/* Job Type */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Job Type *</span>
                  </label>
                  <select
                    name="jobType"
                    className="select select-bordered w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select job type
                    </option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                {/* Job Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Job Field *</span>
                  </label>
                  <select
                    name="jobField"
                    className="select select-bordered w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select job field
                    </option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Teaching">Teaching</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Salary Range Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                Salary Range
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Minimum *</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Min"
                    name="min"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Maximum *</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Max"
                    name="max"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Currency *</span>
                  </label>
                  <select
                    name="currency"
                    className="select select-bordered w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select currency
                    </option>
                    <option value="BDT">BDT (৳)</option>
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Company Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                Company Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Company Name *
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. Google, Microsoft"
                    name="company"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Company Logo URL *
                    </span>
                  </label>
                  <input
                    type="url"
                    className="input input-bordered w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="https://example.com/logo.png"
                    name="company_logo"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Job Details Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                Job Details
              </h2>

              <div className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Job Description *
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-32 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Describe the job role, responsibilities, and ideal candidate..."
                    name="description"
                    required
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Requirements *
                    </span>
                    <span className="label-text-alt text-gray-400">
                      (One per line)
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-32 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Bachelor's degree in Computer Science&#10;5+ years of experience&#10;Strong communication skills"
                    name="requirements"
                    required
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Responsibilities *
                    </span>
                    <span className="label-text-alt text-gray-400">
                      (One per line)
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-32 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Lead development team&#10;Write clean code&#10;Mentor junior developers"
                    name="responsibilities"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* HR Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                HR Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">HR Name *</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. John Doe"
                    name="hr_name"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">HR Email *</span>
                  </label>
                  <input
                    readOnly
                    type="email"
                    defaultValue={user?.email}
                    className="input input-bordered w-full bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    name="hr_email"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Application Deadline *
                    </span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    name="applicationDeadline"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white border-none hover:from-blue-700 hover:to-indigo-700 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
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
                Post Job Now
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddJob;
