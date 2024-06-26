import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ServiceForm = () => {
  const [isLoading, setLoading] = useState(false)
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true)
    const result = fetch(
      `${process.env.REACT_APP_ORIGIN_URL}/footer?services=true`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((res) => res.json())
     .then(data=> {
      setLoading(false)
      console.log(data)
      Swal.fire({
        icon: "success",
        title: "Add new service!",
      });
      reset({
        heading: "" ,
        detail: "",
        url:""
      });
     })

    // console.log(result);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" flex flex-col my-2">
        <label
          htmlFor="heading"
          className=" text-sm font-medium leading-5 text-[#23262A]"
        >
          Footer Headlines
        </label>
        <input
          id="heading"
          placeholder="Services"
          className=" border rounded-md text-[10px] h-[32px] lg:w-[49%] px-3 font-medium focus:outline-none"
          {...register("heading", { required: true })}
        />
        {errors.heading && (
          <p className=" text-xs text-red-500">This field is required.</p>
        )}
      </div>

      <div className=" flex md:flex-row flex-col items-end gap-x-5 w-full ">
        <div className=" flex flex-col w-full">
          <label
            htmlFor="detail"
            className=" text-sm font-medium leading-5 text-[#23262A]"
          >
            Footer Fill
          </label>
          <input
            id="detail"
            placeholder="Footer fill"
            className=" border rounded-md text-[10px] h-[32px] w-full px-3 font-medium focus:outline-none"
            {...register("detail", { required: true })}
          />
          {errors.detail && (
            <p className=" text-xs text-red-500">This field is required.</p>
          )}
        </div>

        <div className=" flex flex-col w-full">
          <label
            htmlFor="url"
            className=" text-sm font-medium leading-5 text-[#23262A]"
          >
            Footer Links:
          </label>
          <input
            id="url"
            placeholder="Footer links"
            className=" border rounded-md text-[10px] h-[32px] w-full px-3 font-medium focus:outline-none"
            {...register("url", { required: true })}
          />
          {errors.url && (
            <p className=" text-xs text-red-500">This field is required.</p>
          )}
        </div>
      </div>
      <div className=" w-full flex justify-end mt-4">
        <button className=" bg-[#2792A8] text-xs rounded py-3 px-10 text-white font-semibold tracking-wider">
          {isLoading? <span className="loading loading-spinner loading-xs"></span> :"Submit"}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
