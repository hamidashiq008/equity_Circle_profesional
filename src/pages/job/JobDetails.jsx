import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [jobDetailInfo, setJobDetailInfo] = useState({});
  const [customSections, setCustomSections] = useState([]);
  const [like, setLike] = useState(false);

  // Get Job Details
  useEffect(() => {
    const getJobDetailsFunc = async () => {
      try {
        const response = await axios.get(`/jobs/${id}`);
        const job = response.data.job;

        setJobDetailInfo(job);

        // Parse custom sections safely
        if (job?.custom_sections) {
          try {
            const parsed =
              typeof job.custom_sections === "string"
                ? JSON.parse(job.custom_sections)
                : job.custom_sections;
            setCustomSections(parsed);
          } catch (err) {
            console.error("Error parsing custom_sections", err);
            setCustomSections([]);
          }
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load job");
      }
    };
    getJobDetailsFunc();
  }, [id]);

  // Job Like Func
  const jobLikeFunc = async () => {
    if (!jobDetailInfo?.id) return;

    const formData = new FormData();
    formData.append("type", "job");
    formData.append("type_id", jobDetailInfo.id);

    try {
      const response = await axios.post("/fav", formData);

      setLike((prev) => {
        const newState = !prev;
        if (newState) {
          toast.success(response.data.message);
        } else {
          toast.info(response.data.message);
        }
        return newState;
      });

      console.log("Like Response: ", response);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error("Like error: ", error);
    }
  };

  return (
    <div
      className="container earn-detail-container text-white p-4 rounded-4 shadow-sm"
      style={{ backgroundColor: "rgb(24 24 24)", minHeight: "100vh" }}
    >
      <div className="detail-card">
        <div className="img-wrapper">
          <img
            src={jobDetailInfo.main_image_url}
            alt=""
            className="rounded-3"
          />
        </div>

        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-start my-3">
          <div>
            <h5 className="fw-normal">{jobDetailInfo.title}</h5>
            <p className="mt-2 mb-0 text-secondary small">
              {jobDetailInfo.subtitle}
            </p>
            <p className="fw-normal small mb-0 mt-1">
              £{jobDetailInfo.max_salary} – £{jobDetailInfo.min_salary} +{" "}
              {jobDetailInfo.plus_extra}
              <br />
              <span>
                {jobDetailInfo.job_type} · {jobDetailInfo.job_mode} ·{" "}
                {jobDetailInfo.location}
              </span>{" "}
              (Preferred)
            </p>
          </div>

          {/* Like Icon */}
          <div
            className="job-like"
            onClick={jobLikeFunc}
            style={{ fontSize: "20px", cursor: "pointer" }}
          >
            {like ? <FaHeart color="red" /> : <FaRegHeart />}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-secondary small">
            {jobDetailInfo.short_description}
          </p>
        </div>

        {/* Extra Section */}
        {customSections.length > 0 && (
          <div className="mb-4">
            <h6 className="fw-normal">{customSections[0]?.title}</h6>
            <p className="text-secondary small">
              {customSections[0]?.description}
            </p>
          </div>
        )}

        {/* Location */}
        <div className="mb-3">
          <h6 className="fw-normal">Location</h6>
          <p className="text-secondary small">{jobDetailInfo.location}</p>
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

        {/* Apply Job Link */}
        <div className="py-3 px-4">
          <Link
            className="btn w-100 rounded-pill fw-bold text-white"
            style={{ backgroundColor: "#6c6c6c" }}
            to={`/apply-job/${jobDetailInfo.id}`}
            state={{ jobDetailInfo }}
          >
            APPLY NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
