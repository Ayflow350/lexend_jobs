"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { Star, Briefcase } from "lucide-react";
import { FreelancerProfileData } from "@/lib/freelancer-profile-schemas";

const Step8_Bio: React.FC = () => {
  const { control, watch } = useFormContext<FreelancerProfileData>();
  const bioValue = watch("professionalOverview", "");

  return (
    <div className="w-full">
      <div className="mb-10">
        <p className="text-sm text-gray-500 mb-2">8/10</p>
        <h1 className="text-3xl md:text-4xl font-medium text-gray-900 leading-snug">
          Great. Now write a bio to tell the world about yourself.
        </h1>
        <p className="mt-3 text-gray-600 max-w-3xl">
          Help people get to know you at a glance. What work do you do best?
          Tell them clearly, using paragraphs or bullet points. You can always
          edit later; just make sure you proofread now.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Textarea */}
        <div className="lg:col-span-2">
          <FormField
            control={control}
            name="professionalOverview"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Enter your top skills, experiences, and interests. This is one of the first things clients will see on your profile."
                    className="min-h-[250px] text-base p-4"
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between items-center mt-2">
                  <FormMessage />
                  <p
                    className={`text-sm ml-auto ${
                      bioValue.length < 100 ? "text-gray-400" : "text-primary"
                    }`}
                  >
                    {bioValue.length} / 100 characters minimum
                  </p>
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Right Column: Example Profile Card */}
        <div className="hidden lg:block">
          <div className="border rounded-xl p-6 bg-white shadow-sm max-w-sm">
            <div className="flex items-start mb-5">
              {/* Image Container */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img
                    src="https://i.pravatar.cc/150?u=marti-g" // Placeholder avatar
                    alt="Marti G."
                    // Key classes: object-cover ensures the image covers the area without distortion
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Online Status Indicator */}
                <span className="absolute -bottom-1 -right-1 block h-5 w-5 rounded-full bg-green-500 border-2 border-white"></span>
                {/* Crown Icon */}
                <span className="absolute -top-2 -left-2 transform -rotate-12 bg-white p-1 rounded-full shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-yellow-500"
                  >
                    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"></path>
                  </svg>
                </span>
              </div>
              {/* Name and Stats */}
              <div className="ml-4 mt-2">
                <h3 className="text-xl font-bold text-gray-900">Marti G.</h3>
                <div className="flex flex-wrap items-center text-sm text-gray-600 mt-1 gap-x-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-primary fill-primary mr-1" />
                    <span>5.0</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <span>$75.00/hr</span>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 text-gray-500 mr-1" />
                    <span>14 jobs</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Bio Text */}
            <div className="text-gray-700 text-sm space-y-4">
              <p>
                I&apos;m a developer experienced in building websites for small
                and medium-sized businesses. Whether you&apos;re trying to win
                work, list your services, or create a new online store, I can
                help.
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-gray-600">
                <li>Knows HTML and CSS3, PHP, jQuery, Wordpress, and SEO</li>
                <li>Full project management from start to finish</li>
                <li>
                  Regular communication is important to me, so let&apos;s keep
                  in touch.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step8_Bio;
