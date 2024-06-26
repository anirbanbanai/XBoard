import React from "react";
import img1 from "../image/Global.svg";
import img2 from "../image/Meeting.svg";
import img3 from "../image/user-check.svg";
import img4 from "../image/shield-check.svg";
import img5 from "../image/globe.svg";
import img6 from "../image/hiringpart/Frame 21.svg";
import img7 from "../image/hiringpart/Frame 21 (1).svg";
import img8 from "../image/hiringpart/Frame 21 (2).svg";
import img9 from "../image/hiringpart/Frame 21 (3).svg";
import img10 from "../image/hiringpart/Frame 21 (4).svg";
import { CiCircleCheck } from "react-icons/ci";

import ButtonAll from "./button/Button";
import { Link } from "react-router-dom";
import useAuthUser from "../auth/getUser";
import { auth } from "../firebase";
const Home = () => {
  const { user } = useAuthUser(auth);
  return (
    <div className="w-full mx-auto mt-4 overflow-hidden">
      <div className="justify-center max-w-5xl gap-1 p-4 py-20 mx-auto md:flex tems-center">
        <div className="max-w-[528px] mx-auto">
          <h2 className="text-[40px] font-semibold text-[#287180] textw">
            {" "}
            One of the Trusted Talent Marketplaces in the Philippines.
          </h2>
          <p className="text-[20px] my-4 text-[#333333] textw textw">
            Experience where talent meets opportunity, on a global scale.
          </p>
          <div className="mt-4">
            {!user && (
              <Link to="/login">
                <ButtonAll>Get Started</ButtonAll>
              </Link>
            )}

            {user?.role === "admin" && (
              <Link to="/admin-dashboard">
                <ButtonAll>Get Started</ButtonAll>
              </Link>
            )}
            {user?.role === "employer" && (
              <Link to="/employee-dashboard">
                <ButtonAll>Get Started</ButtonAll>
              </Link>
            )}
            {user?.role === "job-seeker" && (
              <Link to="/jobseeker-dashboard">
                <ButtonAll>Get Started</ButtonAll>
              </Link>
            )}
          </div>
        </div>
        <div className="m-auto ">
          <img className="w-[412px] h-[275px]" src={img1} alt="" />
        </div>
      </div>

      <div className=" w-screen p-4  mx-auto bg-[#edf7f4] bgw">
        <h1 className="text-[36px] font-semibold  text-center text-[#287180] textw">
          Why Us?
        </h1>
        <h3 className="text-xl text-center textw">
          From all of the platforms, these are some of the reason for you to
          choose our platform
        </h3>

        <div className="grid md:grid-cols-2 gap-[57px] max-w-5xl  mx-auto items-center mt-6">
          <div className="mx-auto ">
            <img className="w-[402px] h-[273px]" src={img2} alt="" />
          </div>

          <div className="flex flex-col mt-3 gap-y-6">
            <h3 className="text-[12px] textw flex gap-1 items-center">
              <span>
                <CiCircleCheck className="text-lg text-[#0EA66A]" />
              </span>{" "}
              All of your given datas will be safe and secured
            </h3>

            <h3 className="text-[12px] textw mt-2 flex  gap-2 ">
              <span>
                <CiCircleCheck className="text-lg text-[#0EA66A]" />
              </span>{" "}
              <span className="flex justify-start">
                Easy and safe payment methods via your bank accounts
              </span>
            </h3>

            <h3 className="text-[12px] textw flex gap-2 mt-2">
              <span>
                <CiCircleCheck className="text-lg text-[#0EA66A]" />
              </span>{" "}
              Access to a wide range of a job opportunities across various
              industries and locations
            </h3>
            <h3 className="text-[12px] textw flex gap-2 mt-2">
              <span>
                <CiCircleCheck className="text-lg text-[#0EA66A]" />
              </span>{" "}
              Professional support and guidance throughout your job search
              journey
            </h3>
            <h3 className="text-[12px] textw flex gap-2 mt-2">
              <span>
                <CiCircleCheck className="text-lg text-[#0EA66A]" />
              </span>{" "}
              Regular updates on the latest job openings and trends in the job
              market
            </h3>
            <h3 className="text-[12px] textw flex gap-2 mt-2">
              <span>
                <CiCircleCheck className="text-lg text-[#0EA66A]" />
              </span>{" "}
              Opportunities for skill development and career advancement
            </h3>
            <h3 className="text-[12px] textw flex gap-2 mt-2">
              <span>
                <CiCircleCheck className="text-lg text-[#0EA66A]" />
              </span>{" "}
              Interactive tools and resources to enhance your job search
              experience
            </h3>
          </div>
        </div>
      </div>

      <div className="grid max-w-4xl px-4 mx-auto mt-20 md:grid-cols-3 gap-x-8">
        <div className="bg-[#EDF7F4] flex flex-col py-5 text-center bgw px-4 rounded-lg shadow-md items-center justify-center">
          <img
            className="lg:w-[60%] ml-[7%] lg:ml-[14%] flex-grow   "
            src={img3}
            alt=""
          />
          <h2 className="text-lg font-semibold text-[#333333] textw">
            Strong User Privacy
          </h2>
          <p className="text-[12px] textw">
            User’s privacy is always our first priority
          </p>
        </div>

        <div className="bg-[#EDF7F4] flex flex-col py-5 px-4 bgw text-center  rounded-lg shadow-md">
          <img className="lg:w-[60%] flex-grow mx-auto " src={img4} alt="" />
          <h2 className="w-full text-lg font-semibold text-center text-[#333333] textw">
            User Friendly Experience
          </h2>
          <p className="text-[12px] textw text-center">
            Our platform is very easy to use
          </p>
        </div>

        <div className="bg-[#EDF7F4] flex flex-col py-5 text-center bgw px-4  rounded-lg shadow-md">
          <img className="lg:w-[60%] flex-grow mx-auto " src={img5} alt="" />
          <h2 className="text-lg font-semibold text-[#333333] textw">
            World Wide Service
          </h2>
          <p className="text-[12px] textw">Hire your staff from any country</p>
        </div>
      </div>

      <div className="mt-20 mb-20 text-center max-w-[960px]   mx-auto">
        <h1 className="text-4xl font-semibold text-[#196D7C] textw">
          Hiring Process
        </h1>
        <p className="mt-2 text-xl text-[#333333] textw">
          Hire part-time or full-time workers in the worldwide with our easy to
          use all in one platform{" "}
        </p>

        <div className="grid gap-3 mt-4 text-center md:grid-cols-3">
          <div className="mt-3">
            <img className="mx-auto" src={img6} alt="" />
            <h2 className="text-4xl text-[#333333] textw font-semibold">
              Post Job
            </h2>
            <p className="text-[12px] text-[#333333] textw">
              Create your free job post and start receiving Applicants within
              ours
            </p>
          </div>
          <div className="mt-3">
            <img className="mx-auto" src={img7} alt="" />
            <h2 className="text-4xl text-[#333333] textw font-semibold">
              Hire Staffs
            </h2>
            <p className="text-[12px] text-[#333333] textw">
              Choose who you want to hire for your project
            </p>
          </div>
          <div className="mt-3">
            <img className="mx-auto" src={img8} alt="" />
            <h2 className="text-4xl text-[#333333] textw font-semibold">
              Staff Work Policy
            </h2>
            <p className="text-[12px] text-[#333333] textw">
              You decide when and how your staff works
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3 w-[80%] mx-auto mt-4 text-center">
          <div className="mt-3">
            <img className="mx-auto" src={img9} alt="" />
            <h2 className="text-4xl text-[#333333] textw font-semibold">
              Pay Your Staff
            </h2>
            <p className="text-[12px] text-[#333333] textw">
              Pay your staff with a click of a button
            </p>
          </div>
          <div className="mt-3">
            <img className="mx-auto" src={img10} alt="" />
            <h2 className="text-4xl text-[#333333] textw font-semibold">
              Get your output
            </h2>
            <p className="text-[12px] text-[#333333] textw">
              Get the promised output from your staffs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
