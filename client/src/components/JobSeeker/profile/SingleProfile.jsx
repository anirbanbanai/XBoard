/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PiHandbagSimpleFill } from "react-icons/pi";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const SingleProfile = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  console.log(user);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `https://api-airtalx.vercel.app/v1/api/userdata/${id}`
        );
        setUser(res.data);
        //   setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the jobs!", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error fetching the jobs",
          icon: "error",
          confirmButtonText: "OK",
        });
        //   setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <div className="m-2 max-w-7xl mx-auto">
        {/* Part 1 */}
        <div className="md:flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div>
              <img
                src={user?.image}
                className="w-10 h-10 rounded-full"
                alt=""
              />
            </div>
            <div>
              <h2 className="text-[24px] font-medium">{user?.name}</h2>
              <div className="flex gap-1 text-[14px]">
                <p>Age: 25</p>
                <p>, Member Since 25 May 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2 */}
        <div className="md:grid grid-cols-3">
          <div className="mt-[24px] grid grid-cols-2 col-span-2">
            <div>
              <div>
                <h2 className="text-[14px]">Email Address</h2>
                <h2 className="text-[16px] text-slate-400">{user?.email}</h2>
              </div>
              <div className="mt-3">
                <h2 className="text-[14px]">Phone Number</h2>
                <h2 className="text-[16px] font-medium">
                  {user?.phone_number || "null"}
                </h2>
              </div>
              <div className="mt-3">
                <h2 className="text-[14px]">Portfolio</h2>
                <h2 className="text-[16px] font-medium">
                  {user?.portfolio || "null"}
                </h2>
              </div>
              <div className="mt-3">
                <h2 className="text-[14px]">Preferred Salary</h2>
                <h2 className="text-[16px] font-medium">
                  {user?.salary || "null"}/hr
                </h2>
              </div>
              <div className="mt-3">
                <h2 className="text-[14px]">Skill</h2>
                <h2 className="text-[16px] font-medium">{user?.skill}</h2>
              </div>
            </div>
            <div>
              <div>
                <h2 className="text-[14px]">Location</h2>
                <h2 className="text-[16px] font-medium">{user?.location}</h2>
              </div>
              <div className="mt-3">
                <h2 className="text-[14px]">Current Job</h2>
                <h2 className="text-[16px] font-medium">{user?.current_job}</h2>
              </div>
              <div className="mt-3">
                <h2 className="text-[14px]">Current Company</h2>
                <h2 className="text-[16px] font-medium">
                  {user?.current_company || "null"}
                </h2>
              </div>
              <div className="mt-3">
                <h2 className="text-[14px]">Preferred Employment</h2>
                <h2 className="text-[16px] font-medium">
                  {user?.employment || "null"}
                </h2>
              </div>
              <div className="mt-3">
                <h2 className="text-[14px]">Skill Level</h2>
                <h2 className="text-[16px] font-medium">{user?.skill_level}</h2>
              </div>
            </div>
          </div>

          <div className="mt-[24px] flex flex-col">
            <h3 className="text-[12px] font-medium mt-5">CV-AironNew-2024</h3>
          </div>
        </div>

        {/* Part 3 */}
        <div className="border border-base-200 rounded-xl p-4 mt-[24px]">
          <h2>Summary</h2>
        </div>

        {/* Part 4 */}
        <div className="border border-base-200 rounded-xl p-4 mt-[24px]">
          <div className="flex gap-3 items-center justify-between">
            <div className="flex gap-2 items-center">
              <PiHandbagSimpleFill className="text-4xl text-[#2792A8]" />
              <div>
                <h2 className="text-[24px]">Experience</h2>
              </div>
            </div>
          </div>
          {/* Experience List */}
          <div className="mt-6">
            {user?.experience?.map((m) => (
              <div
                key={m._id}
                className=" m-3 p-3 border-b-2 border-base-200  grid-cols-2 items-center gap-3"
              >
                <div className="grid grid-cols-2 items-center">
                  <div className="flex gap-3 items-center">
                    <img
                      src="/assets/skill.png"
                      className="w-[72px] h-[72px]"
                      alt=""
                    />
                    <div>
                      <h2 className="text-[20px]">{m.title}</h2>
                      <h2 className="text-[14px]">{m.company}</h2>
                      <h2 className="text-[14px]">{m.start_date}</h2>
                    </div>
                  </div>
                </div>
                <div>{m.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProfile;
