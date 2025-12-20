import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const MyApplications = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // fetch(`http://localhost:3000/job-application?email=${user.email}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setJobs(data);
    //   });

    axios
      .get(`http://localhost:3000/job-application?email=${user.email}`, {
        withCredentials: true,
      })
      .then((res) => console.log(setJobs(res.data)));
  }, [user.email]);

  return (
    <div>
      <h2 className="w-10/12 ml-4 mt-4 text-3xl text-red-800 bg-amber-300 border-2 rounded-2xl p-5 mb-16">
        My Applications: {jobs.length}
      </h2>
      <div className="overflow-x-auto">
        <h2 className="text-2xl font-semibold">Application List</h2>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="font-bold text-gray-900">Name</th>
              <th className="font-bold text-gray-900">Job</th>
              <th className="font-bold text-gray-900">Shift</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {jobs.map((job) => (
              <tr key={job._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={job.company_logo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{job.title}</div>
                      <div className="text-sm opacity-50">{job.location}</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span>
                </td>
                <td>Day/Night</td>
                <th>
                  <button className="btn btn-ghost btn-xs">Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;
