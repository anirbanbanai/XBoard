import React from "react";
import { FcBiomass } from "react-icons/fc";
import { CgMenuGridR } from "react-icons/cg";
import { BiFoodMenu } from "react-icons/bi";
import { MdMenuBook, MdRestaurantMenu } from "react-icons/md";
import { VscLayoutMenubar } from "react-icons/vsc";

import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="flex flex-col gap-3">
      <Link className="flex gap-2" to="/dashboard">
        <CgMenuGridR className="text-xl" /> Dashboard
      </Link>
      <Link className="flex gap-2" to="/inbox">
        <FcBiomass className="text-xl" /> Inbox
      </Link>
      <Link className="flex gap-2" to="/dashboard">
        <BiFoodMenu className="text-xl" />
        All Job
      </Link>
      <Link className="flex gap-2" to="/dashboard">
        <MdMenuBook className="text-xl" />
        Application
      </Link>
      <Link className="flex gap-2" to="/dashboard">
        <MdRestaurantMenu className="text-xl" />
        Work History
      </Link>
      <Link className="flex gap-2" to="/dashboard">
        <VscLayoutMenubar className="text-xl" />
        Payment
      </Link>
    </div>
  );
};

export default Sidebar;
