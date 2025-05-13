"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Feature = {
  id: number;
  step: string;
  title: string;
  heading2: string;
  description: string;
  imageUrl: string;
  cta: string;
};

const FeaturesData: Feature[] = [
  {
    id: 1,
    step: "Step 2",
    title: "Discovery",
    heading2:
      "Perfectly get matched to your expertise and preferences using dynamic filters and real-time updates.",
    description: "Find the perfect role or candidate instantly",
    imageUrl: "/Features/Feature2.png",
    cta: "Start Searching",
  },
  {
    id: 2,
    step: "Step 1",
    title: "Resume Builder",
    heading2:
      "In minutes, using our drag-and-drop editor and templates, transform your professional story into a stunning CV.",
    description: "Craft a professional CV",
    imageUrl: "/Features/Feature1.png",
    cta: "Build Your Resume",
  },
  {
    id: 3,
    step: "Step 3",
    title: "Easy Apply",
    heading2:
      "Apply to multiple jobs with one click using your saved profile and documents.",
    description: "Experience hassle-free applications",
    imageUrl: "/Features/Feature3.png",
    cta: "Apply Now",
  },
  {
    id: 4,
    step: "Step 4",
    title: "Certifications",
    heading2:
      "Display badges on your profile by validating your expertise with our tailored built-in assessments.",
    description: "Validate your expertise with a standard test",
    imageUrl: "/Features/Feature4.png",
    cta: "Take a Test",
  },
];

export default function FeaturesSection() {
  const [activeStep, setActiveStep] = useState<number>(2);
  const activeFeature = FeaturesData.find((f) => f.id === activeStep);

  return (
    <section className="container mx-auto max-w-[1200px]">
      <div className="px-4 text-center">
        <h1 className="text-[32px] md:text-[40px] lg:text-[47px] font-bold text-[#0E0E0F] mb-4">
          Smart features for your business
        </h1>
        <p className="text-[#636669] text-[16px] md:text-[17px] w-[300px] md:w-[687px] mx-auto mb-8">
          We focus on making your content more accessible and profitable with
          intuitive, end-to-end tools.
        </p>

        {/* Navigation Buttons */}

        <div className=" container mx-auto  max-w-[1000px] px-[24px]">
          <div className=" overflow-x-auto whitespace-nowrap scrollbar-hide  bg-[#F5EEE9] items-center justify-center  px-4 py-2 rounded-xl mb-8 ">
            {FeaturesData.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveStep(feature.id)}
                className={`inline-block px-4 py-5 md:py-5 mr-4 text-base lg:text-lg md:justify-center font-bold transition ${
                  activeStep === feature.id
                    ? "text-black border-b-2 border-[#14715B]"
                    : "text-black"
                }`}
              >
                {feature.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Feature Display */}
        {activeFeature && (
          <div className="max-w-4xl mx-auto p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <Image
                src={activeFeature.imageUrl}
                alt={activeFeature.title}
                width={488}
                height={488}
                className="rounded-lg"
              />
              <div className="text-left">
                <p className=" text-[24px] md:text-[36px] font-bold  leading-[1.2] md:leading-[40px] mb-4 ">
                  {activeFeature.description}
                </p>
                <p className="text-[#636669] text-[16px] text-left leading-[25px] mb-8  w-[300px] md:w-[404px] ">
                  {activeFeature.heading2}
                </p>
                <button className="inline-flex items-center leading-normal  gap-2 font-semibold text-[16px] md:text-[17px] text-[#14715B]">
                  {activeFeature.cta}
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
