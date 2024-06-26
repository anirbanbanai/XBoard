import React from "react";
import { useForm } from "react-hook-form";
import { AiFillPlusCircle } from "react-icons/ai";

import axios from "axios";
import Swal from "sweetalert2";

const Payment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "https://api-airtalx.vercel.app/v1/api/payment",
        data
      );
      console.log(response);
      if (response.data) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Payment saved successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error creatingpayment:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        {/* Your form fields */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Name and Email */}
          <div className="form-control">
            <label className="label">
              <span className="font-semibold">Full Name</span>
            </label>
            <input
              type="text"
              className="input input-sm input-bordered rounded-2xl"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-semibold">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-sm input-bordered rounded-2xl"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>

        {/* Other form fields */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* Payment Option and Currency */}
          <div className="form-control mt-3">
            <label>Payment Option</label>
            <select
              {...register("payment_option")}
              className="rounded-xl p-1 bg-base-100"
            >
              <option value="part time">1</option>
              <option value="full time">2</option>
              <option value="hybridge">3</option>
            </select>
            {errors.payment_option && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control mt-3">
            <label>Currency</label>
            <select
              {...register("currency")}
              className="rounded-xl p-1 bg-base-100"
            >
              <option value="40">40</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
            {errors.currency && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>

        {/* Invoice and Billing Information */}
        <div className="grid md:grid-cols-3 gap-2">
          <div className="form-control">
            <label className="label">
              <span className="font-semibold">Invoice No</span>
            </label>
            <input
              type="text"
              className="input input-sm input-bordered rounded-2xl"
              {...register("invoice_no")}
            />
            {errors.invoice_no && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-semibold">Invoice Date</span>
            </label>
            <input
              type="date"
              className="input input-sm input-bordered rounded-2xl"
              {...register("invoice_date")}
            />
            {errors.invoice_date && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-semibold">Due Date</span>
            </label>
            <input
              type="date"
              className="input input-sm input-bordered rounded-2xl"
              {...register("due_date")}
            />
            {errors.due_date && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>

        {/* More Billing Information */}
        <div className="grid md:grid-cols-3 gap-2">
          <div className="form-control">
            <label className="label">
              <span className="font-semibold">Bill To</span>
            </label>
            <input
              type="text"
              className="input input-sm input-bordered rounded-2xl"
              {...register("bill_to")}
            />
            {errors.bill_to && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-semibold">Employer Name</span>
            </label>
            <input
              type="text"
              className="input input-sm input-bordered rounded-2xl"
              {...register("employer_name")}
            />
            {errors.employer_name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-semibold">Company Name</span>
            </label>
            <input
              type="text"
              className="input input-sm input-bordered rounded-2xl"
              {...register("company_name")}
            />
            <span className="text-red-500">This field is required</span>
          </div>
        </div>

        {/* Itemized Billing Information */}
        <div className="grid bg-slate-300 md:grid-cols-4 rounded-xl px-2 pt-5 pb-5 gap-2">
          <div className="form-control">
            <label className="label">
              <span className="font-semibold">Description</span>
            </label>
            <input
              type="text"
              className="input input-sm input-bordered rounded-2xl"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-semibold">Rate</span>
            </label>
            <input
              type="number"
              className="input input-sm input-bordered rounded-2xl"
              {...register("rate")}
            />
            {errors.rate && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-semibold">Hour</span>
            </label>
            <input
              type="number"
              className="input input-sm input-bordered rounded-2xl"
              {...register("hour")}
            />
            {errors.hour && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-semibold">Amount</span>
            </label>
            <input
              type="number"
              className="input input-sm input-bordered rounded-2xl"
              {...register("amount")}
            />
            {errors.amount && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>

        {/* Add Another Line Item */}
        <div className="mt-3">
          <h1 className="flex gap-2">
            <AiFillPlusCircle className="text-2xl text-green-600" />
            Add another line item
          </h1>
        </div>

        {/* Notes and Total Amount */}
        <div className="grid md:grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label">
              <span className="font-semibold">Notes to participant</span>
            </label>
            <input
              type="text"
              className="input input-sm input-bordered rounded-2xl"
              {...register("notes")}
            />
            {errors.notes && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-semibold">Total amount</span>
            </label>
            <input
              type="number"
              className="input input-sm input-bordered rounded-2xl"
              {...register("totalAmount")}
            />
            {errors.totalAmount && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>

        {/* Stripe Elements and CheckoutForm */}

        {/* <div type="submit" className="mt-3 p-5">
          <Payment2 />
        </div> */}

        {/* Buttons */}
        <div className="flex justify-between gap-2">
          <button className="btn btn-success mt-3" type="submit">
            Download PDF
          </button>
          <button className="btn btn-success" type="submit">
            Save as Template
          </button>
          <button className="btn btn-outline btn-error mt-3" type="button">
            Delete Template
          </button>
          <button className="btn btn-warning mt-3" type="button">
            Send Invoice
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
