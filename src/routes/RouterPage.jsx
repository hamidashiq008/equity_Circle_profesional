import React, { useEffect } from "react";
import RegisterPage from "../features/auth/RegisterPage";
import LoginPage from "../features/auth/LoginPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserProfile from "../features/user/UserProfile";
import Home from "../pages/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Education from "../pages/education/Education";
import Joblist from "../pages/Joblist";
import Feeds from "../pages/feeds/Feeds";
import EventCalendar from "../pages/EventCalendar";
import FeedsDetails from "../pages/feeds/FeedsDetails";
import EducationDetails from "../pages/education/EducationDetails";
import PostComments from "../modals/PostComments";
import Job from "../pages/job/Job";
import ApplyJob from "../pages/job/ApplyJob";
import JobDetails from "../pages/job/JobDetails";
import EditJob from "../pages/job/EditJob";
import EditJobSalary from "../pages/job/EditJobSalary";
import EditJobThirdStep from "../pages/job/EditJobThirdStep";


const RouterPage = () => {
  const navigate = useNavigate();

  const userToken = localStorage.getItem("token");
  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Routes>
        {!userToken ? (
          <Route element={<AuthLayout />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/:moiveId" element={<LoginPage />} />
          </Route>
        ) : (
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/feeds" element={<Feeds />} />
            <Route path="/feeds/:id" element={<FeedsDetails />} />
            <Route path="/education" element={<Education />} />
            <Route path="/education/:id" element={<EducationDetails />} />
            <Route path="/joblist" element={<Joblist />} />
            <Route path="/event-calendar" element={<EventCalendar />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/postComments" element={<PostComments />} />
            <Route path="/job" element={<Job />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/apply-Job/:id" element={<ApplyJob />} />
            <Route path="/edit-job/:id" element={<EditJob />} />
            <Route path="/edit-job-salary/:id" element={<EditJobSalary />} />
            <Route path="/edit-job-third-step/:id" element={<EditJobThirdStep />} />
          </Route>
        )}
      </Routes>
    </div>
  );
};

export default RouterPage;
