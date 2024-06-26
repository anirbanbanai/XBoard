/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useState, useEffect } from "react";

const Application = () => {
  const [appli, setAppli] = useState([]);
 console.log(appli);


  const [currentPage, setCurrentPage] = useState(1);
  const [runningJobs, setRunningJobs] = useState(0);
  const [completeJobs, setCompleteJobs] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    // Calculate running and complete jobs whenever data changes
    const running = appli.filter((item) => item.status === "Active").length;
    const complete = appli.filter((item) => item.status === "Inactive").length;
    setRunningJobs(running);
    setCompleteJobs(complete);
  }, [appli]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`https://api-airtalx.vercel.app/v1/api/application`);
        setAppli(res.data);
      } catch (error) {
        console.error("There was an error fetching the user!", error);
      }
    };


    fetchJobs();
  }, []);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Logic for displaying current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = appli.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(appli.length / itemsPerPage);

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h2>Running Job: {runningJobs}</h2>
        <h2>Total Complete Job: {completeJobs}</h2>
      </div>
      <h2 className="text-right text-xl mt-2 mb-2 font-semibold">
        My Job Application
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 ">No.</th>
              <th className="py-2 px-4 ">Employer</th>
              <th className="py-2 px-4 ">Job Title</th>
              <th className="py-2 px-4 ">Job Type</th>
              <th className="py-2 px-4 ">Status</th>
              <th className="py-2 px-4 ">Job Post</th>
            </tr>
          </thead>
          <tbody>
            {appli.map((item, index) => (
              <tr key={item.id}>
                <td className="py-2 px-4 ">{indexOfFirstItem + index + 1}</td>
                <td className="py-2 px-4 ">{item.employer_name}</td>
                <td className="py-2 px-4 ">{item.job_title}</td>
                <td className="py-2 px-4 ">{item.job_type}</td>
                <td className="py-2 px-4 ">{item.status}</td>
                <td className="py-2 px-4 ">{item.jobPost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={`mx-1 px-3 py-1 border ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Application;
