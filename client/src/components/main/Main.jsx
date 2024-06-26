
import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineForwardToInbox, MdShoppingBag } from "react-icons/md";
import { GoInbox } from "react-icons/go";
import {
  FaAmazonPay,
  // FaAmazonPay,
  FaBookReader,
  FaCcAmazonPay,
  FaHospitalUser,
  FaRegEdit,
  FaSearchengin,
  FaShoppingBag,
} from "react-icons/fa";
import { IoLogOutOutline, IoReloadOutline } from "react-icons/io5";
import { BsBarChartLine } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { BiSolidEditAlt } from "react-icons/bi";

import FindJob from "../find-job/FindJob";
import Application from "../JobSeeker/Application";
import FindEmploye from "../find-employee/FindEmploye";
import Dashboard from "../admin/dashboard/Dashboard";
import Payment from "../JobSeeker/Payment";
import WorkHistory from "../workhistory/WorkHistory";
import Postblog from "../admin/Postblog/Postblog";
import PostAJob from "../admin/dashboard/postAJobs/PostAJob";
import User from "../user/User";
import AdminBlog from "../admin/blog/AdminBlog";
import JobApplication from "../application/JobApplication";
import Billing from "../billing/Billing";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Message from "../message/Message";
import GoogleAnalytics from "../GoogleAnalytics,jsx/GoogleAnalytics";
import EditContent from "../edit-content/EditContent";
import AdminViewEmploye from "../find-employee/AdminView";

// Tab data
const adminTabs = [
  { id: "Tab1", label: "Dashboard", icon: LuLayoutDashboard },
  { id: "Tab2", label: "Inbox", icon: MdOutlineForwardToInbox },
  { id: "Tab3", label: "Post a Jobs", icon: GoInbox },
  { id: "Tab4", label: "Job Applicant", icon: FaSearchengin },
  { id: "Tab5", label: "My Jobs", icon: MdShoppingBag },
  { id: "Tab6", label: "My Employee", icon: FaHospitalUser },
  { id: "Tab7", label: "History", icon: IoReloadOutline },
  { id: "Tab8", label: "Payment", icon: FaCcAmazonPay },
  { id: "Tab9", label: "User", icon: CiUser },
  { id: "Tab10", label: "Post a Blog", icon: FaRegEdit },
  { id: "Tab11", label: "Blog", icon: FaBookReader },
  { id: "Tab12", label: "Google Analytics", icon: BsBarChartLine },
  { id: "Tab13", label: "Edit Content", icon: BiSolidEditAlt },
];

const employerTabs = [
  { id: "Tab1", label: "Dashboard", icon: LuLayoutDashboard },
  { id: "Tab2", label: "Inbox", icon: MdOutlineForwardToInbox },
  { id: "Tab3", label: "Post a Jobs", icon: GoInbox },
  { id: "Tab4", label: "Job Applicant", icon: FaSearchengin },
  { id: "Tab5", label: "My Jobs", icon: MdShoppingBag },
  { id: "Tab6", label: "My Employee", icon: FaHospitalUser },
  { id: "Tab7", label: "History", icon: IoReloadOutline },
  { id: "Tab8", label: "Billing", icon: FaCcAmazonPay },
];

const jobSeekerTabs = [
  { id: "Tab1", label: "Dashboard", icon: LuLayoutDashboard },
  { id: "Tab2", label: "Inbox", icon: MdOutlineForwardToInbox },
  { id: "Tab3", label: "All Jobs", icon: GoInbox },
  { id: "Tab4", label: "Application", icon: FaShoppingBag },
  { id: "Tab5", label: "Work History", icon: IoReloadOutline },
  { id: "Tab6", label: "Payment", icon: FaAmazonPay },
];




