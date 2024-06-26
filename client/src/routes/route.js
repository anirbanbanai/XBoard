import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/log-in/login";
import Signup from "../components/sign-up/signup";
import Forgetpassword from "../components/forget-password/forgetpassword";
import VerifyOTP from "../components/forget-password/verifyotp";
import About from "../components/about-us/about";
import Contactus from "../components/contact-us/contactus";
import Pricing from "../components/pricing/Pricing";
import FAQ from "../components/FAQ/faq";
import FindJob from "../components/find-job/FindJob";
import FindEmploye from "../components/find-employee/FindEmploye";
import Sidebar from "../components/sidebar/Sidebar";
import {
  JobSeekerDashboard,
  AdminDashboard,
  EmployeeDashboard,
} from "../components/main/Main";
import AdminBlog from "../components/admin/blog/AdminBlog";
import JobSeekerProfile from "../components/JobSeeker/profile/JobSeekerProfile";
import JobDetails from "../components/find-job/JobDetails";
import SingleBlog from "../components/admin/blog/SingleBlog";
import AdminView from "../components/find-employee/AdminView";
import JobApply from "../components/find-job/JobApply";
import ApplySuccess from "../components/find-job/ApplySuccess";
import ResetPin from "../components/forget-password/ResetPin";
import SingleProfile from "../components/JobSeeker/profile/SingleProfile";
import Payment from "../components/JobSeeker/Payment";
import Payment2 from "../components/JobSeeker/TryPayment";

const RouteA = () => {
  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment2" element={<Payment2 />} />

        <Route path="/jobseeker-dashboard" element={<JobSeekerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/reset-pin" element={<ResetPin />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-job/:id" element={<JobDetails />} />
        <Route path="/apply-job/:id" element={<JobApply />} />
        <Route path="/apply-success/:id" element={<ApplySuccess />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/verifyotp" element={<VerifyOTP />} />
        <Route path="/adminview" element={<AdminView />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contactus />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route
          path="/find-job"
          element={
            <div className="px-32">
              <FindJob />
            </div>
          }
        />
        <Route
          path="/find-employee"
          element={
            <div className="px-32">
              <FindEmploye />
            </div>
          }
        />

        <Route
          path="/profile"
          element={
            <div className="px-3 md:px-32">
              <JobSeekerProfile />
            </div>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <div className="px-3 md:px-32">
              <SingleProfile />
            </div>
          }
        />

        <Route path="/sidebar" element={<Sidebar />} />
        <Route
          path="/blog"
          element={
            <div className="max-w-4xl mt-5 mx-auto">
              <AdminBlog />
            </div>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <div className="max-w-4xl mt-5 mx-auto">
              <SingleBlog />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export { RouteA };
