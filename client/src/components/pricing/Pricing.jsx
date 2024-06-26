import React, { useEffect, useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import { Link } from "react-router-dom";
import ButtonAll from "../button/Button";
const Pricing = () => {
  const [footerData, setFooterData] = useState();
  useEffect(() => {
   const loader = () => {
    fetch(`${process.env.REACT_APP_ORIGIN_URL}/footer`)
      .then((res) => res.json())
      .then((data) => setFooterData(data));
   } 
   loader();
  }, []);

  return (
    <div
     className=" mx-auto min-h-[90vh] flex flex-col justify-center bg-no-repeat bg-cover"
     style={{ backgroundImage: 'url("/bg.svg")' }} 
    >
      <h2 className="text-3xl font-semibold text-center pt-5 text-white">
        {" "}
        Our Pricing
      </h2>
      <div className="flex justify-center p-5 gap-5">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="p-2 bg-[#2792A8]">
            <h2 className="text-xl font-semibold text-white">Most popular</h2>
          </figure>

          <div className="text-center">
            <h2 className=" text-center text-2xl font-bold capitalize">
              {footerData?.pricing[1]?.heading}
            </h2>
            <p className="text-3xl">
              <span className=" font-bold"> ${footerData?.pricing[1]?.price}</span>/month{" "}
            </p>
          </div>
          <div className="card-body">
            <div>
              {
                footerData?.pricing[1]?.options?.map(option=>
                 {if(option !== ""){return <><h2 className="flex gap-2 items-center capitalize">
                <FcCheckmark className="text-xl" /> {option}
              </h2></>} }
                )
              }
            </div>
          </div>

          <div className="flex justify-center mb-3">

          <Link to="/payment2">
          <ButtonAll>Upgrade Now</ButtonAll>
          </Link>
         
          </div>
        </div>
        <div className="flex items-center card max-w-96 h-[95%]  bg-base-100 shadow-xl">
          <div className=" rounded-t-xl">
            <figure className=" bg-[#f9fdfd] rounded-t-xl py-2">
              <h2 className="text-xl font-semibold capitalize">
              {footerData?.pricing[0]?.heading}
                </h2>
            </figure>

            <div className="card-body px-4 flex flex-col gap-y-4">
              <div>
              {
                footerData?.pricing[0]?.options?.map(option=>
                 {if(option !== ""){return <><h2 className="flex gap-2 items-center capitalize">
                <FcCheckmark className="text-xl" /> {option}
              </h2></>} }
                )
              }
              </div>
              <div className="flex justify-center">
             <Link to="/signup"> 
             <ButtonAll>Register Now</ButtonAll>
             </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
