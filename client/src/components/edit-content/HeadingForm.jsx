import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const buttons = ["Terms Of Use", "Privacy & Policy", "Help & FAQs"];

const HeadingForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Terms Of Use");
  const [inputName, setInputName] = useState("statement");
  const [inputHeading, setInputHeading] = useState("Statement");
  const [inputDetailName, setDetailName] = useState("statementfill");
  const [inputDetailHeading, setDetailHeading] = useState("Statement Fill");
  const [termsStatement, setTermsStatements] = useState({
    termsStatement: "",
    teamsFill: "",
    policyStatement: "",
    policyFill: "",
    faqStatement: "",
    faqFill: "",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    setLoading(true);
    console.log({ termsStatement });
    let url;
    let data;
    if (
      termsStatement?.termsStatement &&
      termsStatement?.teamsFill &&
      !(termsStatement?.policyStatement && termsStatement?.policyFill) &&
      !(termsStatement?.faqStatement && termsStatement?.faqFill)
    ) {
      console.log("this is only statement");
      url = `${process.env.REACT_APP_ORIGIN_URL}/footer?terms=true`;
      data = {
        heading: termsStatement.termsStatement,
        detail: termsStatement.teamsFill,
      };
    } else if (
      !(termsStatement?.termsStatement && termsStatement?.teamsFill) &&
      termsStatement?.policyStatement &&
      termsStatement?.policyFill &&
      !(termsStatement?.faqStatement && termsStatement?.faqFill)
    ) {
      console.log("this is only policy");
      url = `${process.env.REACT_APP_ORIGIN_URL}/footer?policy=true`;
      data = {
        heading: termsStatement.policyStatement,
        detail: termsStatement.policyFill,
      };
    } else if (
      !(termsStatement?.termsStatement && termsStatement?.teamsFill) &&
      !(termsStatement?.policyStatement && termsStatement?.policyFill) &&
      termsStatement?.faqStatement &&
      termsStatement?.faqFill
    ) {
      console.log("this is only faq");
      url = `${process.env.REACT_APP_ORIGIN_URL}/footer?faq=true`;
      data = {
        heading: termsStatement.faqStatement,
        detail: termsStatement.faqFill,
      };
    }

    const result = fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log("changed data", data);
        Swal.fire({
          icon: "success",
          title: "Add successfully!",
        });
        setTermsStatements({
          termsStatement: "",
          teamsFill: "",
          policyStatement: "",
          policyFill: "",
          faqStatement: "",
          faqFill: "",
        });
      });
  };

  const handleTab = (tab) => {
    if (
      termsStatement?.termsStatement ||
      termsStatement?.teamsFill ||
      termsStatement?.policyStatement ||
      termsStatement?.policyFill ||
      termsStatement?.faqStatement ||
      termsStatement?.faqFill
    ) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          onSubmit();
          setActiveTab(tab);
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          setActiveTab(tab);
          setTermsStatements({
            termsStatement: "",
            teamsFill: "",
            policyStatement: "",
            policyFill: "",
            faqStatement: "",
            faqFill: "",
          });
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    if (activeTab === "Terms Of Use") {
      setInputName("termsStatement");
      setDetailName("teamsFill");
    } else if (activeTab === "Privacy & Policy") {
      setInputName("policyStatement");
      setDetailName("policyFill");
    } else if (activeTab === "Help & FAQs") {
      setInputName("faqStatement");
      setDetailName("faqFill");
    }

    // set heading
    if (activeTab === "Terms Of Use") {
      setInputHeading("Statement");
      setDetailHeading("Statement Fill");
    } else if (activeTab === "Privacy & Policy") {
      setInputHeading("Privacy Statement");
      setDetailHeading("Policy Details");
    } else if (activeTab === "Help & FAQs") {
      setInputHeading("FAQ Statement");
      setDetailHeading("FAQ Details");
    }
  }, [activeTab]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTermsStatements((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" bg-[#dde1eb] w-full h-3 my-5 "></div>
      <div>
        {/* buttons */}
        <div className="flex md:flex-row flex-col gap-x-5 md:border-b pb-3">
          {buttons.map((btn) => (
            <div key={btn}>
              <div
                onClick={() => handleTab(btn)}
                className={`py-2 px-5 rounded-md ${
                  activeTab === btn
                    ? "border border-gray-500 hover:opacity-70"
                    : " border border-transparent hover:bg-gray-100"
                } hover:border hover:border-gray-500 hover:shadow-md cursor-pointer`}
              >
                <span
                  className={`text-lg ${
                    activeTab === btn
                      ? "font-semibold text-[#20A3BA]"
                      : "text-gray-500 font-normal"
                  }`}
                >
                  {btn}
                </span>
              </div>
              <div
                className={` relative ${
                  activeTab === btn &&
                  "border-b-[3px] hidden md:block top-3 border-[#20A3BA]"
                }`}
              ></div>
            </div>
          ))}
        </div>

        <div className=" my-3 flex flex-col gap-y-5">
          {/* Statement input */}
          <div className=" flex flex-col my-2">
            <label
              htmlFor={inputName}
              className=" text-sm font-medium leading-5 text-[#23262A]"
            >
              {inputHeading}
            </label>
            <input
              id={inputName}
              name={inputName}
              placeholder={inputHeading}
              className=" border rounded-md text-[10px] h-[32px] px-3 font-medium focus:outline-none"
              value={termsStatement[inputName]}
              onChange={handleChange}
              // {...register(inputName)}
            />
            {errors[inputName] && (
              <p className=" text-xs text-red-500">This field is required.</p>
            )}
          </div>
          {/* statement fill input */}
          <div className=" flex flex-col my-2">
            <label
              htmlFor={inputDetailName}
              className=" text-sm font-medium leading-5 text-[#23262A]"
            >
              {inputDetailHeading}
            </label>
            <textarea
              id={inputDetailName}
              name={inputDetailName}
              placeholder={inputDetailHeading}
              rows={3}
              className="border min-h-[136px] rounded-md text-xs p-3 font-medium focus:outline-none w-full"
              value={termsStatement[inputDetailName]}
              onChange={handleChange}
              // {...register(inputDetailName)}
            />

            {errors[inputDetailName] && (
              <p className=" text-xs text-red-500">This field is required.</p>
            )}
          </div>
        </div>
      </div>
      <div className=" w-full flex justify-end">
        <button className=" bg-[#2792A8] text-xs rounded py-3 px-10 text-white font-semibold tracking-wider">
          {isLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default HeadingForm;
