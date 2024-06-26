import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Dashboard = () => {
  const [datas, setData] = useState([]);
  const [posts, setPostData] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`https://api-airtalx.vercel.app/v1/api/userdata`);
        setData(res.data);
      } catch (error) {
        console.error("There was an error fetching the user!", error);
        
      }

      try {
        const res = await axios.get(`https://api-airtalx.vercel.app/v1/api/postjobs`);
        setPostData(res.data);
      } catch (error) {
        console.error("There was an error fetching the jobs!", error);
      }
    };

    fetchJobs();
  }, []);
  // console.log(posts.length);
  const jobSeekers = datas.filter(user => user.role === 'job-seeker');
  const employeer = datas.filter(user => user.role === 'employer');

  // console.log(jobSeekers.length);
  // console.log(employeer.length);

  return (
    <div className=" items-center h-screen ">
      <div className="w-full max-w-4xl p-4 m-5 bg-white bgw rounded-lg shadow-lg">
        <div className="flex justify-between mb-3">
          <div>
            <h2 className="text-2xl"> Total Job Posting </h2>
            <h2> this month</h2>
          </div>
          <div className="text-xl font-semibold">0</div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 ">
        <div className="p-5 border border-base-300 rounded-md">
          <h2 className="text-3xl">Total Jobseeker</h2>
          <p>(This month)</p>
          <h3 className="text-3xl font-bold">{jobSeekers.length}</h3>
          <p className="text-sm mt-2">
            Engage with our growing community of jobseekers.
          </p>
        </div>
        <div className="p-5 border border-base-300 rounded-md">
          <h2 className="text-3xl">Total Employee</h2>
          <p>(This month)</p>
          <h3 className="text-3xl font-bold">{employeer.length}</h3>
          <p className="text-sm mt-2">
            Reach out to employers, enhance their experience.
          </p>
        </div>
      </div>
      <div className="p-5 border border-base-300 mt-4 rounded-md">
        <h2 className="text-3xl">Total Job Postiung</h2>
        <p>(This month)</p>
        <h3 className="text-3xl font-bold">{posts.length}</h3>
        <p className="text-sm mt-2">
          Monitor job market trends, optimize platform performance.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
