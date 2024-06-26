import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuthUser from "../../../../auth/getUser";
import { auth } from "../../../../firebase";
const PostAJob = () => {
  const { user } = useAuthUser(auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const cleanedData = {
      ...data,
      postby: user.name,
    };

    const historyData = {
      designation: data.job_title,
      posted_date: new Date(),
      active: 10,
      awaiting: 5,
      conducting: 2,
      location: data.location,
    };

    // console.log(data);
    // console.log(historyData);

    try {
      // console.log(data);
      await axios.post(`https://api-airtalx.vercel.app/v1/api/postjobs`, cleanedData);

      await axios.post(`https://api-airtalx.vercel.app/v1/api/history`, historyData);

      Swal.fire(
        {
          title: "Success!",
          text: "Job posted successfully",
          icon: "success",
          confirmButtonText: "OK",
        },

        reset()
      );
    } catch (error) {
      console.error("There was an error posting the job!", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error posting the job",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className=" font-semibold">Job Title</span>
          </label>
          <input
            type="text"
            placeholder="job title"
            className="input input-sm input-bordered rounded-2xl"
            {...register("job_title", { required: true })}
          />
          {errors.job_title && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control mt-3">
          <label className="label">
            <span className=" font-semibold">Job Headline</span>
          </label>
          <p className="label-text">Write Compelling Headlines</p>
          <input
            type="text"
            placeholder="Answer"
            className="input input-sm input-bordered rounded-2xl"
            {...register("job_headline", { required: true })}
          />
          {errors.job_headline && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-2">
          <div className="form-control mt-3 ">
            <label>Job Type</label>
            <select
              {...register("job_type")}
              className="  rounded-xl p-1 bg-base-100"
            >
              <option value="part time">part time</option>
              <option value="full time">full time</option>
              <option value="hybridge">hybridge</option>
            </select>
            {errors.job_type && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control mt-3">
            <label>Hour per week</label>
            <select
              {...register("hour_per_week")}
              className="rounded-xl p-1 bg-base-100"
            >
              <option value="40">40</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
            {errors.hour_per_week && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-2 ">
          <div className="form-control mt-3">
            <label className="label">
              <span className=" font-semibold">Company</span>
            </label>

            <input
              type="text"
              placeholder="Answer"
              className="input input-sm input-bordered rounded-2xl"
              {...register("company", { required: true })}
            />
            {errors.job_headline && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="form-control mt-3">
            <label className="label">
              <span className=" font-semibold">Location</span>
            </label>

            <input
              type="text"
              placeholder="Answer"
              className="input input-sm input-bordered rounded-2xl"
              {...register("location", { required: true })}
            />
            {errors.job_headline && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-2 ">
          <div className="form-control mt-3">
            <label className="label">
              <span className=" font-semibold">Industry</span>
            </label>

            <input
              type="text"
              placeholder="Answer"
              className="input input-sm input-bordered rounded-2xl"
              {...register("industry", { required: true })}
            />
            {errors.job_headline && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="form-control mt-3">
            <label className="label">
              <span className=" font-semibold">Size of Company</span>
            </label>

            <input
              type="text"
              placeholder="Answer"
              className="input input-sm input-bordered rounded-2xl"
              {...register("size_of_company", { required: true })}
            />
            {errors.job_headline && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>

        <div className="form-control mt-3">
          <label className="label">
            <span className=" font-semibold">Salary</span>
          </label>
          <p className="label-text">
            How much (US Dollar) do you want to pay per Hour? the salary range
            is between $3.00 and $99.00
          </p>
          <input
            type="text"
            placeholder="Answer"
            className="input input-sm input-bordered rounded-2xl"
            {...register("salary", { required: true })}
          />
          {errors.job_headline && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="form-control mt-3 ">
          <label>Experience Level</label>
          <select
            {...register("experience_level")}
            className="rounded-xl p-1 bg-base-100"
          >
            <option value="6 month">6 month plus</option>
            <option value="1-2 years">1-2 years</option>
            <option value="2 years plus">2 years plus</option>
          </select>
          {errors.experience && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className=" font-semibold">Job Description</span>
          </label>

          <textarea
            className="textarea "
            placeholder="Job description"
            {...register("job_description", { required: true })}
          />
          {errors.job_title && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <button className="btn btn-success mt-6" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostAJob;
