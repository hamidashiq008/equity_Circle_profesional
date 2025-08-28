import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from '../utils/axios';

const CreatePostModal = ({ show, onHide }) => {
    // Create Post Form Data
    const [formField, setFormField] = useState({
        title: "",
        description: "",
        images: [],
        category_id: "1",
        visibility: "public"
    });

    // Handle text input change
    const formDataHolder = (e) => {
        setFormField({ ...formField, [e.target.name]: e.target.value });
    };

    // Handle file input change
    // const handleFileChange = (e) => {
    //     setFormField({ ...formField, images: e.target.files[0] }); // only first file
    // };
    const handleFileChange = (e) => {
        setFormField({ ...formField, images: Array.from(e.target.files) });
    };

    // Create Post Api Call
    const createPostApiCall = async (e) => {
        e.preventDefault();

        const createPostFormData = new FormData();
        createPostFormData.append('title', formField.title);
        createPostFormData.append('description', formField.description);
        // if (formField.images) {
        //     createPostFormData.append('images[]', formField.images);
        // }
        if (formField.images && formField.images.length > 0) {
            formField.images.forEach((file) => {
                createPostFormData.append('images[]', file); // ✅ loop for all images
            });
        }

        createPostFormData.append('category_id', formField.category_id);
        createPostFormData.append('visibility', formField.visibility);

        try {
            const response = await axios.post('/posts', createPostFormData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert("Post created successfully!");
            onHide(); // Close modal after success
            setFormField({
                title: "",
                description: "",
                image: [],
                category_id: "1",
                visibility: "public"
            }); // reset form
        } catch (err) {
            console.error(err);
            alert("Error in creating post");
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Post
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={createPostApiCall}>
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
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Post Description</label>
                        <textarea
                            name="description"
                            className="form-control"
                            value={formField.description}
                            onChange={formDataHolder}
                            required
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Post Image</label>
                        <input
                            type="file"
                            name="images"
                            className="form-control"
                            onChange={handleFileChange}
                            accept="image/*"
                            multiple />
                    </div>

                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePostModal;
