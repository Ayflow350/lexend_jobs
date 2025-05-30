"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: "spring", stiffness: 100 },
  }),
  hover: {
    scale: 1.015,
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 4 },
};

const Integrations: React.FC = () => {
  type TestJob = {
    id: number;
    company: string;
    role: string;
    description: string;
    buttonText: string;
    image: string;
  };

  const TestJobs: TestJob[] = [
    {
      id: 1,
      company: "Slack",
      role: "Marketer",
      description:
        "Notify your teammates of the latest activities with instant Slack messages.",
      buttonText: "Apply Now",
      image: "/Jobs/Job1.svg",
    },
    {
      id: 2,
      company: "Salesforce",
      role: "Lead Frontend Engr.",
      description:
        "Leave a lasting impression all done inside Salesforce CPQ platform.",
      buttonText: "Apply Now",
      image: "/Jobs/Job2.svg",
    },
    {
      id: 3,
      company: "Stripe",
      role: "Dev Ops Expert",
      description:
        "Collect credit card and ACH payments within your sales documents",
      buttonText: "Apply Now",
      image: "/Jobs/Job3.svg",
    },
    {
      id: 4,
      company: "PayPal",
      role: "Payment",
      description:
        "Provide a world-class checkout experience for your customers.",
      buttonText: "Apply Now",
      image: "/Jobs/Job5.svg",
    },
    {
      id: 5,
      company: "Zapier",
      role: "Integration platforms",
      description:
        "Create custom, automated workflows using your favorite Zaps.",
      buttonText: "Apply Now",
      image: "/Jobs/Job6.svg",
    },
    {
      id: 6,
      company: "HubSpot",
      role: "CRM",
      description:
        "Expand the ROI from your CRM and unlock easy generation and capabilities.",
      buttonText: "Apply Now",
      image: "/Jobs/Job4.svg",
    },
  ];

  return (
    <div className="bg-[#F5EEE9] mt-12">
      <section className="container mx-auto max-w-[1200px] py-12 px-4">
        <div className="mb-12 text-center">
          <h1 className="font-semibold text-[32px] md:text-[47px] leading-tight">
            Boost your efficiency with integrations
          </h1>
          <p className="mt-2 text-[#636669]">
            Connect every part of your business with integrations that will
            simplify your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {TestJobs.map((job, i) => (
            <motion.div
              key={job.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover="hover"
              variants={cardVariants}
              className="rounded-[16px] overflow-hidden bg-white min-h-[242px] p-6"
            >
              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="text-[#212529] font-semibold text-lg">
                    {job.company}
                  </h2>
                  <h3 className="text-[#636669] text-sm">{job.role}</h3>
                </div>
                <Image
                  src={job.image}
                  alt={`${job.company} logo`}
                  width={40}
                  height={40}
                />
              </div>
              <p className="max-w-[264px] text-[#636669] text-base mb-8">
                {job.description}
              </p>
              <motion.button
                initial="rest"
                whileHover="hover"
                variants={arrowVariants}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-[#14715B] flex items-center gap-2 font-semibold text-sm"
              >
                {job.buttonText}
                <motion.div variants={arrowVariants}>
                  <Image
                    src="/Jobs/Arrow.svg"
                    alt="arrow icon"
                    width={16}
                    height={16}
                  />
                </motion.div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ x: 4 }}
            className="text-[#14715B] flex items-center gap-2 font-semibold text-base"
          >
            Browse More Jobs
            <Image
              src="/Jobs/Arrow.svg"
              alt="job explore icon"
              width={16}
              height={16}
            />
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Integrations;
