/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ButtonAll from "../button/Button";

import useAuthUser from "../../auth/getUser";
import { auth } from "../../firebase";

const JobDetails = () => {
  const { user } = useAuthUser(auth);
  const { id } = useParams();
  console.log(id);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(jobDetails);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `https://api-airtalx.vercel.app/v1/api/postjobs/${id}`
        );
        setJobDetails(res.data);
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

  if (!jobDetails) {
    return <div>No job details found</div>;
  }

  return (
    <div className="mt-7 max-w-6xl mx-auto">
      <div>
        <h3 className="text-4xl font-bold">{jobDetails.job_title}</h3>
        <h4 className="mt-2">
          By <span className="text-blue-500"> {jobDetails.postby}</span>
        </h4>

        <div className="flex gap-3 items-center mt-3 mb-3">
          {/* {user?.role === "job-seeker" && (
            <ButtonAll onClick={() => handleApply(jobDetails._id)}>
              Apply this Job
            </ButtonAll>
          )} */}

          <Link to={`/apply-job/${jobDetails._id}`}>
            <ButtonAll>Apply This Job</ButtonAll>
          </Link>

          {!user && (
            <Link to="/login">
              <ButtonAll>Login to apply this job</ButtonAll>
            </Link>
          )}

          <h3>Copy Link</h3>
        </div>

        <div>
          <h2>Company Name : AB COmpany</h2>
          <h2>Location : India</h2>
          <h2>Industry : Development</h2>
          <h2>Size Of Company : 30-40 stuff</h2>
          <h2>Job Posted: 1</h2>
          <h2>Job Filled: 2</h2>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-3xl font-semibold text-center">Job Details</h2>
        <div className="text-center mx-auto md:grid grid-cols-2">
          <div className="border m-3 p-3">
            <h2>Hour Per week</h2>
            <h1 className="text-2xl font-semibold text-blue-500">
              ${jobDetails.hour_per_week}/hour
            </h1>
          </div>
          <div className="border m-3 p-3">
            <h2>Employment</h2>
            <h1 className="text-2xl font-semibold text-blue-500">
              {jobDetails.job_type}
            </h1>
          </div>
          <div className="border m-3 p-3">
            <h2>Expertise Level</h2>
            <h1 className="text-2xl font-semibold text-blue-500">
              {jobDetails.experience_level}
            </h1>
          </div>
          <div className="border m-3 p-3">
            <h2>Job rate per hour</h2>
            <h1 className="text-2xl font-semibold text-blue-500">30$/hr</h1>
          </div>
        </div>
      </div>
      <div className="my-6">
        <h2 className="text-3xl font-semibold text-center">Job Description</h2>
        <div className="!p-4 bg-[#ecf7f4]">
          {jobDetails.job_description}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
