import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const EditJobSalary = ({ nextStep, prevStep, jobData, handleInputChanges }) => {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const job = location.state.job;

  // const [jobData, setJobData] = useState({
  //   min_salary: job?.min_salary || "",
  //   max_salary: job?.max_salary || "",
  //   currency: job?.currency || "",
  //   plus_extra: job?.plus_extra || "",
  // });
  // console.log("jobData", jobData);
  // const handleInputChanges = (e) => {
  //   setJobData({ ...jobData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = () => {
  //   console.log("Form Data:", jobData);
  // };

  return (
    <div
      className="container edit-job-salary-container text-white p-3 mt-2 rounded"
      style={{ backgroundColor: "#121212", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-center mb-3">
        <h5 className="m-0 text-center">Update Hustle</h5>
      </div>

      {/* Minimum Salary */}
      <Form.Group className="mb-3">
        <Form.Label>Minimum Salary*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter minimum salary"
          className="bg-dark text-white border-secondary"
          name="min_salary"
          value={jobData.min_salary}
          onChange={handleInputChanges}
        />
      </Form.Group>

      {/* Maximum Salary */}
      <Form.Group className="mb-3">
        <Form.Label>Maximum Salary*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter maximum salary"
          className="bg-dark text-white border-secondary"
          name="max_salary"
          value={jobData.max_salary}
          onChange={handleInputChanges}
        />
      </Form.Group>

      {/* Currency */}
      <Form.Group className="mb-3">
        <Form.Label>Currency*</Form.Label>
        <Form.Select
          className="bg-dark text-white border-secondary"
          name="currency"
          value={jobData.currency}
          onChange={handleInputChanges}
        >
          <option value="GBP (£)">GBP (£)</option>
          <option value="USD ($)">USD ($)</option>
          <option value="EUR (€)">EUR (€)</option>
          <option value="PKR (₨)">PKR (₨)</option>
        </Form.Select>
      </Form.Group>

      {/* Extra Bonus */}
      <Form.Group className="mb-4">
        <Form.Label>Extra Bonus</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Extra Bonus"
          className="bg-dark text-white border-secondary"
          name="plus_extra"
          value={jobData.plus_extra}
          onChange={handleInputChanges}
        />
      </Form.Group>

      {/* Buttons */}
      <div className="d-flex justify-content-between">
        <Button
          className="rounded-pill fw-bold"
          style={{
            backgroundColor: "#1e1e1e",
            border: "none",
            padding: "10px 30px",
          }}
          onClick={prevStep}
        >
          PREVIOUS
        </Button>
        <button
          className="rounded-pill fw-bold bg-secondary text-white text-decoration-none"
          style={{
            backgroundColor: "#fff",
            border: "none",
            padding: "10px 30px",
          }}
          onClick={nextStep}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default EditJobSalary;
