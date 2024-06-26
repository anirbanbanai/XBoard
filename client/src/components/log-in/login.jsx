import React, { useState } from "react";
import img1 from "../../image/signupin/Login.svg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import ButtonAll from "../button/Button";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      navigate("/"); // Redirect to the desired route after successful login
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Login failed",
        text: error.message || "Please try again later",
        showConfirmButton: true,
      });
    }
  };

  const handleGoogleLogin = async () => {
    if (isPopupOpen) return; // Prevent multiple popups

    setIsPopupOpen(true); // Set popup state to true

    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Login Success:", result.user);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Google Login successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/"); // Redirect to the desired route after successful login
    } catch (error) {
      console.error("Error during Google login:", error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Google Login failed",
        text: error.message || "Please try again later",
        showConfirmButton: true,
      });
    } finally {
      setIsPopupOpen(false); // Reset popup state
    }
  };

  return (
    <div className="grid max-w-7xl mx-auto md:grid-cols-2 bg-[#cdf1fa] min-h-[80vh]">
      <div className="flex items-center pl-20 mx-auto max-md:hidden">
        <img src={img1} alt="Login illustration" />
      </div>
      <div className="bg-white max-w-[680px] max-h-[660px] textw grid sm:grid-cols-3 p-4 rounded-3xl">
        <div className="col-span-2 pl-3 rounded-xl">
          <h1 className="text-3xl font-semibold text-start text-[#333333]">
            Welcome back!
          </h1>
          <h2 className="mt-2 font-medium text-start text-[#333333]">
            Enter your credentials to access your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="form-control">
              <label className="label">
                <span className="font-semibold label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="!bg-white input input-sm input-bordered rounded-2xl"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="form-control">
              <div className="flex justify-between">
                <label className="label">
                  <span className="font-semibold label-text">Password</span>
                </label>
                <label className="label !text-xs">
                  <Link to="/forgetpassword">
                    <span className="label-text !text-xs !text-[#0C2A92] font-medium">
                      Forget Password?
                    </span>
                  </Link>
                </label>
              </div>
              <input
                type="password"
                placeholder="Password"
                className="input input-sm !bg-white input-bordered rounded-2xl"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <div className="flex items-center gap-1 mt-3 cursor-pointer">
              <input
                type="checkbox"
                id="remember-me"
                defaultChecked
                className="checkbox checkbox-success checkbox-xs"
              />
              <label
                htmlFor="remember-me"
                className="label-text  !text-xs cursor-pointer"
              >
                Remember me for 30 days
              </label>
            </div>
            <div className="mt-6 form-control">
              <ButtonAll type="submit">Login</ButtonAll>
            </div>
          </form>
          <div className="mx-auto  flex max-lg:flex-col lg:justify-center gap-3 mt-10 !bg-white">
            <button
              onClick={handleGoogleLogin}
              className="mt-3  !bg-white !border border-gray-300 px-5 py-1 rounded-lg gap-x-2  flex items-center"
              disabled={isPopupOpen}
            >
              <FcGoogle className="text-xl" /> Sign In with Google
            </button>
          </div>
          <div className="flex justify-center w-full mt-5">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#20A3BA] font-semibold">
                Sign-up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
