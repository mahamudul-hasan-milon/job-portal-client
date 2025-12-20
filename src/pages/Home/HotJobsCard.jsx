import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";

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
  } = job;
  return (
    <div className="card bg-base-100 shadow-2xl">
      <div className="flex gap-2 m-2">
        <figure>
          <img className="w-16" src={company_logo} alt="Shoes" />
        </figure>
        <div>
          <h4 class="text-2xl">{company}</h4>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt /> {location}
          </p>
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">New</div>
        </h2>
        <p>{description}</p>
        <div className="flex gap-2 flex-wrap">
          {requirements.map((skill, index) => (
            <p
              key={index}
              className="border rounded-md text-center px-2 hover:text-purple-800 hover:bg-amber-200"
            >
              {skill}
            </p>
          ))}
        </div>
        <div className="card-actions justify-end items-center mt-4">
          <p className="flex items-center">
            Salary: <TbCurrencyTaka /> {salaryRange.min} - {salaryRange.max}{" "}
            {salaryRange.currency}
          </p>
          <Link to={`/jobs/${_id}`}>
            <button className="btn btn-primary">Apply</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotJobsCard;
