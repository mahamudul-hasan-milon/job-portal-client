import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const JobApply = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(id, user);

  const submitJobApplication = (e) => {
    e.preventDefault();
    const form = e.target;
    const linkedin = form.linkedin.value;
    const github = form.github.value;
    const resume = form.resume.value;

    console.log(linkedin, github, resume);

    const jobApplication = {
      job_id: id,
      applicant_email: user.email,
      linkedin,
      github,
      resume,
    };
    fetch(
      "https://job-portal-server-for-recruiter-mu.vercel.app/job-applications",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(jobApplication),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/myApplications");
        }
      });
  };

  return (
    <div className="card bg-base-100 w-full shadow-2xl my-20">
      <h1 className="text-5xl font-bold text-center">Application Form</h1>
      <form onSubmit={submitJobApplication} className="card-body">
        <fieldset className="fieldset">
          <label className="label">LinkedIn URL</label>
          <input
            type="url"
            className="input"
            placeholder="LinkedIn URL"
            name="linkedin"
          />
          <label className="label">Github URL</label>
          <input
            type="url"
            className="input"
            placeholder="Github URL"
            name="github"
          />
          <label className="label">Resume URL</label>
          <input
            type="url"
            className="input"
            placeholder="Resume URL"
            name="resume"
          />
          <button className="btn btn-neutral mt-4">Apply</button>
        </fieldset>
      </form>
    </div>
  );
};

export default JobApply;
