// src/pages/feeds/FeedsDetails.jsx
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  FaRegHeart,
  FaUserFriends,
  FaBriefcase,
  FaGlobe,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EarnDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const job = location.state?.job;
  console.log("Hamid", job);
  const [jobDetail, setJobDetail] = useState(job);
  const customSections = JSON.parse(jobDetail.custom_sections);

  // Apply for job
  const applyForJob = async () => {
    navigate(`/earn-apply/${id}`);
  };

  // Job Like Func
  const jobLikeFunc = async () => {
  //   try {
  //     const response = await axios.post(`/fav`, );
  //   } catch (error) {
      
  //   }
  };
  return (
    <div
      className="container earn-detail-container text-white p-4 rounded-4 shadow-sm"
      style={{ backgroundColor: "rgb(24 24 24)", minHeight: "100vh" }}
    >
      <div className="detail-card">
        <div className="img-wrapper">
          <img src={jobDetail.main_image_url} alt="" className="rounded-3" />
        </div>
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-start my-3">
          <div>
            <h5 className="fw-normal">{jobDetail.title}</h5>

            <p className="mt-2 mb-0 text-secondary small">
              {jobDetail.subtitle}
            </p>
            <p className="fw-normal small mb-0 mt-1">
              £{jobDetail.max_salary} – £{jobDetail.min_salary} +{" "}
              {jobDetail.plus_extra}
              <br />
              <span>
                {jobDetail.job_type} · {jobDetail.job_mode} ·{" "}
                {jobDetail.location}, {jobDetail.location}
              </span>
              (Preferred)
            </p>
          </div>

          <FaRegHeart
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={jobLikeFunc}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-secondary small">{jobDetail.short_description}</p>
        </div>

        {/* Extra Section */}
        <div className="mb-4">
          <h6 className="fw-normal">{customSections[0].title}</h6>
          <p className="text-secondary small">
            {customSections[0].description}
          </p>
        </div>

        {/* Location */}
        <div className="mb-3">
          <h6 className="fw-normal">Location</h6>
          <p className="text-secondary small">
            {jobDetail.location}, {jobDetail.location}
          </p>
          <div className="rounded-3 overflow-hidden">
            <iframe
              title="Job Location"
              src="https://maps.google.com/maps?q=Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="200"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Apply Button */}
        <div className=" py-3 px-4">
          <button
            className="btn btn-dark w-100 rounded-pill fw-bold"
            onClick={applyForJob}
          >
            APPLY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default EarnDetail;
