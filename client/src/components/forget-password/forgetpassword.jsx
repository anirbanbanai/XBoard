import React from "react";
import img1 from "../../image/signupin/Login.svg";
// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust the path as needed
import ButtonAll from "../button/Button";

const Forgetpassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function handleResetPassword(data) {
    try {
      await sendPasswordResetEmail(auth, data.email);
      alert("Check your email for the password reset link");
      reset();
    } catch (error) {
      console.error("Error sending password reset email", error);
      alert("Failed to send password reset email");
    }
  }

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 bg-[#a4e8f9]">
      <div className="mx-auto flex items-center max-md:hidden">
        <img src={img1} alt="Login" />
      </div>
      <div className="bg-[#eff4f5] p-3 rounded-xl">
        <h1 className="text-3xl font-semibold">Reset Password</h1>
        <h2>
          Enter your Email Address, we will send you the reset Password Link{" "}
        </h2>
        <form
          className="card-body"
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered rounded-2xl"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>
          <ButtonAll type="submit">Reset Pasword</ButtonAll>
        </form>
      </div>
    </div>
  );
};

export default Forgetpassword;
