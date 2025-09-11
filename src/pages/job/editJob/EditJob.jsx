import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const EditJob = ({ nextStep, jobData, handleInputChanges, removeTag }) => {
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

  // IMAGE UPLOAD
  const [preview, setPreview] = useState(jobData?.main_image_url || null);
  const fileInputRef = useRef(null);

  // Trigger hidden file input
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file); // create preview link
      setPreview(url);

      // save both the file and preview in parent jobData
      handleInputChanges({ target: { name: "main_image", value: file } });
      handleInputChanges({ target: { name: "main_image_url", value: url } });
    }
  };

  // ADD TAGS

  const [tagField, setTagField] = useState(jobData?.tags || []);

  const handleAddTagsFunc = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tag = e.target.value.trim();
      if (!tag) return;

      const updatedTags = [...jobData.tags, {  name: tag }];
      handleInputChanges({ target: { name: "tags", value: updatedTags } });

      e.target.value = "";
      console.log("tagssssssssssssssssssss", jobData.tags);
    }
  };



  // REMOVE TAGS
  const handleRemoveTag = (id) => {
    const updatedTags = jobData.tags.filter((tag) => tag.id !== id);
    handleInputChanges({ target: { name: "tags", value: updatedTags } });
  }




  return (
    <div
      className="container edit-job-container text-white p-3"
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
            cursor: "pointer",
          }}
          onClick={handleImageClick}
        >
          {jobData.main_image ? (
            <img
              src={preview}   // use preview for display
              alt="Preview"
              className="edit-job-img"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          ) : jobData.main_image_url ? (
            <img
              src={jobData.main_image_url}
              alt="Existing"
              className="edit-job-img"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          ) : (
            <span className="text-white">Click to upload image</span>
          )}
        </div>


        {/* hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
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
          name="short_description"
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
                <Button
                  variant="outline-danger remove-tag-btn"
                  size="sm"
                  onClick={() => handleRemoveTag(tag.id)}
                >
                  <FaTimes />
                </Button>
              </span>
            ))}
          </div>
        ) : null}
        <Form.Control
          type="text"
          placeholder="Enter tags"
          className="bg-dark text-white border-secondary"
          name="tags"
          onKeyDown={handleAddTagsFunc}
        />
      </Form.Group>

      {/* Submit */}
      <div className="next-btn-div w-100 text-end">
        <Link
          className="rounded-pill fw-bold text-white text-decoration-none py-3 px-5 "
          style={{ backgroundColor: "#6c6c6c", border: "none" }}
          onClick={nextStep}
          state={{ job }}
        >
          NEXT
        </Link>
      </div>
    </div>
  );
};

export default EditJob;
