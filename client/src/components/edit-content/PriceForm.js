import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const PriceForm = () => {
  const [prices, setPrices] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  useEffect(()=>{
    fetch(`${process.env.REACT_APP_ORIGIN_URL}/footer`)
    .then(res=> res.json())
    .then(data=>{
      setPrices(data?.pricing)
      console.log(data?.pricing)
    })
  },[]);

  if(!prices){
    return <span className="loading loading-spinner loading-xs"></span>
  }

  const onSubmit = (data) => {
    // console.log(data);
    if(prices){
        const body = [
      {
        heading: data?.pricing_level,
        price: data?.price,
        options: [...prices[0]?.options,data?.pricingfill]
      },
      {
        heading: data?.pricing_level2 ,
        price: data?.price2 ,
        options: [...prices[0]?.options,data?.pricingfill2]
      }
    ]
    
    fetch(`${process.env.REACT_APP_ORIGIN_URL}/footer?price=true`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    ).then((res) => res.json())
     .then(data=>{
      Swal.fire({
        icon: "success",
        title: "Pice updated!",
      });
      console.log("this is from anubis", {data})  
     })

    }

  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" bg-[#dde1eb] w-full h-3 my-10"></div>
      <h4 className=" text-3xl font-bold leading-10 text-[#23262A]">Pricing</h4>
      {/* Pricing 1 */}
      <div>
        {/* pricing level */}
        <div className=" flex flex-col my-2">
          <label
            htmlFor="pricing_level"
            className=" text-sm font-medium leading-5 text-[#23262A]"
          >
            Pricing Level
          </label>
          <input
            id="pricing_level"
            type="text"
            defaultValue={prices[0]?.heading}
            placeholder="Pricing Level"
            className=" border rounded-md text-[10px] max-w-[263px] h-[32px] px-3 font-medium focus:outline-none"
            {...register("pricing_level")}
          />
          {errors.pricing_level && (
            <p className=" text-xs text-red-500">This field is required.</p>
          )}
        </div>
        {/* price */}
        <div className=" flex flex-col my-2">
          <label
            htmlFor="price"
            className=" text-sm font-medium leading-5 text-[#23262A]"
          >
            Price (USD)
          </label>
          <input
            id="price"
            defaultValue={prices[0]?.price}
            type="number"
            placeholder="Price"
            className=" border rounded-md max-w-[263px] text-[10px] h-[32px] px-3 font-medium focus:outline-none"
            {...register("price")}
          />
          {errors.price && (
            <p className=" text-xs text-red-500">This field is required.</p>
          )}
        </div>
        {/* pricing fill */}
        <div className=" flex flex-col my-2">
          <label
            htmlFor="pricingfill"
            className=" text-sm font-medium leading-5 text-[#23262A]"
          >
            Pricing Fill
          </label>
          <textarea
            id="pricingfill"
            placeholder={prices[0]?.options?.map(data=> data)}
            // defaultValue={prices[0]?.options?.map(data=> data)}
            rows={3}
            className="border min-h-[136px] rounded-md text-xs p-3 font-medium focus:outline-none w-full"
            {...register("pricingfill")}
          />
          {errors.pricingfill && (
            <p className=" text-xs text-red-500">This field is required.</p>
          )}
        </div>
      </div>

      {/* pricing 2 */}
      <div className=" my-5">
        {/* pricing level */}
        <div className=" flex flex-col my-2">
          <label
            htmlFor="pricing_level2"
            className=" text-sm font-medium leading-5 text-[#23262A]"
          >
            Pricing Level
          </label>
          <input
            id="pricing_level2"
            defaultValue={prices[1]?.heading}
            placeholder="Pricing Level"
            className=" border rounded-md text-[10px] max-w-[263px] h-[32px] px-3 font-medium focus:outline-none"
            {...register("pricing_level2")}
          />
          {errors.pricing_level2 && (
            <p className=" text-xs text-red-500">This field is required.</p>
          )}
        </div>
        {/* price */}
        <div className=" flex flex-col my-2">
          <label
            htmlFor="price2"
            className=" text-sm font-medium leading-5 text-[#23262A]"
          >
            Price (USD)
          </label>
          <input
            type="number"
            id="price2"
            defaultValue={prices[1]?.price}
            placeholder="Price"
            className=" border rounded-md max-w-[263px] text-[10px] h-[32px] px-3 font-medium focus:outline-none"
            {...register("price2")}
          />
          {errors.price2 && (
            <p className=" text-xs text-red-500">This field is required.</p>
          )}
        </div>
        {/* pricing fill */}
        <div className=" flex flex-col my-2">
          <label
            htmlFor="pricingfill2"
            className=" text-sm font-medium leading-5 text-[#23262A]"
          >
            Pricing Fill
          </label>
          <textarea
            id="pricingfill2"
            placeholder={prices[1]?.options?.map(data=> data)}
            // defaultValue={prices[1]?.options?.map(data=> data)}
            rows={3}
            className="border min-h-[136px] rounded-md text-xs p-3 font-medium focus:outline-none w-full"
            {...register("pricingfill2")}
          />
          {errors.pricingfill2 && (
            <p className=" text-xs text-red-500">This field is required.</p>
          )}
        </div>
      </div>
      <div className=" w-full flex justify-end">
        <button className=" bg-[#2792A8] text-xs rounded py-3 px-10 text-white font-semibold tracking-wider">
          Submit
        </button>
      </div>
    </form>
  );
};

export default PriceForm;
