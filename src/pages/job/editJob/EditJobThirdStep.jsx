import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import axios from "../../../utils/axios";
// import { useLocation, useNavigate } from "react-router-dom";

const EditJobThirdStep = ({ prevStep, jobData, handleInputChanges }) => {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const job = location.state.job;
  // const customSections = JSON.parse(job.custom_sections);

  // const [jobData, setJobData] = useState({
  //   location: job?.location || "",
  //   experience: job?.experience || "",
  //   custom_sections_title: customSections[0].title || "",
  //   custom_sections_description: customSections[0].description || "",
  // });

  // const handleInputChanges = (e) => {
  //   setJobData({ ...jobData, [e.target.name]: e.target.value });
  // };
  
  console.log("Form Data to be sent:", jobData.id);
  const updateJobFunc = async () => {
    // alert("Are you sure you want to update this job?");
    const formData = new FormData();
   
    formData.append("main_image", jobData.main_image);
    formData.append("title", jobData.title);
    formData.append("short_description", jobData.short_description);
    formData.append("subtitle", jobData.subtitle);
    formData.append("tags", JSON.stringify(jobData.tags));
    formData.append("min_salary", jobData.min_salary);
    formData.append("max_salary", jobData.max_salary);
    formData.append("currency", jobData.currency);
    formData.append("plus_extra", jobData.plus_extra);
    formData.append("location", jobData.location);
    formData.append("experience", jobData.experience);
    formData.append("custom_sections", JSON.stringify([
      {
        title: jobData.custom_sections_title,
        description: jobData.custom_sections_description,
      },
    ]));
    try {
      const response = await axios.put(`/jobs/${jobData.id}`, formData , {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Job updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating job:", error);
    }

  };

  return (
    <div
      className="container edit-job-third-step-container text-white p-3 mt-2"
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
          value={jobData.location}
          onChange={handleInputChanges}
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
          value={jobData.experience}
          onChange={handleInputChanges}
        />
      </Form.Group>

      {/* Job Title */}
      <Form.Group className="mb-3">
        <Form.Label>Job Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Job Title"
          className="bg-dark text-white border-secondary"
          name="custom_sections_title"
          value={jobData.custom_sections_title}
          onChange={handleInputChanges}
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
          name="custom_sections_description"
          value={jobData.custom_sections_description}
          onChange={handleInputChanges}
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
          onClick={prevStep}
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
          onClick={updateJobFunc}
        >
          UPDATE HUSTLE
        </Button>
      </div>
    </div>
  );
};

export default EditJobThirdStep;
