// import axios from "axios";
import React, {  useState } from "react";
// import Swal from "sweetalert2";

const WorkHistory = () => {
  // const [data,setData] = useState([])

  // look,,when you dynmaic it just off demo data, and use dynamic fetch data
  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       const res = await axios.get(
  //         `https://api-airtalx.vercel.app/v1/api/history`
  //       );
  //       setData(res.data);
  //     //   setLoading(false);
  //     } catch (error) {
  //       console.error("There was an error fetching the jobs!", error);
  //       Swal.fire({
  //         title: "Error!",
  //         text: "There was an error fetching the jobs",
  //         icon: "error",
  //         confirmButtonText: "OK",
  //       });
  //     //   setLoading(false);
  //     }
  //   };

  //   fetchJobs();
  // }, []);



  const data = [
    {
      id: 1,
      designation: "Programmer",
      posted_date: "01/05/2024",
      active: 12,
      awaiting: 10,
      contucting: 5,
      hired: 8,
      location: "New York, NY",
    },
    {
      id: 2,
      designation: "Designer",
      posted_date: "02/05/2024",
      active: 15,
      awaiting: 12,
      contucting: 6,
      hired: 9,
      location: "Los Angeles, CA",
    },
    {
      id: 3,
      designation: "Project Manager",
      posted_date: "03/05/2024",
      active: 20,
      awaiting: 14,
      contucting: 7,
      hired: 10,
      location: "Chicago, IL",
    },
    {
      id: 4,
      designation: "QA Engineer",
      posted_date: "04/05/2024",
      active: 18,
      awaiting: 11,
      contucting: 8,
      hired: 7,
      location: "Houston, TX",
    },
    {
      id: 5,
      designation: "Business Analyst",
      posted_date: "05/05/2024",
      active: 16,
      awaiting: 13,
      contucting: 6,
      hired: 11,
      location: "Phoenix, AZ",
    },
    {
      id: 6,
      designation: "System Administrator",
      posted_date: "06/05/2024",
      active: 14,
      awaiting: 9,
      contucting: 7,
      hired: 10,
      location: "Philadelphia, PA",
    },
    {
      id: 7,
      designation: "Network Engineer",
      posted_date: "07/05/2024",
      active: 19,
      awaiting: 12,
      contucting: 9,
      hired: 8,
      location: "San Antonio, TX",
    },
    {
      id: 8,
      designation: "DevOps Engineer",
      posted_date: "08/05/2024",
      active: 17,
      awaiting: 15,
      contucting: 10,
      hired: 12,
      location: "San Diego, CA",
    },
    {
      id: 9,
      designation: "Database Administrator",
      posted_date: "09/05/2024",
      active: 13,
      awaiting: 11,
      contucting: 8,
      hired: 9,
      location: "Dallas, TX",
    },
    {
      id: 10,
      designation: "UI/UX Designer",
      posted_date: "10/05/2024",
      active: 22,
      awaiting: 18,
      contucting: 11,
      hired: 13,
      location: "San Jose, CA",
    },
    {
      id: 11,
      designation: "Data Scientist",
      posted_date: "11/05/2024",
      active: 21,
      awaiting: 17,
      contucting: 12,
      hired: 14,
      location: "Austin, TX",
    },
    {
      id: 12,
      designation: "Machine Learning Engineer",
      posted_date: "12/05/2024",
      active: 23,
      awaiting: 19,
      contucting: 13,
      hired: 15,
      location: "Jacksonville, FL",
    },
    {
      id: 13,
      designation: "AI Engineer",
      posted_date: "13/05/2024",
      active: 24,
      awaiting: 20,
      contucting: 14,
      hired: 16,
      location: "Fort Worth, TX",
    },
    {
      id: 14,
      designation: "Cloud Architect",
      posted_date: "14/05/2024",
      active: 25,
      awaiting: 21,
      contucting: 15,
      hired: 17,
      location: "Columbus, OH",
    },
    {
      id: 15,
      designation: "Frontend Developer",
      posted_date: "15/05/2024",
      active: 26,
      awaiting: 22,
      contucting: 16,
      hired: 18,
      location: "San Francisco, CA",
    },
    {
      id: 16,
      designation: "Backend Developer",
      posted_date: "16/05/2024",
      active: 27,
      awaiting: 23,
      contucting: 17,
      hired: 19,
      location: "Charlotte, NC",
    },
    {
      id: 17,
      designation: "Full Stack Developer",
      posted_date: "17/05/2024",
      active: 28,
      awaiting: 24,
      contucting: 18,
      hired: 20,
      location: "Indianapolis, IN",
    },
    {
      id: 18,
      designation: "Product Manager",
      posted_date: "18/05/2024",
      active: 29,
      awaiting: 25,
      contucting: 19,
      hired: 21,
      location: "Seattle, WA",
    },
    {
      id: 19,
      designation: "Technical Writer",
      posted_date: "19/05/2024",
      active: 30,
      awaiting: 26,
      contucting: 20,
      hired: 22,
      location: "Denver, CO",
    },
    {
      id: 20,
      designation: "Cybersecurity Analyst",
      posted_date: "20/05/2024",
      active: 31,
      awaiting: 27,
      contucting: 21,
      hired: 23,
      location: "Washington, DC",
    },
  ];
 

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");
  const itemsPerPage = 5;

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1); // Reset to first page when status changes
  };

  const filteredData = selectedStatus
    ? data.filter((item) => {
        if (selectedStatus === "Awaiting") return item.awaiting > 0;
        if (selectedStatus === "Contructual") return item.contucting > 0;
        if (selectedStatus === "Hired") return item.hired > 0;
        return true;
      }) 
    : data;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  // const displayedData = filteredData.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="m-8">
      <div className="mt-5">
        <select
          className="select w-full max-w-xs"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="">Filled job</option>
          <option value="Awaiting">Awaiting</option>
          <option value="Contructual">Contructual</option>
          <option value="Hired">Hired</option>
        </select>
      </div>
      <div className="p-5">
        {data.map((m) => (
          <div
            key={m.id}
            className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 gap-5 p-3 mb-5"
          >
            <input type="checkbox" defaultChecked className="checkbox" />

            <div className="flex-1">
              <h1 className="font-bold">{m.designation}</h1>
              <h2 className="text-gray-600">{m.location}</h2>
              <h3 className="text-gray-500">{m.posted_date}</h3>
            </div>

            <div className="flex items-center gap-4">
              <h1 className="text-blue-500">{m.active} active</h1>
              <div className="bg-gray-100 p-4 flex gap-3 rounded-xl">
                <div className="text-center">
                  <h1 className="font-bold">{m.awaiting}</h1>
                  <p className="text-gray-500">Awaiting</p>
                </div>
                <div className="text-center">
                  <h1 className="font-bold">{m.contucting}</h1>
                  <p className="text-gray-500">Contructual</p>
                </div>
                <div className="text-center">
                  <h1 className="font-bold">{m.hired}</h1>
                  <p className="text-gray-500">Hired</p>
                </div>
              </div>
            </div>

            <button className="btn btn-success mt-2 md:mt-0">
              Post this job again
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-5">
        <button
          className="btn btn-secondary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WorkHistory;
