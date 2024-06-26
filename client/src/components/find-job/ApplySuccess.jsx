/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CiCalendarDate, CiClock2 } from "react-icons/ci";
import { FiDollarSign } from "react-icons/fi";
import { IoBagHandle } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import img1 from "../../image/Back To School.svg";
import ButtonAll from "../button/Button";
const ApplySuccess = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  console.log(data);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/v1/api/postjobs/${id}`
        );
        setData(res.data);
        // setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the jobs!", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error fetching the jobs",
          icon: "error",
          confirmButtonText: "OK",
        });
        // setLoading(false);
      }
    };

    fetchJobs();
  }, []);
  return (
    <div className="mt-5 max-w-6xl mx-auto">
      <div className="mx-auto flex gap-3 mt-5">
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
            <h2 className="text-[24px] font-semibold">${data.salary}</h2>
          </div>
        </div>

        <div className="flex gap-2 items-center border border-base-300 rounded-xl px-4 py-2">
          <div>
            <CiClock2 className="text-2xl" />
          </div>
          <div>
            <h2>Hour per week</h2>
            <h2 className="text-[24px] font-semibold">{data.hour_per_week}</h2>
          </div>
        </div>

        <div className="flex gap-2 items-center border border-base-300 rounded-xl px-4 py-2">
          <div>
            <CiCalendarDate className="text-2xl" />
          </div>
          <div>
            <h2>Date Posted</h2>
            <h2 className="text-[24px] font-semibold">
              {moment(data.createdAt).format("MMMM Do YYYY,")}
            </h2>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-center text-green-500 mt-2 text-2xl font-semibold">
          You are all Set!
        </h2>
        <img className="mx-auto" src={img1} alt="" />
       <Link to="/find-job" className="flex justify-center mt-4 mb-4">
       <ButtonAll>Back to find Job</ButtonAll>
       </Link>
      </div>
    </div>
  );
};

export default ApplySuccess;
