import React, { useState, useEffect, useRef } from "react";
import axios from "../../utils/axios";
import { FaEllipsisH, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Earn = () => {
  const [jobList, setJobList] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [showMenu, setShowMenu] = useState(null);
  const [jobCategories, setJobCategories] = useState([]);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const toggleMenu = (jobId) => {
    setShowMenu(showMenu === jobId ? null : jobId);
  };

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Fetch Jobs * Api Call *

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/jobs");
        setJobList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

  // ✅ Toggle Read More / Less
  const toggleReadMore = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ✅ Get Job Categories * Api Call *
  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        const response = await axios.get("/job-categories");
        setJobCategories(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobCategories();
  }, []);

  return (
    <div className="container my-3">
      <div className="d-flex gap-3 align-items-center  jobs-categories">
        {jobCategories?.map((category) => {
          return (
            <div
              className="card text-white mb-3 px-3 py-2 rounded-3 shadow-sm flex-wrap"
              style={{ backgroundColor: "rgb(24 24 24)" }}
              key={category.id}
            >
              <h6 className="fw-bold m-0">{category.name}</h6>
            </div>
          );
        })}
      </div>
      <div className="get-jobs-cards">
        {jobList?.jobs?.data?.map((job) => {
          const isExpanded = expanded[job.id];
          const desc = job.short_description || "";

          return (
            <div
              className="card text-white mb-3 p-3 rounded-4 shadow-sm job-search-card "
              style={{ backgroundColor: "rgb(24 24 24)" }}
              key={job.id}
            >
              {/* Top Section */}
              <div className="d-flex gap-3 align-items-center">
                <img
                  src={
                    job.user?.profile_image_url ||
                    "https://via.placeholder.com/50"
                  }
                  className="rounded-circle"
                  width="45"
                  height="45"
                  alt="profile"
                />

                <div className="w-100 d-flex justify-content-between">
                  <div className="d-flex gap-2">
                    <h6 className="fw-bold m-0">{job.title}</h6>
                    <small className="text-secondary">
                      @{job.posted_by || "Admin"}
                    </small>
                  </div>

                  {/* Dropdown Menu */}
                  <div className="position-relative" ref={menuRef}>
                    <FaEllipsisH
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleMenu(job.id)}
                    />
                    {showMenu === job.id && (
                      <div
                        className="dropdown-menu show job-edit-delete-menu"
                        style={{
                          position: "absolute",
                          right: 0,
                          zIndex: 1000,
                          backgroundColor: "#2d2d2d",
                          borderRadius: "8px",
                          padding: "8px 0",
                          minWidth: "140px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}
                      >
                        <button
                          className="dropdown-item d-flex align-items-center gap-2 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Edit job:", job.id);
                            setShowMenu(null);
                          }}
                        >
                          <FaEdit />
                          <span>Edit</span>
                        </button>
                        <div
                          className="dropdown-divider my-1"
                          style={{ borderColor: "#444" }}
                        ></div>
                        <button
                          className="dropdown-item d-flex align-items-center gap-2 text-danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (
                              window.confirm(
                                "Are you sure you want to delete this job?"
                              )
                            ) {
                              console.log("Delete job:", job.id);
                              // 🔥 Add your delete API call here
                            }
                            setShowMenu(null);
                          }}
                        >
                          <FaTrash />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ✅ Description with line clamp */}
              <div
                className="about-job-detail"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/earn/${job.id}`)}
              >
                <p
                  className={`mt-2 mb-0 text-secondary small position-relative ${
                    isExpanded ? "" : "line-clamp"
                  }`}
                >
                  {desc}
                  {desc.length > 0 && (
                    <span
                      className="text-info small ms-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleReadMore(job.id)}
                    >
                      {isExpanded ? "Read less" : "... Read more"}
                    </span>
                  )}
                </p>

                {/* Tags */}
                <div className="d-flex flex-wrap gap-2 text-secondary small mt-2">
                  <span>{job.job_type || "Remote"}</span> ·{" "}
                  <span>{job.experience || "N/A"}</span> ·{" "}
                  <span>{job.employment_type || "Full-time"}</span>
                </div>

                {/* Salary */}
                <div className="fw-bold mt-2">
                  £{job.max_salary} – £{job.min_salary}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Earn;
