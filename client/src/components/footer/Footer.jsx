/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoLogoInstagram, IoLogoYoutube } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
  const [footerData, setFooterData] = useState();
  useEffect(() => {
   const loader = () => {
    fetch(`${process.env.REACT_APP_ORIGIN_URL}/footer`)
      .then((res) => res.json())
      .then((data) => setFooterData(data));
   } 
   loader();
  }, []);

  console.log(footerData)

  return (
    <div className=" text-white bg-[#2792A8]  w-full">
      <div className="max-w-[1280px] mx-auto ">
        <footer className="p-10 mx-auto footer ">
          <nav>
            <h6 className=" text-[12px] font-bold">Services</h6>
            {/* <a className="link link-hover  text-[12px]">
              {" "}
              <Link to="/find-job"> Find Job</Link>
            </a>
            <a className="link link-hover  text-[12px]">
              {" "}
              <Link to="/find-employee"> Find Employee</Link>
            </a> */}
            {footerData?.services?.map(data=> 
              <a key={data._id} className="link link-hover  text-[12px]">
              <Link to={data?.url} className=" capitalize"> {data?.heading} </Link>
            </a>
            )}
          </nav>
          <nav>
            <h6 className="text-[12px] font-bold">Company</h6>
            <a className="link link-hover  text-[12px]">
              {" "}
              <Link to="/about-us"> About us</Link>
            </a>
            <a className="link link-hover  text-[12px]">
              {" "}
              <Link to="/contact-us"> Contact us</Link>
            </a>
            <a className="link link-hover  text-[12px]">
              <Link to="/blog"> Blogs</Link>
            </a>
            <a className="link link-hover  text-[12px]">Client Search</a>
          </nav>
          <nav>
            <h6 className=" text-[12px] font-bold">Legal</h6>
            <a className="link link-hover  text-[12px]">
              {" "}
              <Link to="/faq">Terms of use</Link>{" "}
            </a>
            <a className="link link-hover  text-[12px]">
              <Link to="/faq">Privecy and police</Link>
            </a>
            <a className="link link-hover  text-[12px]">
              <Link to="/faq">Help & FAQs</Link>
            </a>
          </nav>
          <nav>
            <h6 className=" text-[12px] font-bold">Pricing</h6>
            <a className="link link-hover  text-[12px] capitalize">{footerData?.pricing[0]?.heading}</a>
            <a className="link link-hover  text-[12px] capitalize">{footerData?.pricing[1]?.heading}</a>
          </nav>
          <nav>
            <h6 className=" text-[12px] font-bold">Social</h6>
            <div className="grid grid-flow-col gap-4">
              <h2>
                <FaTwitter className="text-2xl" />
              </h2>
              <h2>
                <FaFacebook className="text-2xl" />
              </h2>
              <h2>
                <IoLogoInstagram className="text-2xl" />
              </h2>
              <h2>
                <FaLinkedin className="text-2xl" />
              </h2>
              <h2>
                <IoLogoYoutube className="text-2xl" />
              </h2>
            </div>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
