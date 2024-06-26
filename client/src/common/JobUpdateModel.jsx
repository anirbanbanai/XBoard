import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const JobUpdateModal = ({ isOpen, onClose, jobId, onUpdate }) => {
  const [, setInitialValues] = useState(null);
  // console.log(initialValues);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (jobId) {
      const fetchJob = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/v1/api/postjobs/${jobId}`);
          const jobData = response.data;
          setInitialValues(jobData);
          setValue("job_title", jobData.job_title);
          setValue("job_headline", jobData.job_headline);
          setValue("job_description", jobData.job_description);
          setValue("job_type", jobData.job_type);
          setValue("hour_per_week", jobData.hour_per_week);
        } catch (error) {
          console.error("There was an error fetching the job!", error);
        }
      };

      fetchJob();
    }
  }, [jobId, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/v1/api/postjobs/${jobId}`,
        data
      );
      onClose();
      if (response.data) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Job updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        onUpdate(response.data); // Call the callback to update the state
      }
    } catch (error) {
      console.error("Error updating job:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error updating the job",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Edit Job</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              {...register("job_title", { required: "Job title is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter Job Title"
            />
            {errors.job_title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.job_title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Headline
            </label>
            <input
              type="text"
              {...register("job_headline", { required: "Job headline is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter Job Headline"
            />
            {errors.job_headline && (
              <p className="text-red-500 text-xs mt-1">
                {errors.job_headline.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              {...register("job_description", { required: "Job description is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter Job Description"
            />
            {errors.job_description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.job_description.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <select
              {...register("job_type", { required: "Job type is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select type</option>
              <option value="full time">Full-time</option>
              <option value="part time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
            {errors.job_type && (
              <p className="text-red-500 text-xs mt-1">
                {errors.job_type.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hours per Week
            </label>
            <input
              type="number"
              {...register("hour_per_week", { required: "Hours per week is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter Hours per Week"
            />
            {errors.hour_per_week && (
              <p className="text-red-500 text-xs mt-1">
                {errors.hour_per_week.message}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" className="btn btn-error" onClick={onClose}>
              Back
            </button>
            <button type="submit" className="btn btn-warning">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobUpdateModal;
