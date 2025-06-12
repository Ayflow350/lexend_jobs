// components/company-onboarding/Step6Review.tsx
"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { CompanyOnboardingData } from "@/lib/company-onboarding-schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming you have Card component

const Step6Review: React.FC = () => {
  const { getValues } = useFormContext<CompanyOnboardingData>();
  const formData = getValues();

  // Helper to format data for display (optional, but can make it cleaner)
  const renderValue = (
    value:
      | string
      | number
      | string[]
      | { [key: string]: string | number | null | undefined }
      | null
      | undefined
  ): string => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    if (typeof value === "object" && value !== null) {
      // Basic object formatting, you might want more specific formatting for budget
      if ("paymentType" in value) {
        // Heuristic for budget object
        const budget = value as CompanyOnboardingData["budget"];
        if (budget.paymentType === "hourly") {
          return `Hourly: $${budget.hourlyRateFrom || "N/A"} - $${
            budget.hourlyRateTo || "N/A"
          } /hr`;
        } else if (budget.paymentType === "fixed") {
          return `Fixed: $${budget.fixedPriceBudget || "N/A"}`;
        }
      }
      return JSON.stringify(value, null, 2);
    }
    return value !== undefined && value !== null && value !== ""
      ? String(value)
      : "Not specified";
  };

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-foreground mb-2">
          Review your Job Post
        </h1>
        <p className="text-base text-muted-foreground">
          Please review all the details below before publishing your job post.
        </p>
      </div>

      <Card className="w-full dark:bg-card">
        <CardHeader>
          <CardTitle className="text-xl">Job Details Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Job Title:
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {renderValue(formData.jobTitle)}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Skills:
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {renderValue(formData.skills)}
              </p>
            </div>
          </div>
          <hr className="dark:border-border" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3">
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Project Size:
              </p>
              <p className="text-gray-600 dark:text-gray-400 capitalize">
                {renderValue(formData.projectSize)}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Project Duration:
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {renderValue(
                  formData.projectDuration?.replace(/([A-Z])/g, " $1").trim()
                )}
              </p>{" "}
              {/* Basic formatting for enum */}
            </div>
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Experience Level:
              </p>
              <p className="text-gray-600 dark:text-gray-400 capitalize">
                {renderValue(formData.experienceLevel)}
              </p>
            </div>
          </div>
          <hr className="dark:border-border" />
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">
              Budget:
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {renderValue(formData.budget)}
            </p>
          </div>
          <hr className="dark:border-border" />
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">
              Job Description:
            </p>
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
              {renderValue(formData.jobDescription)}
            </p>
          </div>
          {/* You can add a section to display uploaded file names if you handle them */}
          {formData.attachments && formData.attachments.length > 0 && (
            <>
              <hr className="dark:border-border" />
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  Attachments:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                  {formData.attachments.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <p className="text-xs text-center text-muted-foreground">
        By publishing this job post, you agree to Upwork&#39;s Terms of Service.
      </p>
    </div>
  );
};

export default Step6Review;
