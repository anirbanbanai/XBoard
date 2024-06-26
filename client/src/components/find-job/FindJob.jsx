import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCreditCard1, CiEdit } from "react-icons/ci";
import axios from "axios";
import Swal from "sweetalert2";
import JobUpdateModal from "../../common/JobUpdateModel";
import useAuthUser from "../../auth/getUser";
import { auth } from "../../firebase";
import { ButtonAll2 } from "../button/Button";
import { Link } from "react-router-dom";

const FindJob = () => {
  const { user } = useAuthUser(auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (id) => {
    setIsModalOpen(true);
    setEditId(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const updateJobInState = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job._id === updatedJob._id ? updatedJob : job))
    );
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`https://api-airtalx.vercel.app/v1/api/postjobs`);
        setJobs(res.data);
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
    return (
      <p className="flex justify-center">
        <span className="loading loading-spinner text-secondary text-center"></span>
      </p>
    );
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page on search change
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setCurrentPage(1); // Reset to the first page on type change
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      (job.job_title && job.job_title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.by_employee_name && job.by_employee_name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType ? job.job_type === selectedType : true;
    return matchesSearch && matchesType;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://api-airtalx.vercel.app/v1/api/postjobs/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Job deleted successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        // Remove the deleted job from the state
        setJobs(jobs.filter((job) => job._id !== id));
      } catch (error) {
        console.error("There was an error deleting the job!", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error deleting the job",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="mt-10 max-w-5xl mx-auto">
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-base-300 p-2 rounded-2xl mr-2"
        />
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="border border-base-300 textw p-2 rounded-2xl"
        >
          <option value="">Select type</option>
          <option value="full time">Full-time</option>
          <option value="part time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-2 textw">
        {currentJobs.length > 0 ? (
          currentJobs.map((job, index) => (
            <div
              key={job._id}
              className="border border-base-300 shadow-xl rounded-2xl p-4 m-2"
            >
              <div className="flex gap-3 items-center mb-2">
                <h1 className="bg-blue-200 bgw p-2 rounded-2xl">
                  {job.job_type}
                </h1>
                <h1 className="flex gap-1 items-center">
                  <CiCreditCard1 /> {job.hour_per_week}$
                </h1>
              </div>

              <h1 className="text-2xl font-semibold">{job.job_title}</h1>
              <h2 className="mt-2">
                By <span className="text-blue-600">{job.postby}</span>
              </h2>
              <p className="mt-2">{job.job_description.substring(0, 100)}...</p>

              <div className="mt-5">
                <Link to={`/find-job/${job._id}`}>
                  <ButtonAll2>See More</ButtonAll2>
                </Link>
              </div>

              <div className="flex justify-between mt-6">
                {user?.role === "admin" && (
                  <button
                    onClick={() => handleEditClick(job._id)}
                    className="btn btn-outline btn-warning"
                  >
                    <CiEdit className="text-xl" /> Edit Article
                  </button>
                )}

                {user?.role === "admin" && (
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="btn btn-outline btn-error"
                  >
                    <RiDeleteBin6Line className="text-xl" /> Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center">
            <p>No jobs found matching your criteria.</p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-outline mx-1"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`btn btn-outline mx-1 ${
              currentPage === index + 1 ? "btn-active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-outline mx-1"
        >
          Next
        </button>
      </div>

      <JobUpdateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        jobId={editId}
        onUpdate={updateJobInState} // Pass the callback function to update the job in the state
      />
    </div>
  );
};

export default FindJob;
