/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoBagHandle } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FiDollarSign } from "react-icons/fi";
import { CiCalendarDate, CiClock2 } from "react-icons/ci";
import moment from "moment";
import { useForm } from "react-hook-form";
import ButtonAll from "../button/Button";
import useAuthUser from "../../auth/getUser";
import { auth } from "../../firebase";

const JobApply = () => {
  const navigate = useNavigate();
  const {user} = useAuthUser(auth);
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState([]);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
   
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const {subject,message,contact_info} = data;
    const res = await axios.get(`http://localhost:8080/v1/api/postjobs/${id}`);
    const { job_title, job_type, job_description,_id } = res?.data;
    const alldata = {
      employer_name: user?.name,
      job_title,
      job_type,
      job_post: job_description,
      status: "active",
      subject,
      message,
      contact_info
    };

    console.log(alldata);

    const po = await axios.post(
      `http://localhost:8080/v1/api/application`,
      alldata
    );
    if (po?.data) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Your apply job saved",
        showConfirmButton: false,
        timer: 1500,
      },
    reset());
    navigate(`/apply-success/${_id}`);
    }

  };


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/v1/api/postjobs/${id}`
        );
        setJob(res.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the jobs!", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error fetching the jobs",
          icon: "error",
          confirmButtonText: "OK",
        });
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // const handleApply = async (id) => {
   
  // };

  return (
    <div className="mt-5 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-semibold"> {job.job_headline}</h2>
        <h4>
          By <span className="text-blue-500">{job.postby}</span>
        </h4>
      </div>

      <div className="flex gap-3 mt-5">
        <div className="flex gap-2 items-center border border-base-300 rounded-xl px-4 py-2">
          <div>
            <IoBagHandle className="text-2xl" />
          </div>
          <div>
            <h2>Type of work</h2>
            <h2 className="text-[24px] font-semibold">Full Time</h2>
          </div>
        </div>

        <div className="flex gap-2 items-center border border-base-300 rounded-xl px-4 py-2">
          <div>
            <FiDollarSign className="text-2xl" />
          </div>
          <div>
            <h2>Salary</h2>
            <h2 className="text-[24px] font-semibold">${job.salary}</h2>
          </div>
        </div>

        <div className="flex gap-2 items-center border border-base-300 rounded-xl px-4 py-2">
          <div>
            <CiClock2 className="text-2xl" />
          </div>
          <div>
            <h2>Hour per week</h2>
            <h2 className="text-[24px] font-semibold">{job.hour_per_week}</h2>
          </div>
        </div>

        <div className="flex gap-2 items-center border border-base-300 rounded-xl px-4 py-2">
          <div>
            <CiCalendarDate className="text-2xl" />
          </div>
          <div>
            <h2>Date Posted</h2>
            <h2 className="text-[24px] font-semibold">
              {moment(job.createdAt).format("MMMM Do YYYY,")}
            </h2>
          </div>
        </div>
      </div>
      
      <div className="bg-[#EDF7F4] mt-5 p-4 ">
       <h2 className="text-3xl font-semibol text-blue-500"> Job description</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Subject</span>
            </label>
            <input
              type="text"
              placeholder="SUbject"
              className="input input-sm input-bordered rounded-2xl"
              {...register("subject", { required: "Subject is required" })}
            />
            {errors.subject && (
              <span className="text-red-500">{errors.subject.message}</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Message</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              {...register("message", { required: "Message is required" })}
              placeholder="Message"
            />

            {errors.subject && (
              <span className="text-red-500">{errors.subject.message}</span>
            )}
          </div>

          <div className="form-control">
            <div className="flex justify-between">
              <label className="label">
                <span className="label-text font-semibold">Contact Info</span>
              </label>
            </div>
            <input
              type="text"
              placeholder="Contact info"
              className="input input-sm input-bordered rounded-2xl"
              {...register("contact_info", {
                required: "Contact info is required",
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="form-control mt-6">

            <ButtonAll type="submit">
                Send By Mail
            </ButtonAll>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApply;
