import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoIosSunny } from "react-icons/io";
import img1 from "../../image/mainicon.svg";
import { auth } from "../../firebase";

import useAuthUser from "../../auth/getUser";
import ButtonAll from "../button/Button";

const Navbar = () => {
  const { user } = useAuthUser(auth);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "autumn"
  );

  const handletoggle = (e) => {
    // if (e.target.checked) {
    //   setTheme("synthwave");
    // } else {
    //   setTheme("autumn");
    // }
    setTheme(theme === "autumn" ? "synthwave" : "autumn");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const nav = (
    <>
      <li>
        <Link className="text-[12px] font-medium" to="/">
          Home
        </Link>
      </li>

      {user?.role === "job-seeker" && (
        <li>
          <Link className="text-[12px] font-medium" to="/jobseeker-dashboard">
            Dashboard
          </Link>
        </li>
      )}

      {user?.role === "admin" && (
        <li>
          <Link className="text-[12px] font-medium" to="/admin-dashboard">
            Dashboard
          </Link>
        </li>
      )}
      {user?.role === "employer" && (
        <li>
          <Link className="text-[12px] font-medium" to="/employee-dashboard">
            Dashboard
          </Link>
        </li>
      )}
      <li>
        <Link className="text-[12px] font-medium" to="/find-job">
          Find Job
        </Link>
      </li>
      <li>
        <Link className="text-[12px] font-medium" to="/blog">
          Article
        </Link>
      </li>

      {user?.role === "employer" && (
        <li>
          <Link className="text-[12px] font-medium" to="/find-employee">
            Find Employee
          </Link>
        </li>
      )}
      {user?.role === "admin" && (
        <li>
          <Link className="text-[12px] font-medium" to="/find-employee">
            Find Employee
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div className=" bg-[#EDF7F4] w-full bgw">
      <div className="navbar max-w-7xl h-[64px] mx-auto  textw bgw">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={toggleDropdown}
            >
              <TfiMenuAlt className="text-2xl lg:hidden" />
            </div>
            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {nav}
              </ul>
            )}
          </div>

          <div className="flex items-center">
            <img className="w-[42px] h-[42px]" src={img1} alt="" />
            <h2 className="text-3xl font-semibold">airTalX</h2>
          </div>
          <div className="hidden navbar-center lg:flex">
            <ul className="px-1 menu menu-horizontal">{nav}</ul>
          </div>
        </div>

        <div className="navbar-end pr-[4%]">
          <div className="flex items-center justify-center gap-8 lg:gap-16">
            {/* <label className="switch">
              <input onChange={handletoggle} type="checkbox" />

              <div className="slider">
                <div className="circle bg-white  w-[31px] h-[31px]">
                  <IoIosSunny className="text-2xl text-warning" />
                </div>
              </div>
            </label> */}

            {!user ? (
              <Link to="/login">
                <ButtonAll>Login</ButtonAll>
              </Link>
            ) : (
              <Link
                to="/profile"
                className="flex gap-1 px-5 py-2 bg-white rounded-3xl"
              >
                <p className="max-md:hidden">{user?.name} </p>
                <img
                  src={user?.image}
                  className="rounded-full w-7 h-7"
                  alt=""
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
