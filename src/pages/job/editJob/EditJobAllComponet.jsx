import React, { useState, useEffect } from "react";
import EditJobSalary from "./EditJobSalary";
import EditJobThirdStep from "./EditJobThirdStep";
import EditJob from "./EditJob";
import { useLocation } from "react-router-dom";

const EditJobAllComponet = () => {

  // next and previous step logic
  const [jobStep, setJobStep] = useState(localStorage.getItem("jobStepCount") || "1");

  useEffect(() => {
    localStorage.setItem("jobStepCount", jobStep);
  }, [jobStep]);

  const nextStep = () => {
    setJobStep((prev) => String(Math.min(Number(prev) + 1, 3)));
  };

  const prevStep = () => {
    setJobStep((prev) => String(Math.max(Number(prev) - 1, 1)));
  };

  // EDIT JOB GLOBAL STATE

  const location = useLocation();
  const job = location.state.job;
  const customSections = JSON.parse(job.custom_sections);

  const [jobData, setJobData] = useState({

    // edit job data
    main_image_url: job?.main_image_url || "",
    main_image: null, // for actual file upload
    title: job?.title || "",
    short_description: job?.short_description || "",
    subtitle: job?.subtitle || "",
    tags: job?.tags || [],
    id: job?.id || null,
    // edit job salary data
    min_salary: job?.min_salary || "",
    max_salary: job?.max_salary || "",
    currency: job?.currency || "",
    plus_extra: job?.plus_extra || "",

    // edit job third step data
    location: job?.location || "",
    experience: job?.experience || "",
    custom_sections_title: customSections[0].title || "",
    custom_sections_description: customSections[0].description || "",
  });
  const handleInputChanges = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };
  console.log("jobData in all component", jobData.main_image);

  // EDIT JOB All FUNCTIONs

  // handle image selection

  // const handleImageSelect = (file) => {
  //   const previewUrl = URL.createObjectURL(file);
  //   setJobData((prev) => ({
  //     ...prev,
  //     main_image_url: previewUrl, // for preview
  //     imageFile: file,           // actual file for API
  //   }));
  // };

  // REMOVE TAGS
  const removeTag = (id) => {
    setJobData({
      ...jobData,
      tags: jobData.tags.filter((_, index) => index !== id),
    });
  }

  return (
    <>
      {jobStep === "1" && <EditJob nextStep={nextStep} jobData={jobData} handleInputChanges={handleInputChanges} />}
      {jobStep === "2" && (
        <EditJobSalary nextStep={nextStep} prevStep={prevStep} jobData={jobData} handleInputChanges={handleInputChanges} />
      )}
      {jobStep === "3" && <EditJobThirdStep prevStep={prevStep} jobData={jobData} handleInputChanges={handleInputChanges} />}
    </>
  );
};

export default EditJobAllComponet;
