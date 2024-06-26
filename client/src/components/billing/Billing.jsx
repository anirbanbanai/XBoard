import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const Billing = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { url, public_id, name, email, password, role, status } = data;
    const alldata = {
      avatar: {
        url,
        public_id,
      },
      name,
      email,
      password,
      role,
      status,
    };
    try {
      const result = await axios.post(
        `https://api-airtalx.vercel.app/v1/api/auth/register`,
        alldata
      );
      if (result.data.acknowledgement === true) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: result.data.description || "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });

        reset();
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Registration failed",
        text: error.response?.data?.description || "Please try again later",
        showConfirmButton: true,
      });
      console.log(error);
    }
  };

  const CreditCard = (
    <>
      <div className="border border-base-200 rounded-2xl p-4">
        <h2 className="text-blue-600 bg-blue-100 rounded-xl p-3">
          Add credit card
        </h2>
        <div className="form-control">
          <label className="label">
            <span className="font-semibold">Name or credit card</span>
          </label>
          <input
            type="text"
            placeholder="credit card"
            className="input input-sm input-bordered rounded-2xl"
            {...register("blog_headline", { required: true })}
          />
          {errors.blog_headline && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="font-semibold">Card Number</span>
          </label>
          <input
            type="text"
            placeholder="credit card"
            className="input input-sm input-bordered rounded-2xl"
            {...register("blog_headline", { required: true })}
          />
          {errors.blog_headline && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="font-semibold">Date of expired</span>
          </label>
          <input
            type="date"
            placeholder="date"
            className="input input-sm input-bordered rounded-2xl"
            {...register("blog_headline", { required: true })}
          />
          {errors.blog_headline && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="flex justify-center mt-5">
          <button type="submit" className="btn btn-success">
            Add Credit card
          </button>
        </div>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full  bg-white">
            <thead className="bg-gray-200 p-5">
              <tr>
                <th className="py-2 px-4">Card Number</th>
                <th className="py-2 px-4">Expiration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">254656</td>
                <td className="py-2 px-4">12.12.2027</td>
              </tr>
              <tr>
                <td className="py-2 px-4">254656</td>
                <td className="py-2 px-4">12.12.2027</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const Subcription = (
    <>
      <div className="mt-8">
        <div className="overflow-x-auto">
          <h2 className="text-xl">My Subcription</h2>
          <table className="min-w-full mt-2  bg-white">
            <thead className="bg-gray-200 p-5">
              <tr>
                <th className="py-2 px-4">Product </th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Next bill Date</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">Null</td>
                <td className="py-2 px-4">Null</td>
                <td className="py-2 px-4">Null</td>
                <td className="py-2 px-4">Null</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto mt-3">
          <h2 className="text-xl">My Order History</h2>
          <table className="min-w-full mt-2  bg-white">
            <thead className="bg-gray-200 p-5">
              <tr>
                <th className="py-2 px-4">Product </th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Next bill Date</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">Null</td>
                <td className="py-2 px-4">Null</td>
                <td className="py-2 px-4">Null</td>
                <td className="py-2 px-4">Null</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto mt-3">
          <h2 className="text-xl">Paypal Order History</h2>
          <table className="min-w-full mt-2  bg-white">
            <thead className="bg-gray-200 p-5">
              <tr>
                <th className="py-2 px-4">Product </th>
                <th className="py-2 px-4">Order Total</th>
                <th className="py-2 px-4">Order Date</th>
                <th className="py-2 px-4">Invoice</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">Null</td>
                <td className="py-2 px-4">Null</td>
                <td className="py-2 px-4">Null</td>
                <td className="py-2 px-4">Null</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto mt-3">
          <h2 className="text-xl font-semibold mt-3">
            Bussiness Invoice Information
          </h2>
          <div>
            <div className="flex gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="font-semibold">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  className="input input-sm input-bordered rounded-2xl"
                  {...register("blog_headline", { required: true })}
                />
                {errors.blog_headline && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="font-semibold">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="input input-sm input-bordered rounded-2xl"
                  {...register("blog_headline", { required: true })}
                />
                {errors.blog_headline && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="font-semibold">Bussiness Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Bussiness Name"
                  className="input input-sm input-bordered rounded-2xl"
                  {...register("blog_headline", { required: true })}
                />
                {errors.blog_headline && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="font-semibold">Street Adress</span>
                </label>
                <input
                  type="text"
                  placeholder="street adress"
                  className="input input-sm input-bordered rounded-2xl"
                  {...register("blog_headline", { required: true })}
                />
                {errors.blog_headline && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="font-semibold">City</span>
                </label>
                <input
                  type="text"
                  placeholder="city"
                  className="input input-sm input-bordered rounded-2xl"
                  {...register("blog_headline", { required: true })}
                />
                {errors.blog_headline && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="font-semibold">State</span>
                </label>
                <input
                  type="text"
                  placeholder="state"
                  className="input input-sm input-bordered rounded-2xl"
                  {...register("blog_headline", { required: true })}
                />
                {errors.blog_headline && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="font-semibold">ZIP</span>
                </label>
                <input
                  type="text"
                  placeholder="zip"
                  className="input input-sm input-bordered rounded-2xl"
                  {...register("blog_headline", { required: true })}
                />
                {errors.blog_headline && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="font-semibold">Country</span>
                </label>
                <input
                  type="text"
                  placeholder="country"
                  className="input input-sm input-bordered rounded-2xl"
                  {...register("blog_headline", { required: true })}
                />
                {errors.blog_headline && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="font-semibold">Vat Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Vat Number"
                  className="input input-sm input-bordered rounded-2xl"
                  {...register("blog_headline", { required: true })}
                />
                {errors.blog_headline && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>
            <div className=" mt-3">
              <button className="btn btn-success">Save Record</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className=" rounded-2xl">
      <div className=" rounded-lg">
        {/* Tabs */}
        <div className="flex justify-start  mt-[30px]">
          <button
            className={`px-4 py-2 ${
              activeTab === 0 ? "bg-blue-400 text-white" : "bg-gray-200"
            } rounded-lg focus:outline-none`}
            onClick={() => handleTabClick(0)}
          >
            Credit Card
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === 1 ? "bg-blue-400 text-white" : "bg-gray-200"
            } rounded-lg focus:outline-none`}
            onClick={() => handleTabClick(1)}
          >
            Subscription/Order History
          </button>
        </div>

        {/* Tab Content */}
        <div className="">
          {activeTab === 0 && (
            <form onSubmit={handleSubmit(onSubmit)} className=" ">
              <div className="flex   rounded-2xl gap-3 p-5 pl-0">
                {CreditCard}
              </div>
            </form>
          )}
          {activeTab === 1 && (
            <form onSubmit={handleSubmit(onSubmit)} className="">
              {Subcription}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Billing;
