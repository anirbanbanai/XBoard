import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../../image/signupin/Feedback.svg";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaUpload } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import ButtonAll from "../button/Button";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import axios from "axios";

const Signup = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  // console.log(`http://localhost:8080`);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password, image, name } = data;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("image", image[0]);

    try {
      const res = await axios.post(
        `https://api-airtalx.vercel.app/v1/api/userdata`,
        formData
      );
      console.log(res);
      await createUserWithEmailAndPassword(auth, email, password);

      Swal.fire({
        position: "top",
        icon: "success",
        title: "Employer signed up successfully",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/verifyotp");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    } catch (error) {
      console.error("Error during signup:", error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Signup failed",
        text: error.message || "Please try again later",
        showConfirmButton: true,
      });
    }
  };
  const onSubmit2 = async (data) => {
    const { email, password, image, name } = data;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("role", "employer");
    formData.append("image", image[0]);

    try {
      const res = await axios.post(
        `https://api-airtalx.vercel.app/v1/api/userdata`,
        formData
      );
      console.log(res);
      await createUserWithEmailAndPassword(auth, email, password);

      Swal.fire({
        position: "top",
        icon: "success",
        title: "Employer signed up successfully",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/verifyotp");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    } catch (error) {
      console.error("Error during signup:", error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Signup failed",
        text: error.message || "Please try again later",
        showConfirmButton: true,
      });
    }
  };

  const fileCompo = (
    <>
      <div className="form-control ">
        <label className="label">
          <span className="font-semibold label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="name"
          className="input input-sm input-bordered rounded-2xl"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="font-semibold label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="email"
          className="input input-sm input-bordered rounded-2xl"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="font-semibold label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="input input-sm input-bordered rounded-2xl"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="font-semibold label-text">Confirm Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="input input-sm input-bordered rounded-2xl"
          {...register("confirmPassword", { required: true })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      {/* <div className="form-control">
        <label className="label">
          <span className="font-semibold label-text">Upload Image</span>
        </label>
        <div className="flex flex-col justify-start ">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            {...register("image", { required: true })}
          />

          <label
            htmlFor="file-upload"
            className="file-input-bordered flex justify-start rounded-2xl p-2 px-5 gap-2 cursor-pointer bg-[#CFEBFF]"
          >
            <FaUpload className="text-xl" />
            <span>Click to upload image</span>
          </label>
        </div>
        {errors.image && (
          <span className="text-red-500">This field is required</span>
        )}
      </div> */}
      <div className="form-control">
        <label className="label">
          <span className="font-semibold label-text">Upload Image</span>
        </label>
        <div className="flex flex-col justify-start">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            {...register("image", { required: true })}
          />
          <label
            htmlFor="file-upload"
            className="file-input-bordered flex justify-start rounded-2xl p-2 px-5 gap-2 items-center cursor-pointer bg-[#CFEBFF]"
          >
            <FaUpload className="text-xs" />
            <span className="!text-xs">Click to upload image</span>
          </label>
        </div>
        {errors.image && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>

      <div className="flex gap-1 mt-3">
        <input
          type="checkbox"
          defaultChecked
          className="checkbox checkbox-success checkbox-xs"
        />
        <label
          htmlFor="remember-me"
          className="label-text  !text-xs cursor-pointer"
        >
          Remember for 30 days
        </label>
      </div>
      <div className="mt-6 form-control">
        <ButtonAll>Sign Up</ButtonAll>
      </div>
    </>
  );

  const handleGoogleLogin = async () => {
    try {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const { user } = result;
        console.log(user.photoURL);
        const rrr = await axios.post(
          `https://api-airtalx.vercel.app/v1/api/userdata`,
          {
            name: user.displayName,
            email: user.email,
            password: "12345678",
            image: user.photoURL,
          }
        );
        // console.log(rrr.data);

        await axios.put(
          `https://api-airtalx.vercel.app/v1/api/userdata/${rrr.data._id}`,
          {
            image: user.photoURL,
          }
        );

        Swal.fire({
          position: "top",
          icon: "success",
          title: "Google SignUp successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/verifyotp");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (error) {
        console.error("Error checking/creating user in MongoDB:", error);
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Error during Google Login",
          text:
            error.response?.data?.message ||
            error.message ||
            "Please try again later",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Google Login failed",
        text: error.message || "Please try again later",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="bg-[#2792A8]/20 max-w-7xl mx-auto">
      <div className="">
        <div className="mb-4 text-center">
          <h1 className="pt-5 text-4xl font-semibold text-[#196D7C]">
            Get Started
          </h1>
          <h2 className="pt-2 mb-2">
            In Our Website you can Sign Up either as an Employer or a Jobseeker
          </h2>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="flex pt-32 pl-20 mx-auto max-md:hidden">
            <img className="w-[400px] h-[312px]" src={img1} alt="" />
          </div>

          <div className="bg-[#eff4f5]   rounded-2xl max-md:p-4 ">
            <div className=" rounded-xl">
              <h1 className="text-3xl font-semibold text-center mt-[40px]">
                Jobseeker Sign Up
              </h1>

              <div className="rounded-lg">
                {/* Tabs */}
                <div className="flex justify-center bg-slate-200  mx-auto rounded-xl p-2 mt-[30px] w-max    relative">
                  <button
                    className={`px-4 py-2  rounded-lg  absolute    focus:!outline-none focus:!border-none bg-blue-400 text-white top-[15%]  w-1/2 duration-300  ${
                      activeTab === 0 ? "left-[2%]" : " left-[48%]"
                    }`}
                    onClick={() => handleTabClick(0)}
                  >
                    {activeTab === 0 ? "I Want a Job" : "I Want to Hire"}
                  </button>
                  <button
                    className={`px-4 py-2 ${
                      activeTab === 0 ? " text-white" : "bg-gray-200"
                    } rounded-lg  focus:!outline-none focus:!border-none`}
                    onClick={() => handleTabClick(0)}
                  >
                    I Want a Job
                  </button>
                  <button
                    className={`px-4 py-2 ${
                      activeTab === 1 ? " text-white" : "bg-gray-200"
                    } rounded-lg  focus:!outline-none`}
                    onClick={() => handleTabClick(1)}
                  >
                    I Want to Hire
                  </button>
                </div>

                {/* Tab Content */}
                <div className="">
                  {activeTab === 0 && (
                    <div>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="card-body"
                      >
                        {fileCompo}
                      </form>

                      <div className="mx-auto  flex max-lg:flex-col lg:justify-center gap-3 mt-10 !bg-[#D9D9D9]/10">
                        <button
                          onClick={handleGoogleLogin}
                          className="mt-3  !border border-gray-300 px-5 py-1 rounded-lg gap-x-2  flex items-center  "
                          // disabled={isPopupOpen}
                        >
                          <FcGoogle className="text-xl" /> Sign Up with Google
                        </button>
                      </div>

                      <div className="mt-[20px] p-3  w-full flex justify-center text-center ">
                        <p className="w-full ml-2 text-center">
                          Already have an account?{" "}
                          <Link to="/login" className=" text-[#20A3BA] ">
                            Login
                          </Link>
                        </p>
                      </div>
                    </div>
                  )}
                  {activeTab === 1 && (
                    <div>
                      <form
                        onSubmit={handleSubmit(onSubmit2)}
                        className="card-body"
                      >
                        {fileCompo}
                      </form>

                      <div className="mx-auto  flex max-lg:flex-col lg:justify-center gap-3 mt-10 !bg-[#D9D9D9]/10">
                        <button
                          onClick={handleGoogleLogin}
                          className="mt-3  !border border-gray-300 px-5 py-1 rounded-lg gap-x-2  flex items-center  "
                          // disabled={isPopupOpen}
                        >
                          <FcGoogle className="text-xl" /> Sign In with Google
                        </button>
                      </div>
                      <div className="mt-[20px] p-3  w-full flex justify-center text-center ">
                        <p className="w-full ml-2 text-center">
                          Already have an account?{" "}
                          <Link to="/login" className=" text-[#20A3BA] ">
                            Login
                          </Link>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
