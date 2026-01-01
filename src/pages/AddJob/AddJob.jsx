import React from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const AddJob = () => {
  const { user } = useAuth();

  const handleAddJob = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    // console.log(formData.entries);
    const initialData = Object.fromEntries(formData.entries());
    // console.log(initialData);
    const { min, max, currency, ...newJob } = initialData;
    console.log(min, max, currency, newJob);
    newJob.salaryRange = { min: parseInt(min), max: parseInt(max), currency };
    newJob.requirements = newJob.requirements.split("\n");
    newJob.responsibilities = newJob.responsibilities.split("\n");
    console.log(newJob);

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
            position: "top-end",
            icon: "success",
            title: "Job added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          Navigate("/myPostedJobs");
        }
      });
  };

  return (
    <div>
      <h2 class="text-3xl">Post a New Job</h2>
      <form onSubmit={handleAddJob} className="card-body my-6 p-7">
        {/* job title */}
        <div class="form-control">
          <label className="label">Job Title</label>
          <br />
          <input
            type="text"
            className="input"
            placeholder="Job Title"
            name="title"
            required
          />
        </div>
        {/* job location */}
        <div class="form-control">
          <label className="label">Job Location</label>
          <br />
          <input
            type="text"
            className="input"
            placeholder="Job Location"
            name="location"
            required
          />
        </div>
        {/* job type */}
        <div class="form-control">
          <label className="label">Job Type</label>
          <br />
          <select
            defaultValue="Pick a Job Type"
            className="select select-ghost"
          >
            <option disabled>Pick a Job Type</option>
            <option>Full-Time</option>
            <option>Intern</option>
            <option>Part-Time</option>
          </select>
        </div>
        {/* job Field */}
        <div class="form-control">
          <label className="label">Job Field</label>
          <br />
          <select
            defaultValue="Pick a Job Field"
            className="select select-ghost"
          >
            <option disabled>Pick a Job Field</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Finance</option>
            <option>Teaching</option>
          </select>
        </div>
        {/* Salary Range */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
          <div class="form-control">
            <label className="label">Salary Range</label>
            <br />
            <input
              type="number"
              className="input"
              placeholder="Min"
              name="min"
              required
            />
          </div>
          <div class="form-control">
            <input
              type="number"
              className="input"
              placeholder="Max"
              name="max"
              required
            />
          </div>
          <div class="form-control">
            <select
              defaultValue="Currency"
              name="currency"
              className="select select-ghost"
            >
              <option disabled>Currency</option>
              <option>BDT</option>
              <option>USD</option>
              <option>INR</option>
            </select>
          </div>
        </div>
        {/* job description */}
        <div class="form-control">
          <label className="label">Job Description</label>
          <br />
          <textarea
            className="textarea"
            placeholder="Job Description"
            name="description"
            required
          ></textarea>
        </div>
        {/* Company Name */}
        <div class="form-control">
          <label className="label">Company Name</label>
          <br />
          <input
            type="text"
            className="input"
            placeholder="Company Name"
            name="company"
            required
          />
        </div>
        {/* requirements */}
        <div class="form-control">
          <label className="label">Job Requirements</label>
          <br />
          <textarea
            className="textarea"
            placeholder="Put each requirements in a new line"
            name="requirements"
            required
          ></textarea>
        </div>
        {/* job responsibilities */}
        <div class="form-control">
          <label className="label">Job Responsibilities</label>
          <br />
          <textarea
            className="textarea"
            placeholder="Write each responsibility in a new line"
            name="responsibilities"
            required
          ></textarea>
        </div>
        {/* HR Name */}
        <div class="form-control">
          <label className="label">HR Name</label>
          <br />
          <input
            type="text"
            className="input"
            placeholder="HR Name"
            name="hr_name"
            required
          />
        </div>
        {/* HR Email */}
        <div class="form-control">
          <label className="label">HR Email</label>
          <br />
          <input
            readOnly
            type="text"
            defaultValue={user?.email}
            className="input"
            placeholder="HR Email"
            name="hr_email"
            required
          />
        </div>
        {/* Application Deadline */}
        <div class="form-control">
          <label className="label">Deadline</label>
          <br />
          <input
            type="date"
            className="input"
            placeholder="Deadline"
            name="applicationDeadline"
            required
          />
        </div>
        {/* Company Logo URL */}
        <div class="form-control">
          <label className="label">Company Logo URL</label>
          <br />
          <input
            type="text"
            className="input"
            placeholder="Company Logo URL"
            name="logo_url"
            required
          />
        </div>
        {/* submit button */}
        <div class="form-control mt-6">
          <button className="btn btn-neutral">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
