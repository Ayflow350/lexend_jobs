"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TestimonialItem {
  id: number;
  testimonial: string;
  name: string;
  role: string;
}

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    testimonial: `We're looking for people who share our vision! Most of our time used to be taken up by administrative work, whereas now we can focus on building out benefits to help our employees.`,
    name: "Sophia Ramirez",
    role: "HR Director, BrightPath Inc.",
  },
  {
    id: 2,
    testimonial: `Posting roles has never been easier. We save hours every week by automating candidate outreach, freeing us to refine our company culture.`,
    name: "Ethan Chen",
    role: "Talent Acquisition Lead",
  },
  {
    id: 3,
    testimonial: `The applicant tracking tools are fantastic. We quickly identify top performers without manual spreadsheets, so our team can focus on strategic hiring.`,
    name: "Olivia Singh",
    role: "People Operations Manager",
  },
  {
    id: 4,
    testimonial: `As a developer, I love how seamless the apply flow is. It only takes a few clicks to submit my resume and get invited to interviews.`,
    name: "Mason Lee",
    role: "Senior Frontend Engineer",
  },
  {
    id: 5,
    testimonial: `Our startup’s growth accelerated when we switched to this platform. The quality of applicants skyrocketed and time-to-hire dropped dramatically.`,
    name: "Ava Patel",
    role: "CEO, InnovateHub",
  },
  {
    id: 6,
    testimonial: `We can now post multiple openings and track progress in one place. It's transformed our HR process from chaos to clarity.`,
    name: "Liam O’Connor",
    role: "Head of Recruitment, SpeedHire",
  },
  {
    id: 7,
    testimonial: `The candidate screening features are a game changer. We spend less time filtering and more time engaging with the best fits.`,
    name: "Emma Müller",
    role: "Recruitment Specialist",
  },
  {
    id: 8,
    testimonial: `This platform’s dashboard keeps everything organized. Notifications let me know the moment someone applies, so I never miss a great candidate.`,
    name: "Noah Johnson",
    role: "VP of Talent, NextGen Co.",
  },
  {
    id: 9,
    testimonial: `As an applicant, I appreciate the clear job descriptions and smooth communication. I felt in control of my job search every step of the way.`,
    name: "Isabella García",
    role: "Data Analyst",
  },
  {
    id: 10,
    testimonial: `Our annual hiring spree was a breeze. We onboarded ten new hires in weeks instead of months, thanks to automated workflows.`,
    name: "Lucas Smith",
    role: "People Lead, ScaleX",
  },
  {
    id: 11,
    testimonial: `The integrated interview scheduler saved me back-and-forth emails. Candidates book slots themselves, and my calendar stays in sync.`,
    name: "Mia Nguyen",
    role: "Engineering Manager",
  },
  {
    id: 12,
    testimonial: `Reporting and analytics give us deep insights into our hiring funnel. We can spot bottlenecks early and optimize our process.`,
    name: "Jackson Brown",
    role: "HR Analytics Lead",
  },
  {
    id: 13,
    testimonial: `With customizable templates, every job post looks professional. We maintain brand consistency without extra design work.`,
    name: "Amelia Rossi",
    role: "Marketing & Talent Coordinator",
  },
  {
    id: 14,
    testimonial: `Our small team now feels like a well-oiled machine. Automations handle the repetitive tasks, letting us focus on strategic growth.`,
    name: "Elijah Davis",
    role: "COO, VentureWorks",
  },
  {
    id: 15,
    testimonial: `I found my perfect role within days. The platform’s matching algorithm connected me with companies aligned to my skills and values.`,
    name: "Charlotte Wilson",
    role: "UX/UI Designer",
  },
];

const SlideTestimonial: React.FC<{ item: TestimonialItem }> = ({ item }) => (
  <div className=" min-w-[371px] min-h-[335px] md:min-w-[612px] md:min-h-[368px] bg-white rounded-[12px] p-6 shadow flex flex-col ">
    <div className="flex flex-col  pt-[48px] px-[48px]">
      <div className="pb-6">
        <Image src="/Stars.svg" alt="star" width={100} height={20} />
      </div>
      <p className=" text-[16px] lg:text-[19px] text-[#212529]">
        &quot;{item.testimonial}&quot;
      </p>
    </div>
    <div className="pt-[48px] px-[48px]">
      <h3 className="font-bold text-lg">{item.name}</h3>
      <p className="text-sm text-[#636669]">{item.role}</p>
    </div>
  </div>
);

const TestimonialCarousel: React.FC = () => {
  const row1 = testimonials.slice(0, 8);
  const row2 = testimonials.slice(8);

  const marqueeOpts = {
    animate: { x: ["0%", "-50%"] },
    transition: { duration: 20, ease: "linear", repeat: Infinity },
  };

  return (
    <section className="relative bg-[#F5EEE9] overflow-hidden py-16">
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* header */}
        <div className="text-center mb-12">
          <h1 className="font-semibold text-[47px]">
            Don&apos;t just take our words!
          </h1>
          <p className="mt-2 text-[#636669]">
            Hear how Lexend helped businesses scale and job seekers land their
            dream roles.
          </p>
        </div>

        {/* DESKTOP: sliding marquees */}
        <div className="hidden sm:block">
          <div className="mb-8 overflow-hidden">
            <motion.div className="flex gap-8" {...marqueeOpts}>
              {[...row1, ...row1].map((item) => (
                <SlideTestimonial key={`top-${item.id}`} item={item} />
              ))}
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            >
              {[...row2, ...row2].map((item) => (
                <SlideTestimonial key={`bot-${item.id}`} item={item} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* MOBILE: static first-3 cards in one column */}
        <div className="sm:hidden grid grid-cols-1 gap-8">
          {testimonials.slice(0, 3).map((item) => (
            <SlideTestimonial key={`mobile-${item.id}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
