import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// import useAuthUser from "../auth/getUser";
// import { auth } from "../firebase";
import Swal from "sweetalert2";

const EditProfileModal = ({ isOpen, onClose, user, onProfileUpdate }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      location: user?.location || "",
      skill: user?.skill || "",
      skill_level: user?.skill_level || "",
      phone_number: user?.phone_number || "",
      current_job: user?.current_job || "",
      current_company: user?.current_company || "",
      portfolio: user?.portfolio || "",
      employment: user?.employment || "",
      salary: user?.salary || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`https://api-airtalx.vercel.app/v1/api/userdata/${user?._id}`, data);
      if (response.data) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Profile updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        onProfileUpdate(response.data); // Update the profile data in the parent component
        onClose();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-around">
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                {...register("location", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your Location"
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">Location is required</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Skill</label>
              <input
                type="text"
                {...register("skill", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your Skill"
              />
              {errors.skill && <p className="text-red-500 text-xs mt-1">Skill is required</p>}
            </div>
          </div>

          <div className="flex justify-around">
            <div>
              <label className="block text-sm font-medium text-gray-700">Skill Level</label>
              <input
                type="text"
                {...register("skill_level", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your Skill Level"
              />
              {errors.skill_level && <p className="text-red-500 text-xs mt-1">Skill Level is required</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                {...register("phone_number", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your Phone Number"
              />
              {errors.phone_number && <p className="text-red-500 text-xs mt-1">Phone Number is required</p>}
            </div>
          </div>

          <div className="flex justify-around">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Job</label>
              <input
                type="text"
                {...register("current_job", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your Current Job"
              />
              {errors.current_job && <p className="text-red-500 text-xs mt-1">Current Job is required</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Company</label>
              <input
                type="text"
                {...register("current_company", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your Current Company"
              />
              {errors.current_company && <p className="text-red-500 text-xs mt-1">Current Company is required</p>}
            </div>
          </div>

          <div className="flex justify-around">
            <div>
              <label className="block text-sm font-medium text-gray-700">Portfolio</label>
              <input
                type="text"
                {...register("portfolio")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your Portfolio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Employment</label>
              <input
                type="text"
                {...register("employment")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your Employment"
              />
            </div>
          </div>

          <div classNme="flex justify-around">
          <div className="flex justify-center">
            <div>
              <label className="block text-sm font-medium text-gray-700">Salary</label>
              <input
                type="text"
                {...register("salary", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your Salary"
              />
              {errors.salary && <p className="text-red-500 text-xs mt-1">Salary is required</p>}
            </div>
          </div>
          
          <div className="flex justify-center">
            <div>
              <label className="block text-sm font-medium text-gray-700">Summary</label>
              <input
                type="text"
                {...register("summary", { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your Summary"
              />
              {errors.summary && <p className="text-red-500 text-xs mt-1">Summary is required</p>}
            </div>
          </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="btn btn-error"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-warning"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
