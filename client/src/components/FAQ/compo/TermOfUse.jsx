import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

const CollapsibleSections = () => {
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
    {footerData?.legal?.terms?.map((data, index) => (
        <div key={index} tabIndex={0} className="collapse collapse-plus border border-base-300 my-2">
        <div className="collapse-title text-[22px] text-[#196D7C] font-medium capitalize">
        {index + 1}. {data?.heading}
        </div>
        <div className="collapse-content text-[18px] ml-5">
          <p className=' capitalize'>{data?.detail}</p>
        </div>
      </div>
      ))}

      {/* Collapsible Section 1 */}
      {/* <div tabIndex={0} className="collapse collapse-plus border border-base-300 my-2">
        <div className="collapse-title text-[22px] text-[#196D7C] font-medium">
        1. Acceptance of Terms
        </div>
        <div className="collapse-content text-[18px] ml-5">
          <p>By accessing and using our Job Portal (airtalx.com), you agree to abide by these Terms of Use and any amendments thereto.</p>
        </div>
      </div> */}

      {/* Collapsible Section 2 */}
      {/* <div tabIndex={0} className="collapse collapse-plus border border-base-300  my-2">
        <div className="collapse-title text-[22px] text-[#196D7C] font-medium">
        2. Registration
        </div>
        <div className="collapse-content text-[18px] ml-5">
          <p>Users must be at least 18 years old to create an account. Users are responsible for all activities that occur under their account.</p>
        </div>
      </div> */}

      {/* Collapsible Section 3 */}
      {/* <div tabIndex={0} className="collapse collapse-plus border border-base-300  my-2">
        <div className="collapse-title text-[22px] text-[#196D7C] font-medium">
        3. User Responsibilities
        </div>
        <div className="collapse-content text-[18px] ml-5">
          <p>Users are responsible for the accuracy of the information they provide on the Website. Users agree not to use the Website for any unlawful purpose.</p>
        </div>
      </div> */}

      {/* Collapsible Section 4 */}
      {/* <div tabIndex={0} className="collapse collapse-plus border border-base-300  my-2">
        <div className="collapse-title text-[22px] text-[#196D7C] font-medium">
        4. Intellectual Property Rights
        </div>
        <div className="collapse-content text-[18px] ml-5">
          <p>All content on the Website is owned by us or our licensors and is protected by copyright and other intellectual property laws.</p>
        </div>
      </div> */}

      {/* Collapsible Section 5 */}
      {/* <div tabIndex={0} className="collapse collapse-plus border border-base-300 my-2">
        <div className="collapse-title text-[22px] text-[#196D7C] font-medium">
        5. Privacy
        </div>
        <div className="collapse-content text-[18px] ml-5">
          <p>Our Privacy Policy, which is incorporated into these Terms of Use by reference, further describes the collection and use of information on this Website.</p>
        </div>
      </div> */}
      {/* Collapsible Section 6 */}
      {/* <div tabIndex={0} className="collapse collapse-plus border border-base-300 my-2">
        <div className="collapse-title text-[22px] text-[#196D7C] font-medium">
        3. Job Responsibilities
        </div>
        <div className="collapse-content text-[18px] ml-5">
          <p>By accessing and using our Job Portal (airtalx.com), you agree to abide by these Terms of Use and any amendments thereto.</p>
        </div>
      </div> */}
      {/* Collapsible Section 7 */}
      {/* <div tabIndex={0} className="collapse collapse-plus border border-base-300  my-2">
        <div className="collapse-title text-[22px] text-[#196D7C]font-medium">
        7. Governing Law
        </div>
        <div className="collapse-content text-[18px] ml-5">
          <p>These Terms of Use shall be governed by the laws of the Philippines.</p>
        </div>
      </div> */}
      {/* Collapsible Section 8 */}
      {/* <div tabIndex={0} className="collapse collapse-plus border border-base-300  my-2">
        <div className="collapse-title text-[22px] text-[#196D7C] font-medium">
        8. Changes to Terms
        </div>
        <div className="collapse-content text-[18px] ml-5">
          <p>We reserve the right to modify these Terms of Use at any time. Your continued use of the Website constitutes your acceptance of such changes.</p>
        </div>
      </div> */}
      {/* Collapsible Section 9 */}
      {/* <div tabIndex={0} className="collapse collapse-plus border border-base-300  my-2">
        <div className="collapse-title text-[22px] text-[#196D7C] font-medium">
        9. Contact
        </div>
        <div className="collapse-content text-[18px] ml-5">
          <p>If you have any questions about these Terms of Use, please contact us at admin@airtalx.com.</p>
        </div>
      </div> */}
    </div>
  );
};

export default CollapsibleSections;
