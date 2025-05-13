import Image from "next/image";
import React from "react";

const Integrations = () => {
  type testJobs = {
    id: number;
    company: string;
    role: string;
    description: string;
    buttonText: string;
    image: string;
  };
  const TestJobs: testJobs[] = [
    {
      id: 1,
      company: "Slack",
      role: "Marketer",
      description:
        "Notify your teammates of the latest activities with instant Slack messages.",
      buttonText: "Apply Now",
      image: "./Jobs/Job1.svg",
    },

    {
      id: 2,
      company: "Salesforce",
      role: "Lead Frontend Engr.",
      description:
        "Leave a lasting impression all done inside Salesforce CPQ platform.",
      buttonText: "Apply Now",
      image: "./Jobs/Job2.svg",
    },
    {
      id: 3,
      company: "Stripe",
      role: "Dev Ops Expert",
      description:
        "Collect credit card and ACH payments within your sales documents",
      buttonText: "Apply Now",
      image: "./Jobs/Job3.svg",
    },

    {
      id: 4,
      company: "PayPal",
      role: "Payment",
      description:
        "Provide a world-class checkout experience for your customers.",
      buttonText: "Apply Now",
      image: "./Jobs/Job5.svg",
    },

    {
      id: 5,
      company: "Zapier",
      role: "Integration platforms",
      description:
        "Create custom, automated workflows using your favorite Zaps.",
      buttonText: "Apply Now",
      image: "./Jobs/Job6.svg",
    },
    {
      id: 6,
      company: "HubSpot",
      role: "CRM",
      description:
        "Expand the ROI from your CRM and unlock easy generation and capabilities.",
      buttonText: "Apply Now",
      image: "./Jobs/Job4.svg",
    },
  ];
  return (
    <div className=" bg-[#F5EEE9] mt-[50px] ">
      <section className="container mx-auto max-w-[1200px] py-[30px]">
        <div className=" py-[50px] flex flex-col  text-center justify-center">
          <h1 className="font-semibold text-[32px] md:text-[47px] leading-[1.2] tracking-tight">
            Boost your efficiency with integrations
          </h1>
          <p className="pt-[10px] text-[#636669] ">
            Connect every part of your business with integrations that will
            simplify your workflow.
          </p>
        </div>
        <div className="grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-3   gap-8 mb-16">
          {TestJobs.map((job) => (
            <div key={job.id} className="">
              <div className="bg-white overflow-y-hidden min-h-[242px] p-6 rounded-[16px] ">
                <div className="flex justify-between mb-[23.5px]">
                  <div className="">
                    <h1 className="text-[#212529] font-semibold text-[19px]">
                      {job.company}
                    </h1>
                    <h2 className="text-[#636669] text-[13px]">{job.role}</h2>
                  </div>
                  <div>
                    <Image
                      src={job.image}
                      alt="company logos"
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
                <div className=" max-w-[264px] text-[#636669]  text-[15px] mb-[32px]">
                  {job.description}
                </div>
                <button className="text-[#14715B] flex gap-x-1 items-center  font-semibold text-[14px]">
                  {job.buttonText}
                  <Image
                    src="/Jobs/Arrow.svg"
                    alt="job explore icon "
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex text-center justify-center">
          <button className="text-[#14715B] flex gap-x-1 items-center  font-semibold text-[16px]">
            Browse More Jobs
            <Image
              src="/Jobs/Arrow.svg"
              alt="job explore icon "
              width={16}
              height={16}
            />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Integrations;
