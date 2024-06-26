import React, { useEffect, useState } from "react";

const HelpFaq = () => {
  const [footerData, setFooterData] = useState();
  useEffect(() => {
    const loader = () => {
      fetch(`${process.env.REACT_APP_ORIGIN_URL}/footer`)
        .then((res) => res.json())
        .then((data) => setFooterData(data));
    };
    loader();
  }, []);

  return (
    <div className="container mx-auto my-8">
      {footerData?.legal?.faq?.map((data, index) => (
        <div
          tabIndex={0}
          className="collapse border border-base-300 my-4 py-2"
        >
          <div className="collapse-title text-[22px] text-[#196D7C] font-medium capitalize">
            {index + 1}. {data?.heading}
          </div>
          <div className="text-[18px] ml-6">
            <p className=" px-3 capitalize">{data?.detail}</p>
          </div>
        </div>
      ))}
      {/* Collapsible Section 1 */}
      {/* <div tabIndex={0} className="collapse collapse-plus border border-base-300 my-2">
        <div className="collapse-title text-[22px] text-[#196D7C] font-medium">
        1. What is Airtalx?
        </div>
        <div className="text-[18px] ml-6">
          <p>Airtalx is an online job platform. It serves as a bridge between job seekers and employers, providing a platform for them to connect.</p>
        </div>
      </div> */}

      {/* Collapsible Section 2 */}
      {/* <div tabIndex={0} className="collapse collapse-plus border border-base-300  my-2">
        <div className="collapse-title text-[22px] text-[#196D7C] font-medium">
        2. How much does it cost to use Airtalx?
        </div>
        <div className="text-[18px] ml-6">
          <p>Airtalx is free to use for job seekers. There are no payments required from individuals seeking employment opportunities on the platform.</p>
        </div>
      </div> */}

      {/* Collapsible Section 3 */}
      {/* <div tabIndex={0} className="collapse collapse-plus border border-base-300  my-2">
        <div className="collapse-title text-[22px] text-[#196D7C] font-medium">
        3. What services does Airtalx offer to clients?
        </div>
        <div className="text-[18px] ml-6">
          <p>Apart from providing a platform for job postings, Airtalx also offers recruitment services to its clients. This includes assistance in finding the right candidates for their vacancies.</p>
        </div>
      </div> */}

      {/* Collapsible Section 4 */}
      {/* <div tabIndex={0} className="collapse collapse-plus border border-base-300  my-2">
        <div className="collapse-title text-[22px] text-[#196D7C] font-medium">
        4. How can I start using Airtalx?
        </div>
        <div className="text-[18px] ml-6">
          <p>To start using Airtalx, simply visit the platform, create a free account, and you can start browsing job postings or post your own job vacancies if you're an employer.</p>
        </div>
      </div> */}

      {/* Collapsible Section 5 */}
      {/* <div tabIndex={0} className="collapse collapse-plus border border-base-300  my-2">
        <div className="collapse-title text-[22px] text-[#196D7C] font-medium">
        5. Intellectual Property Rights
        </div>
        <div className="text-[18px] ml-6">
          <p>All content on the Website is owned by us or our licensors and is protected by copyright and other intellectual property laws.</p>
        </div>
      </div>  */}

      {/* Collapsible Section 6 */}
      {/* <div tabIndex={0} className="collapse collapse-plus border border-base-300  my-2">
        <div className="collapse-title text-[22px] text-[#196D7C]font-medium">
        6. Do I have to pay a service fee to Airtalx as a job seeker?
        </div>
        <div className="text-[18px] ml-6">
          <p>All content on the Website is owned by us or our licensors and is protected by copyright and other intellectual property laws.</p>
        </div>
      </div> */}
    </div>
  );
};

export default HelpFaq;
