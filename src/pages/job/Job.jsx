import React, { useState, useEffect, useRef } from "react";
import axios from "../../utils/axios";
import { FaEllipsisH, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SplitButton from "react-bootstrap/SplitButton";
const Job = () => {
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
        console.log(response.data);
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

  // Edit job Function

  // Delete job func
  const deleteJobFunc = async (id) => {
    alert("Are you sure you want to delete this job?");
    console.log("del id", id);
    try {
      const response = await axios.delete(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("job deleted SuccessFly");
      setShowMenu(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container my-3">
      <div className="d-flex gap-3 align-items-center jobs-categories">
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
                    <h6 className="fw-normal m-0">{job.title}</h6>
                    <small className="text-secondary">
                      @{job.posted_by || "Admin"}
                    </small>
                  </div>

                  {/* Dropdown Menu */}

                  <DropdownButton
                    id="dropdown-item-button"
                    className="job-edit-delete-dropdown"
                    title={<FaEllipsisH />}
                  >
                    <Dropdown.Item as="button">
                      <Link
                        className="dropdown-item d-flex align-items-center gap-2 text-white"
                        to={`/edit-job/${job.id}`}
                        state={{ job }}
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item as="button">
                      {" "}
                      <div
                        className="dropdown-divider my-1"
                        style={{ borderColor: "#444" }}
                      ></div>
                    </Dropdown.Item>

                    <Dropdown.Item as="button">
                      <div
                        className="dropdown-item d-flex align-items-center gap-2 text-danger"
                        onClick={(e) => deleteJobFunc(job.id)}
                      >
                        <FaTrash />
                        <span>Delete</span>
                      </div>
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>

              {/* ✅ Description with line clamp */}
              <div>
                <div className="position-relative mb-2">
                  <Link
                    className={`mt-2 mb-0 text-secondary small text-decoration-none about-job-detail ${
                      isExpanded ? "" : "line-clamp"
                    }`}
                    // className="about-job-detail "
                    style={{ cursor: "pointer" }}
                    to={`/job/${job.id}`}
                    state={{ job }}
                  >
                    {desc}
                  </Link>
                  {desc.length > 0 && (
                    <span
                      className="text-info small ms-1 position-absolute bottom-0"
                      style={{
                        cursor: "pointer",
                        right: "0",
                        background: "#181818",
                      }}
                      onClick={() => toggleReadMore(job.id)}
                    >
                      {isExpanded ? "Read less" : "... Read more"}
                    </span>
                  )}
                </div>

                {/* Tags */}
                <Link
                  className="d-flex flex-wrap gap-2 text-secondary small mb-2 text-decoration-none about-job-detail"
                  style={{ cursor: "pointer" }}
                  to={`/job/${job.id}`}
                  state={{ job }}
                >
                  <span>{job.job_type || "Remote"}</span> ·{" "}
                  <span>{job.experience || "N/A"}</span> ·{" "}
                  <span>{job.employment_type || "Full-time"}</span>
                </Link>

                {/* Salary */}
                <Link
                  className="fw-normal mt-3 text-white text-decoration-none about-job-detail"
                  style={{ cursor: "pointer" }}
                  to={`/earn/${job.id}`}
                  state={{ job }}
                >
                  {job.currency}
                  {job.max_salary} – {job.currency}
                  {job.min_salary}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Job;
