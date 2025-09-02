import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "../utils/axios";
import { FaTimes } from "react-icons/fa";
const CreatePostModal = ({ show, onHide }) => {
  const [sendPostLoading, setSendPostLoading] = useState(false);
  // Create Post Form Data
  const [formField, setFormField] = useState({
    title: "",
    description: "",
    files: [], // ✅ only one array for all file types
    category_id: "1",
    visibility: "public",
  });

  // Handle text input change
  const formDataHolder = (e) => {
    setFormField({ ...formField, [e.target.name]: e.target.value });
  };

  // Handle all files (images, videos, docs in one input)
  const handleFileChange = (e) => {
    setFormField({ ...formField, files: Array.from(e.target.files) });
  };

  // Remove selected file
  const handleRemoveFile = (index) => {
    const newFiles = [...formField.files];
    newFiles.splice(index, 1);
    setFormField({ ...formField, files: newFiles });
  };

  // Create Post Api Call
  const createPostApiCall = async (e) => {
    e.preventDefault();
    setSendPostLoading(true);
    const createPostFormData = new FormData();
    createPostFormData.append("title", formField.title);
    createPostFormData.append("description", formField.description);

    // ✅ Append all files
    if (formField.files.length > 0) {
      formField.files.forEach((file) => {
        if (file.type.startsWith("image/")) {
          createPostFormData.append("images[]", file);
        } else if (file.type.startsWith("video/")) {
          createPostFormData.append("videos[]", file);
        } else if (file.type.startsWith("application/pdf")) {
          createPostFormData.append("documents[]", file);
        } else if (file.type.startsWith("text/plain")) {
          createPostFormData.append("documents[]", file);
        }
      });
    }

    createPostFormData.append("category_id", formField.category_id);
    createPostFormData.append("visibility", formField.visibility);
    {
      tagField.forEach((tag) => {
        createPostFormData.append("tags[]", tag);
      });
    }
    try {
      await axios.post("/posts", createPostFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Post created successfully!");
      onHide(); // Close modal after success
      setFormField({
        title: "",
        description: "",
        files: [],
        category_id: "1",
        visibility: "public",
      }); // reset form
    } catch (err) {
      console.error(err);
      alert("Error in creating post");
    }
  };
  const [tagField, setTagField] = useState([]);
  const handleKeyDownFunc = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault(); // Prevent form submission
    const tag = e.target.value.trim();
    if (!tag) return;
    setTagField([...tagField, tag]);
    e.target.value = "";
  };
  const handleRemoveTag = (index) => {
    const newTags = [...tagField];
    newTags.splice(index, 1);
    setTagField(newTags);
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="create-post-modal-main-wrapper"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!sendPostLoading ? (
          <form onSubmit={createPostApiCall}>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Post Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formField.title}
                onChange={formDataHolder}
                required
              />
              {formField.title.length > 0 && formField.title.length < 10 && (
                <div className="text-danger mt-2">
                  Title should be at least 10 characters
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Post Description</label>
              <textarea
                name="description"
                className="form-control"
                value={formField.description}
                onChange={formDataHolder}
                required
              ></textarea>
              {formField.description.length > 0 &&
                formField.description.length < 100 && (
                  <div className="text-danger mt-2">
                    Description should be at least 100 characters
                  </div>
                )}
            </div>

            {/* File Input */}
            <div className="mb-3">
              <label className="form-label">Upload Files</label>
              <input
                type="file"
                name="files"
                className="form-control"
                onChange={handleFileChange}
                accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                multiple
              />
            </div>

            {/* ✅ File Preview Section with Remove Button + Doc Preview */}
            {formField.files.length > 0 && (
              <div className="mb-3">
                <h6>Preview:</h6>
                <div className="d-flex flex-wrap gap-3">
                  {formField.files.map((file, index) => {
                    const fileURL = URL.createObjectURL(file);

                    return (
                      <div
                        key={index}
                        className="position-relative border rounded p-1"
                        style={{
                          width: "180px",
                          height: "150px",
                          overflow: "hidden",
                        }}
                      >
                        {/* Remove Button */}
                        <button
                          type="button"
                          className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 z-index-"
                          style={{ zIndex: 99 }}
                          onClick={() => handleRemoveFile(index)}
                        >
                          ❌
                        </button>

                        {/* File Preview */}
                        {file.type.startsWith("image/") ? (
                          <img
                            src={fileURL}
                            alt={file.name}
                            width="100%"
                            height="100%"
                            className="rounded"
                            style={{ objectFit: "cover" }}
                          />
                        ) : file.type.startsWith("video/") ? (
                          <video
                            width="100%"
                            height="100%"
                            autoPlay
                            controls
                            className="rounded"
                          >
                            <source src={fileURL} type={file.type} />
                            Your browser does not support video preview.
                          </video>
                        ) : file.type === "application/pdf" ? (
                          <iframe
                            src={fileURL}
                            title={file.name}
                            width="100%"
                            height="100%"
                            style={{ border: "none" }}
                          />
                        ) : file.type === "text/plain" ? (
                          <iframe
                            src={fileURL}
                            title={file.name}
                            width="100%"
                            height="100%"
                            style={{ border: "none" }}
                          />
                        ) : (
                          //     <iframe
                          //     src={`https://docs.google.com/gview?url=${fileURL}&embedded=true`}
                          //     width="100%"
                          //     height="150"
                          //     title={file.name}
                          //   />
                          <div className="p-2 bg-light rounded text-truncate text-center">
                            📄 {file.name}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Add Tags</label>
              <input
                type="text"
                name="tags"
                className="form-control"
                onKeyDown={handleKeyDownFunc}
              />
            </div>
            {tagField.length > 0 && (
              <div className="mb-3">
                <label className="form-label">Tags</label>
                <div className="d-flex flex-wrap gap-2">
                  {tagField.map((tag, index) => (
                    <div className="tag-div" key={index}>
                      <div className="mt-2 tag-content-div">
                        <span className="badge-wrapper  text-white mt-2">
                          {tag}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger remove-tag-btn"
                        onClick={() => handleRemoveTag(index)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form>
        ) : (
          <div>
            <h6>Post is being created...</h6>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={createPostApiCall} variant="primary">
          Submit
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePostModal;
