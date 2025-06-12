"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CompanyOnboardingData } from "@/lib/company-onboarding-schemas"; // Adjust path

const Step1JobTitle: React.FC = () => {
  const { control } = useFormContext<CompanyOnboardingData>(); // Use FormProvider context

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Left Column: Guidance */}
      <div className="space-y-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          Job post
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-foreground">
          Let&apos;s start with a strong title.
        </h1>
        <p className="text-gray-600 dark:text-muted-foreground">
          This helps your job post stand out to the right candidates. It’s the
          first thing they’ll see, so make it count!
        </p>
      </div>

      {/* Right Column: Form Input */}
      <div className="space-y-6">
        <FormField
          control={control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                Write a title for your job post
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Build a responsive WordPress site"
                  className="py-3 px-4 text-base" // Larger input
                  {...field}
                />
              </FormControl>
              <FormDescription>
                We&apos;ll match you with candidates that specialize in your
                required domain.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-foreground mb-2">
            Example titles:
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-muted-foreground">
            <li>
              Build responsive WordPress site with booking/payment functionality
            </li>
            <li>AR experience needed for virtual product demos (ARCore)</li>
            <li>
              Developer needed to update Android app UI for new OS/device specs
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Step1JobTitle;
