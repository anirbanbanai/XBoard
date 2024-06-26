import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const BlogUpdateModal = ({ isOpen, onClose, user, onUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/v1/api/blogs/${user}`,
        data
      );
      console.log("Updated blog data:", response.data);
      onClose();
      if (response.data) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Blog updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        onUpdate(response.data); // Call the callback to update the state
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Headline
            </label>
            <input
              type="text"
              {...register("headline")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter Headline"
            />
            {errors.headline && (
              <p className="text-red-500 text-xs mt-1">
                {errors.headline.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              {...register("description")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter Description"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
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

export default BlogUpdateModal;
