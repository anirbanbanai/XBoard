import React from "react";
import img1 from "../../image/mainicon.svg";
import img2 from "../../image/man.svg";
import img3 from "../../image/Founder.svg";
import img4 from "../../image/shield-check.svg";
const About = () => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <img className="w-[90px] h-[90px]" src={img1} alt="" />
        <h2 className="text-3xl font-semibold"> airTalX</h2>
      </div>

      <h2 className="text-center text-[32px] text-[#20A3BA] font-semibold">
        Your Trusted Platform for Online Jobs in the Philipines!
      </h2>

      <div className="flex justify-center gap-4 mt-9">
        <div className="p-4 border border-base-300">
          <img className="w-[200px] h-[200px]" src={img2} alt="" />
          <h2 className="text-2xl">Airon Mark Ramirez </h2>
          <p className="text-[12px]">Oprating Officer</p>
        </div>
        <div className="p-4 border border-base-300">
          <img className="w-[200px] h-[200px]" src={img2} alt="" />
          <h2 className="text-2xl">Founder 2 </h2>
          <p className="text-[12px]">Oprating Officer</p>
        </div>
      </div>

      <div className="mt-14 bg-[#cdf1fa] p-7">
        <h1 className="text-4xl font-semibold text-[#196D7C] text-center">About Us</h1>
        <div className="grid grid-cols-2 gap-5 mt-7">
          <div>
            <img className="w-[372px] h-[302px] ml-[20%]" src={img3} alt="" />
          </div>

          <div>
            <h2 className="text-[12px] flex justify-start">
              My professional journey took flight in the vibrant sectors of
              Business Process Outsourcing (BPO), Recruitment Process
              Outsourcing (RPO), and Knowledge Process Outsourcing (KPO).
              Starting as an HR analyst in a top-tier outsourcing firm, I was
              not just a licensed teacher but also a Latin honor graduate from a
              prestigious university in the Philippines. This role served as a
              launchpad, enabling me to dive deep into the realm of global
              talent sourcing, working alongside Fortune 500 companies and major
              tech firms.  <br />
              <br />
              This hands-on experience sharpened my skills in aligning employers
              with the ideal talent, and I identified a need in the market for a
              more efficient recruitment solution. This realization led to the
              inception of airTalX. My mission is clear and impactful: to
              revolutionize how companies discover and recruit top-tier talent
              within the BPO, RPO, and KPO sectors. With airTalX, I am committed
              to making the recruitment process more streamlined, effective, and
              accessible for all. Our Actions Reflect Our Words!  <br />
              <br />  We're not just talk, we're about action. Our team is a
              testament to this, with a significant portion of our workforce
              hailing directly from the Philippines. Even our top executives,
              including our Leader and Manager, are proud products of the
              Philippines, born and bred. We believe in the talent and potential
              that the Philippines has to offer, and we're committed to
              nurturing it.
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-14 mb-32 mx-auto w-[80%]">
        <h1 className="text-4xl font-semibold text-[#196D7C] text-center">Our Motives</h1>
        <h4 className="text-[12px] mt-2">
          At airtalx, we prioritize the safety and satisfaction of our job
          seekers. We're proud to be recognized as the most reliable platform
          for securing long-term online jobs in the Philippines.  <br /><br /> Whether
          you're seeking part-time work or a full-time career, airtalx offers a
          wealth of opportunities. With thousands of jobs posted daily, you're
          sure to find the perfect fit for your skills and schedule. Start your
          journey with airtalx today!
        </h4>

        <div className="flex justify-center gap-5 w-[50%] mt-8 mx-auto">
            <div className="bg-blue-100 p-5">
                <img src={img4} alt="" />
                <p className="text-[12px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, exercitationem animi!</p>
            </div>
            <div className="bg-blue-100 p-5">
                <img src={img4} alt="" />
                <p className="text-[12px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, exercitationem animi!</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
