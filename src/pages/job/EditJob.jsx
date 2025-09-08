import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
const EditJob = () => {
  const [categories, setCategories] = useState([
    "CRYPTO",
    "FITNESS",
    "SALES",
    "BUSSINES",
    "MINDSET",
  ]);
  const location = useLocation();
  const job = location.state.job;
  console.log("edit", job);

  const [jobData, setJobData] = useState({
    main_image_url: job?.main_image_url || "",
    title: job?.title || "",
    short_description: job?.short_description || "",
    subtitle: job?.subtitle || "",
    tags: job?.tags || [],
  });

  const handleInputChanges = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };
  return (
    <div
      className="container text-white p-3"
      style={{ backgroundColor: "#121212", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-center mb-3">
        <h5 className="m-0 text-center">Update Hustle</h5>
      </div>

      {/* Thumbnail */}
      <span className="small text-secondary ">
        Hustle thumbnail (360 × 175 px)
      </span>
      <div className="mb-3 mt-1 text-center">
        <div
          className="border rounded d-flex align-items-center border-secondary justify-content-center overflow-hidden"
          style={{
            height: "300px",
            backgroundColor: "#1e1e1e",
            overflow: "hidden",
          }}
        >
          {jobData?.main_image_url ? (
            <img
              src={jobData?.main_image_url}
              alt=""
              className="edit-job-img"
            />
          ) : null}
        </div>
      </div>

      {/* Category */}
      <div className="mb-3">
        <Form.Label>Select Category*</Form.Label>
        <div className="d-flex flex-wrap gap-2">
          {categories.map((cat, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-pill"
              style={{ backgroundColor: "#2d2d2d", fontSize: "14px" }}
            >
              {cat}
            </span>
          ))}
          <Button
            variant="outline-light"
            className="rounded-circle p-0"
            style={{ width: "30px", height: "30px" }}
          >
            +
          </Button>
        </div>
      </div>

      {/* Title */}
      <Form.Group className="mb-3">
        <Form.Label>Title*</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Enter title"
          className="bg-dark text-white border-secondary"
          value={jobData.title}
          onChange={handleInputChanges}
        />
      </Form.Group>

      {/* Description */}
      <Form.Group className="mb-3">
        <Form.Label>Description*</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          className="bg-dark text-white border-secondary"
          name="description"
          value={jobData.short_description}
          onChange={handleInputChanges}
        />
      </Form.Group>

      {/* Subtitle */}
      <Form.Group className="mb-3">
        <Form.Label>Subtitle*</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter subtitle"
          className="bg-dark text-white border-secondary"
          name="subtitle"
          value={jobData.subtitle}
          onChange={handleInputChanges}
        />
      </Form.Group>

      {/* Tags */}
      <Form.Group className="mb-4">
        <Form.Label>Tags*</Form.Label>
        {jobData.tags ? (
          <div className="tags mb-3 ">
            {jobData.tags.map((tag, index) => (
              <span key={index} className="edit-tags-div">
                {tag.name}
                <Button variant="outline-danger remove-tag-btn" size="sm" onClick={() => handleRemoveTag(tag.id)}><FaTimes /></Button>
              </span>
            ))}
          </div>
        ) : null}
        <Form.Control
          type="text"
          placeholder="Enter tags"
          className="bg-dark text-white border-secondary"
          name="tags"
          onChange={handleInputChanges}
        />
      </Form.Group>

      {/* Submit */}
      <div className="next-btn-div w-100 text-center">

      <Link
        className=" rounded-pill  fw-bold text-white text-decoration-none py-2 px-5 pppp"
        style={{ backgroundColor: "#6c6c6c", border: "none", }}
        to={`/edit-job-salary/${job.id}`}
        state={{ job }}
        >
        NEXT
      </Link>
        </div>
    </div>
  );
};

export default EditJob;
