"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FreelancerProfileData } from "@/lib/freelancer-profile-schemas";

const Step4_Title: React.FC = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<FreelancerProfileData>();

  return (
    // The only change is removing "mx-auto" from this div's className
    <div className="w-full">
      <div className="mb-10  max-w-2xl">
        {/* I've also removed the "4/10" text to match your provided code */}
        <h1 className="text-3xl font-medium text-gray-900 leading-snug">
          Got it. Now, add a title to tell the world what you do.
        </h1>
        <p className="mt-3 text-gray-600">
          It&apos;s the very first thing clients see, so make it count. Stand
          out by describing your expertise in your own words.
        </p>
      </div>
      <div className=" max-w-2xl">
        <FormField
          control={control}
          name="professionalTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-gray-800">
                Your professional role
              </FormLabel>
              <div className="relative mt-2">
                <Input
                  {...field}
                  placeholder="e.g., Full Stack Developer | React & Node Expert"
                  className="h-12 text-base pr-10" // Add padding to the right for the button
                />
                {/* Clear button appears only when there is text */}
                {field.value && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full text-gray-500 hover:text-gray-800"
                    onClick={() =>
                      setValue("professionalTitle", "", {
                        shouldValidate: true,
                      })
                    }
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {errors.professionalTitle && <FormMessage className="mt-2" />}
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Step4_Title;
