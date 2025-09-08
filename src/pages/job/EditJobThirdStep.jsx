import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";
const EditJobThirdStep = () => {
  const location = useLocation();
  const job = location.state.job;
  const customSections = JSON.parse(job.custom_sections);

  const [formData, setFormData] = useState({
    location: job?.location || "",
    experience: job?.experience || "",
    custom_sections_title: customSections[0].title || "",
    custom_sections_description: customSections[0].description || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
  };

  return (
    <div
      className="container text-white p-3"
      style={{ backgroundColor: "#121212", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="d-flex align-items-center mb-3">
        <FaArrowLeft className="me-2" style={{ cursor: "pointer" }} />
        <h5 className="m-0 text-center flex-grow-1">Update Hustle</h5>
      </div>

      {/* Location */}
      <Form.Group className="mb-3">
        <Form.Label>Location*</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Location*"
          className="bg-dark text-white border-secondary"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Experience */}
      <Form.Group className="mb-3">
        <Form.Label>Experience*</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Experience*"
          className="bg-dark text-white border-secondary"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Job Title */}
      <Form.Group className="mb-3">
        <Form.Label>Job Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Job Title"
          className="bg-dark text-white border-secondary"
          name="jobTitle"
          value={formData.custom_sections_title}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Job Detail */}
      <Form.Group className="mb-4">
        <Form.Label>Job Detail</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter Job Detail"
          className="bg-dark text-white border-secondary"
          name="custom_sections_title"
          value={formData.custom_sections_description}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Buttons */}
      <div className="d-flex justify-content-between">
        <Button
          className="rounded-pill "
          style={{
            backgroundColor: "#1e1e1e",
            border: "none",
            padding: "10px 30px",
          }}
        >
          PREVIOUS
        </Button>
        <Button
          className="rounded-pill  text-dark"
          style={{
            backgroundColor: "#fff",
            border: "none",
            padding: "10px 30px",
          }}
          onClick={handleSubmit}
        >
          UPDATE HUSTLE
        </Button>
      </div>
    </div>
  );
};

export default EditJobThirdStep;
