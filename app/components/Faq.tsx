"use client";

import Image from "next/image";
import React from "react";

const Faq: React.FC = () => {
  interface FAQ {
    question: string;
    answer: string;
  }

  // Unified FAQs for job posting and application
  const faqs: FAQ[] = [
    {
      question: "How do I get started?",
      answer:
        "Sign up for a free account, then complete your profile or company page to begin applying for or posting jobs.",
    },
    {
      question: "How do I post a job or apply to one?",
      answer:
        "Employers can click 'Post a Job' to create and publish listings; job seekers can browse listings and click 'Apply Now' to submit their resume and cover letter.",
    },
    {
      question: "Can I edit or withdraw a job or application?",
      answer:
        "Yes—visit 'My Jobs' to update or close your job listings, and 'My Applications' to edit details or withdraw before an employer reviews it.",
    },
    {
      question: "How do I track application or listing status?",
      answer:
        "You will receive email and in-app notifications when applications are viewed or interviews are scheduled, and employers see candidate updates in their dashboard.",
    },
    {
      question: "Where can I get help if I have questions?",
      answer:
        "Access our Help Center for guides, use the live chat widget, or email support@yourdomain.com for assistance.",
    },
  ];

  const [indexOpened, setIndexOpened] = React.useState<number | null>(null);

  const handleToggle = (i: number) => {
    setIndexOpened(indexOpened === i ? null : i);
  };

  return (
    <section className="container mx-auto max-w-[1200px] py-[30px]">
      <div className=" py-[50px] flex flex-col  text-center justify-center">
        <h1 className="font-semibold text-[47px]">
          Frequently Asked Questions
        </h1>
        <p className="pt-[10px] text-[#636669] ">
          Everything you need to know about finding jobs or hiring talent.
        </p>
      </div>
      <div className="divide-y divide-gray-200 max-w-[800px] mx-auto mb-16">
        {faqs.map((faq, i) => (
          <div key={i} className="py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold mb-2">{faq.question}</h2>
              <button onClick={() => handleToggle(i)}>
                {indexOpened === i ? (
                  <Image src="./Close.svg" alt="" width={24} height={24} />
                ) : (
                  <Image src="./Open.svg" alt="" width={24} height={24} />
                )}
              </button>
            </div>

            {/* wrap the answer in a div with overflow-hidden and transition-all */}
            <div
              className={`
        overflow-hidden
        transition-all duration-300 ease-in-out
        ${indexOpened === i ? "max-h-40 mt-2" : "max-h-0"}
      `}
            >
              <p className="text-[#636669]">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex text-center justify-center">
        <button className="text-[#14715B] flex gap-x-1 items-center  font-semibold text-[16px]">
          Still have a Question?
          <Image
            src="/Jobs/Arrow.svg"
            alt="job explore icon "
            width={16}
            height={16}
          />
        </button>
      </div>
    </section>
  );
};

export default Faq;
