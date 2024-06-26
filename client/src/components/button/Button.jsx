import React from "react";

const ButtonAll = ({ children }) => {
  return (
    <button
      type="submit"
      className="px-3 py-2 rounded-lg text-white !bg-[#20A3BA]"
    >
      {children}
    </button>
  );
};
export const ButtonAll2 = ({ children }) => {
  return (
    <button
      type="submit"
      className="w-full px-3 py-2 rounded-lg text-white !bg-[#20A3BA]"
    >
      {children}
    </button>
  );
};

export default ButtonAll;
