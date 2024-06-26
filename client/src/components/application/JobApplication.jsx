/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";

const JobApplication = () => {
  // Updated data with unique entries
  const data = [
    {
      id: 1,
      jobseeker_name: "David",
      jobseeker_posting_title: "Job Title 1",
      job_type: "Full-time",
      email_proposal: "link1",
      date: "1/2/2024",
      status: "Awaiting Review",
    },
    {
      id: 2,
      jobseeker_name: "Jon",
      jobseeker_posting_title: "Job Title 2",
      job_type: "Part-time",
      email_proposal: "link2",
      date: "1/3/2024",
      status: "Reviewed",
    },
    {
      id: 3,
      jobseeker_name: "Gita",
      jobseeker_posting_title: "Job Title 3",
      job_type: "Full-time",
      email_proposal: "link3",
      date: "4/2/2024",
      status: "Reviewed",
    },
    {
      id: 4,
      jobseeker_name: "Alice",
      jobseeker_posting_title: "Job Title 4",
      job_type: "Contract",
      email_proposal: "link4",
      date: "2/2/2024",
      status: "Awaiting Review",
    },
    {
      id: 5,
      jobseeker_name: "Bob",
      jobseeker_posting_title: "Job Title 5",
      job_type: "Full-time",
      email_proposal: "link5",
      date: "1/2/2024",
      status: "Reviewed",
    },
    {
      id: 6,
      jobseeker_name: "Charlie",
      jobseeker_posting_title: "Job Title 6",
      job_type: "Part-time",
      email_proposal: "link6",
      date: "1/3/2024",
      status: "Reviewed",
    },
    {
      id: 7,
      jobseeker_name: "Diana",
      jobseeker_posting_title: "Job Title 7",
      job_type: "Full-time",
      email_proposal: "link7",
      date: "4/2/2024",
      status: "Reviewed",
    },
    {
      id: 8,
      jobseeker_name: "Evan",
      jobseeker_posting_title: "Job Title 8",
      job_type: "Contract",
      email_proposal: "link8",
      date: "2/2/2024",
      status: "Awaiting Review",
    },
    {
      id: 9,
      jobseeker_name: "Fiona",
      jobseeker_posting_title: "Job Title 9",
      job_type: "Full-time",
      email_proposal: "link9",
      date: "1/2/2024",
      status: "Reviewed",
    },
    {
      id: 10,
      jobseeker_name: "George",
      jobseeker_posting_title: "Job Title 10",
      job_type: "Part-time",
      email_proposal: "link10",
      date: "1/3/2024",
      status: "Reviewed",
    },
    {
      id: 11,
      jobseeker_name: "Hannah",
      jobseeker_posting_title: "Job Title 11",
      job_type: "Full-time",
      email_proposal: "link11",
      date: "4/2/2024",
      status: "Reviewed",
    },
    {
      id: 12,
      jobseeker_name: "Ian",
      jobseeker_posting_title: "Job Title 12",
      job_type: "Contract",
      email_proposal: "link12",
      date: "2/2/2024",
      status: "Awaiting Review",
    },
    {
      id: 13,
      jobseeker_name: "Jack",
      jobseeker_posting_title: "Job Title 13",
      job_type: "Full-time",
      email_proposal: "link13",
      date: "1/2/2024",
      status: "Reviewed",
    },
    {
      id: 14,
      jobseeker_name: "Kate",
      jobseeker_posting_title: "Job Title 14",
      job_type: "Part-time",
      email_proposal: "link14",
      date: "1/3/2024",
      status: "Reviewed",
    },
    {
      id: 15,
      jobseeker_name: "Leo",
      jobseeker_posting_title: "Job Title 15",
      job_type: "Full-time",
      email_proposal: "link15",
      date: "4/2/2024",
      status: "Reviewed",
    },
    {
      id: 16,
      jobseeker_name: "Mia",
      jobseeker_posting_title: "Job Title 16",
      job_type: "Contract",
      email_proposal: "link16",
      date: "2/2/2024",
      status: "Awaiting Review",
    },
    {
      id: 17,
      jobseeker_name: "Nina",
      jobseeker_posting_title: "Job Title 17",
      job_type: "Full-time",
      email_proposal: "link17",
      date: "1/2/2024",
      status: "Reviewed",
    },
    {
      id: 18,
      jobseeker_name: "Oscar",
      jobseeker_posting_title: "Job Title 18",
      job_type: "Part-time",
      email_proposal: "link18",
      date: "1/3/2024",
      status: "Reviewed",
    },
    {
      id: 19,
      jobseeker_name: "Paul",
      jobseeker_posting_title: "Job Title 19",
      job_type: "Full-time",
      email_proposal: "link19",
      date: "4/2/2024",
      status: "Reviewed",
    },
    {
      id: 20,
      jobseeker_name: "Quinn",
      jobseeker_posting_title: "Job Title 20",
      job_type: "Contract",
      email_proposal: "link20",
      date: "2/2/2024",
      status: "Awaiting Review",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Logic for displaying current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-2">Hello, Here’s what’s going on</h2>
      <div className="flex justify-between mt-5 mb-5">
        <h2>Total Job Posted: 0</h2>
        <h2>Total Job Open: 0</h2>
        <h2>Total Job Close: 0</h2>
        <h2>Total Job Filled: 0</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">No.</th>
              <th className="py-2 px-4">Jobseeker Name</th>
              <th className="py-2 px-4">Job Posting Title</th>
              <th className="py-2 px-4">Job Type</th>
              <th className="py-2 px-4">Application Email Proposal Link</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id}>
                <td className="py-2 px-4">{indexOfFirstItem + index + 1}</td>
                <td className="py-2 px-4">{item.jobseeker_name}</td>
                <td className="py-2 px-4">{item.jobseeker_posting_title}</td>
                <td className="py-2 px-4">{item.job_type}</td>
                <td className="py-2 px-4">{item.email_proposal}</td>
                <td className="py-2 px-4">{item.date}</td>
                <td className="py-2 px-4">{item.status}</td>
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

export default JobApplication;
