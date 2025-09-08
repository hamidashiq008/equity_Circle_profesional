import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditJobSalary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state.job;
  const [jobSalaryData, setJobSalaryData] = useState({
    min_salary: job?.min_salary || "",
    max_salary: job?.max_salary || "",
    currency: job?.currency || "",
    plus_extra: job?.plus_extra || "",
  });
  console.log("jobSalaryData", jobSalaryData);
  const handleChange = (e) => {
    setJobSalaryData({ ...jobSalaryData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form Data:", jobSalaryData);
  };

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
          value={jobSalaryData.min_salary}
          onChange={handleChange}
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
          value={jobSalaryData.max_salary}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Currency */}
      <Form.Group className="mb-3">
        <Form.Label>Currency*</Form.Label>
        <Form.Select
          className="bg-dark text-white border-secondary"
          name="currency"
          value={jobSalaryData.currency}
          onChange={handleChange}
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
          value={jobSalaryData.plus_extra}
          onChange={handleChange}
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
          onClick={() => {
            localStorage.removeItem("job2"); // only key needed
            localStorage.setItem("job1", "1");
          }}
        >
          PREVIOUS
        </Button>
        <Link
          className="rounded-pill fw-bold bg-secondary text-white text-decoration-none"
          style={{
            backgroundColor: "#fff",
            border: "none",
            padding: "10px 30px",
          }}
          onClick={() => {
            localStorage.setItem("job3", "3");
            localStorage.removeItem("job2"); // only key needed
          }}
          state={{ job }}
        >
          NEXT
        </Link>
      </div>
    </div>
  );
};

export default EditJobSalary;
