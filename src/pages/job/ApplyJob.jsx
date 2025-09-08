import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

const ApplyJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const applyForJobWithCV = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("job_title", jobTitle);
      formData.append("linkedin_profile", linkedin);
      formData.append("cv", file);
      formData.append("job_id", id);

      if (file) {
        const response = await axios.post("/job-application", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // ✅ Success toast
        toast.success("Application submitted successfully!");
        console.log(response);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      // ❌ Error toast
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 px-3"
      style={{
        background: "linear-gradient(to bottom, #000, #111, #000)",
        color: "#fff",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "450px",
          width: "100%",
          background: "rgba(20,20,20,0.9)",
          border: "1px solid #333",
          borderRadius: "16px",
        }}
      >
        {/* Header */}
        <small className="text-uppercase text-secondary fw-semibold">
          Applying For
        </small>
        <h4 className="fw-normal mb-4 mt-1 text-white">
          FITNESS HUSTLE TESTING
        </h4>

        {/* Job Title */}
        <div className="mb-3">
          <label className="form-label text-uppercase text-secondary small">
            Job Title
          </label>
          <input
            type="text"
            placeholder="Your current job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="form-control bg-dark text-white border-0"
            style={{
              borderRadius: "10px",
              padding: "12px",
            }}
          />
        </div>

        {/* LinkedIn */}
        <div className="mb-3">
          <label className="form-label text-uppercase text-secondary small">
            LinkedIn Profile
          </label>
          <input
            type="text"
            placeholder="https://linkedin.com/in/username"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="form-control bg-dark text-white border-0"
            style={{
              borderRadius: "10px",
              padding: "12px",
            }}
          />
        </div>

        {/* Upload CV */}
        <div className="mb-3">
          <label className="form-label text-uppercase text-secondary small">
            Upload Your CV
          </label>
          <div
            className="border border-secondary rounded d-flex flex-column align-items-center justify-content-center p-4 text-center"
            style={{
              borderStyle: "dashed",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "#6f42c1")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "#6c757d")
            }
          >
            <input
              type="file"
              accept=".pdf"
              className="d-none"
              id="cvUpload"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label
              htmlFor="cvUpload"
              className="w-100 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer"
            >
              <span style={{ fontSize: "2rem" }}>📄</span>
              <p className="mt-2 mb-1 fw-medium text-secondary">
                {file ? file.name : "Click to upload your CV"}
              </p>
              <small className="text-secondary ">
                Supported: PDF, DOC, DOCx
              </small>
            </label>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="text-white small d-flex align-items-start mt-3">
          <span className="me-2 ">🔒</span>
          <p className="content-wrapper">
            Your information is kept private and will only be used to respond to
            your application. See our{" "}
            <a href="#" className="text-decoration-none text-info ms-1">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* Apply Button */}
        <div className=" py-3 px-4">
          <button
            className="btn w-100 rounded-pill fw-bold text-white"
            style={{
              backgroundColor: "#6c6c6c",
            }}
            onClick={applyForJobWithCV}
            disabled={loading || !file || !jobTitle || !linkedin}
          >
            {loading ? "Applying..." : "APPLY NOW"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
