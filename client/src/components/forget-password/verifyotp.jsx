import React from "react";
import img1 from "../../image/signupin/Login.svg";
import ButtonAll from "../button/Button";
import { useForm } from "react-hook-form";
import axios from "axios";

const VerifyOTP = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  function handleOtp(data) {
    axios
      .get(`https://api-airtalx.vercel.app/v1/api/otp/verify-otp/${data.otp}`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          window.location.href = "/";
        } else {
          alert("Invalid OTP");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    try {
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 bg-[#a4e8f9]">
      <div className="mx-auto flex items-center max-md:hidden">
        <img src={img1} alt="" />
      </div>
      <div className="bg-[#eff4f5] p-3 rounded-xl">
        <h1 className="text-3xl font-semibold">Verify Your OTP</h1>
        <h2>
          We have already sent you the OTP, kindly check your Inbox or spam.{" "}
        </h2>
        <form className="card-body" onSubmit={handleSubmit(handleOtp)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">OTP</span>
            </label>
            <input
              type="text"
              placeholder="OTP"
              className="input input-bordered rounded-2xl"
              {...register("otp", { required: true })}
            />
            {errors.otp && <span>This field is required</span>}
          </div>

          <ButtonAll>Submit</ButtonAll>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
