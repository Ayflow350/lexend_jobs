"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription, // Optional, if you want to add descriptions under radio groups
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CompanyOnboardingData } from "@/lib/company-onboarding-schemas"; // Adjust path

const projectSizeOptions = [
  {
    value: "large",
    label: "Large",
    description:
      "Longer term or complex initiatives (ex. design and build a full website)",
  },
  {
    value: "medium",
    label: "Medium",
    description: "Well-defined projects (ex. a landing page)",
  },
  {
    value: "small",
    label: "Small",
    description:
      "Quick and straightforward tasks (ex. update text and images on a webpage)",
  },
];

const projectDurationOptions = [
  { value: "moreThan6Months", label: "More than 6 months" },
  { value: "3to6Months", label: "3 to 6 months" },
  { value: "1to3Months", label: "1 to 3 months" },
];

const experienceLevelOptions = [
  {
    value: "entry",
    label: "Entry",
    description: "Looking for someone relatively new to this field",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    description: "Looking for substantial experience in this field",
  },
  {
    value: "expert",
    label: "Expert",
    description: "Looking for comprehensive and deep expertise in this field",
  },
];

const Step3Scope: React.FC = () => {
  const { control } = useFormContext<CompanyOnboardingData>();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 items-start">
      {/* Left Column: Guidance */}
      <div className="space-y-3 md:space-y-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          Job post
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-foreground leading-tight">
          Next, estimate the scope of your work.
        </h1>
        <p className="text-base text-gray-600 dark:text-muted-foreground">
          Consider the size of your project and the time it will take. This
          helps set expectations.
        </p>
      </div>

      {/* Right Column: Form Inputs */}
      <div className="space-y-10">
        {" "}
        {/* Increased spacing between sections */}
        {/* Project Size */}
        <FormField
          control={control}
          name="projectSize"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold text-gray-800 dark:text-gray-200">
                Project Size
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {projectSizeOptions.map((option) => (
                    <FormItem
                      key={option.value}
                      className="flex items-center space-x-3 space-y-0 p-3 rounded-md border border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/5"
                    >
                      <FormControl>
                        <RadioGroupItem value={option.value} />
                      </FormControl>
                      <div className="cursor-pointer w-full">
                        <FormLabel className="font-medium text-gray-900 dark:text-foreground cursor-pointer">
                          {option.label}
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* How long will your work take? */}
        <FormField
          control={control}
          name="projectDuration"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold text-gray-800 dark:text-gray-200">
                How long will your work take?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {projectDurationOptions.map((option) => (
                    <FormItem
                      key={option.value}
                      className="flex items-center space-x-3 space-y-0 p-3 rounded-md border border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/5"
                    >
                      <FormControl>
                        <RadioGroupItem value={option.value} />
                      </FormControl>
                      <FormLabel className="font-normal text-gray-900 dark:text-foreground cursor-pointer w-full">
                        {" "}
                        {/* Make label take full width */}
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* What level of experience will it need? */}
        <FormField
          control={control}
          name="experienceLevel"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold text-gray-800 dark:text-gray-200">
                What level of experience will it need?
              </FormLabel>
              <FormDescription className="text-sm">
                This won&apos;t restrict any proposals, but helps match
                expertise to your budget.
              </FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {experienceLevelOptions.map((option) => (
                    <FormItem
                      key={option.value}
                      className="flex items-center space-x-3 space-y-0 p-3 rounded-md border border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/5"
                    >
                      <FormControl>
                        <RadioGroupItem value={option.value} />
                      </FormControl>
                      <div className="cursor-pointer w-full">
                        <FormLabel className="font-medium text-gray-900 dark:text-foreground cursor-pointer">
                          {option.label}
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Step3Scope;