// Sidebar component
const Sidebar = ({ tabs, activeTab, handleTabClick }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await signOut(auth);
          Swal.fire({
            title: "Logged out!",
            text: "You have successfully logged out.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            navigate("/login"); // Redirect to login page after logout
          });
        } catch (error) {
          console.error("Error logging out:", error);
        }
      }
    });
  };

  return (
    <div className="w-20 md:w-[240px] h-fit shadow-lg mx-auto textw rounded-2xl my-10 md:m-9 overflow-y-auto " style={{border: '0.5px'}}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`p-4 cursor-pointer hover:bg-[#f4f5ff] ${
            activeTab === tab.id ? "bg-[#f4f5ff] bgw font-bold text-[#0049fc]" : " text-[#60656e]"
          }`}
          onClick={() => handleTabClick(tab.id)}
        >
          <h2 className="flex items-center max-md:justify-center gap-x-2 text-[14px]">
            <tab.icon className="text-2xl md:text-xl text-[#60656e]" />
            <span className="hidden md:inline">{tab.label}</span>
          </h2>
        </div>
      ))}
      <div className="p-4 cursor-pointer" onClick={handleLogout}>
        <h2 className="flex items-center max-md:justify-center gap-2 text-[14px] text-red-500">
          <IoLogOutOutline className="text-2xl md:text-xl" /> <span className="hidden md:inline">LogOut</span>
        </h2>
      </div>
    </div>
  );
};

// Dashboard Layout
const DashboardLayout = ({ tabs, activeTab, handleTabClick, children }) => (
  <div className="flex max-w-7xl mx-auto">
    <Sidebar tabs={tabs} activeTab={activeTab} handleTabClick={handleTabClick} />
    <div className="flex-1  overflow-y-auto">{children}</div>
  </div>
);

// Admin Dashboard
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <DashboardLayout tabs={adminTabs} activeTab={activeTab} handleTabClick={handleTabClick}>
      {activeTab === "Tab1" && <Dashboard />}
      {activeTab === "Tab2" && <Message/>}
      {activeTab === "Tab3" && <PostAJob />}
      {activeTab === "Tab4" && <JobApplication/>}
      {activeTab === "Tab5" && <FindJob />}
      {activeTab === "Tab6" && <AdminViewEmploye />}
      {activeTab === "Tab7" && <WorkHistory />}
      {activeTab === "Tab8" && <Payment />}
      {activeTab === "Tab9" && <p><User/></p>}
      {activeTab === "Tab10" && <Postblog />}
      {activeTab === "Tab11" && <AdminBlog />}
      {activeTab === "Tab12" && <GoogleAnalytics />}
      {activeTab === "Tab13" && <EditContent/>}
      {/* Add more content for other tabs as needed */}
    </DashboardLayout>
  );
};

// Employee Dashboard
const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState("Tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <DashboardLayout tabs={employerTabs} activeTab={activeTab} handleTabClick={handleTabClick}>
      {activeTab === "Tab1" && <p><Dashboard/></p>}
      {activeTab === "Tab2" && <Message/>}
      {activeTab === "Tab3" && <PostAJob />}
      {activeTab === "Tab4" && <JobApplication/>}
      {activeTab === "Tab5" && <FindJob />}
      {activeTab === "Tab6" && <FindEmploye />}
      {activeTab === "Tab7" && <WorkHistory />}
      {activeTab === "Tab8" && <Billing />}
      {/* Add more content for other tabs as needed */}
    </DashboardLayout>
  );
};

// Job Seeker Dashboard
const JobSeekerDashboard = () => {
  const [activeTab, setActiveTab] = useState("Tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  

  return (
    <DashboardLayout tabs={jobSeekerTabs} activeTab={activeTab} handleTabClick={handleTabClick}>
      {activeTab === "Tab1" && <p><Dashboard/></p>}
      {activeTab === "Tab2" && <Message/>}
      {activeTab === "Tab3" && <FindJob />}
      {activeTab === "Tab4" && <Application />}
      {activeTab === "Tab5" && <div><WorkHistory/></div>}
      {activeTab === "Tab6" && <div><Payment/></div>}
      {/* Add more content for other tabs as needed */}
    </DashboardLayout>
  );
};

export { JobSeekerDashboard, AdminDashboard, EmployeeDashboard };
