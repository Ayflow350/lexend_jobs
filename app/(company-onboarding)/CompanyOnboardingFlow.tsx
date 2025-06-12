// components/company-onboarding/CompanyOnboardingFlow.tsx
"use client";

import React, { useState, useMemo } from "react";
import { useForm, FormProvider, Path, get } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CompanyOnboardingData,
  companyOnboardingDataSchema,
} from "@/lib/company-onboarding-schemas";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import Step1JobTitle from "./Step1JobTitle";
import Step2Skills from "./Step2Skills";
import Step3Scope from "./Step3Scope";
import Step4Budget from "./Step4Budget";
import Step5Description from "./Step5Description";
import Step6Review from "./Step6Review";

const totalSteps = 6;

const stepFields: Record<number, Path<CompanyOnboardingData>[]> = {
  1: ["jobTitle"],
  2: ["skills"],
  3: ["projectSize", "projectDuration", "experienceLevel"],
  4: ["budget.paymentType"], // Simplified for step validation, full validation on submit
  5: ["jobDescription", "attachments"],
};

const getNextStepName = (currentStep: number): string => {
  if (currentStep === 1) return "Skills";
  if (currentStep === 2) return "Scope";
  if (currentStep === 3) return "Budget";
  if (currentStep === 4) return "Description";
  if (currentStep === 5) return "Review";
  return "Publish Job Post";
};

const CompanyOnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm<CompanyOnboardingData>({
    resolver: zodResolver(companyOnboardingDataSchema),
    mode: "onChange",
    defaultValues: {
      jobTitle: "",
      skills: [],
      projectSize: undefined,
      projectDuration: undefined,
      experienceLevel: undefined,
      budget: {
        paymentType: undefined,
        hourlyRateFrom: undefined,
        hourlyRateTo: undefined,
        fixedPriceBudget: undefined,
      },
      jobDescription: "",
      attachments: undefined,
    },
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors, isValid: isOverallFormValid, isSubmitting },
  } = methods;

  const handleNext = async () => {
    if (currentStep === totalSteps) {
      handleSubmit(onSubmit)();
      return;
    }
    const fieldsForCurrentStep: Path<CompanyOnboardingData>[] =
      stepFields[currentStep] || [];
    let isStepCurrentlyValid = true;
    if (fieldsForCurrentStep.length > 0) {
      isStepCurrentlyValid = await trigger(fieldsForCurrentStep);
    }
    if (isStepCurrentlyValid) {
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Step validation failed. Errors:", errors);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = (data: CompanyOnboardingData) => {
    console.log("Final Onboarding data submitted:", data);
    alert("Job Post Submitted (Simulated)\n" + JSON.stringify(data, null, 2));
  };

  const progressValue = (currentStep / totalSteps) * 100;

  const isCurrentStepFieldsValidForNextButton = useMemo(() => {
    if (currentStep === totalSteps) {
      return isOverallFormValid;
    }
    const currentFieldsForStep: Path<CompanyOnboardingData>[] =
      stepFields[currentStep] || [];
    if (currentFieldsForStep.length === 0) return true;
    const hasErrorInCurrentStepFields = currentFieldsForStep.some(
      (fieldPath) => !!get(errors, fieldPath)
    );
    return !hasErrorInCurrentStepFields;
  }, [errors, currentStep, isOverallFormValid]);

  // --- DEBUG LOGS FOR BUTTON VISIBILITY ---
  console.log("--- DEBUG INFO FOR BUTTONS ---");
  console.log("Current Step:", currentStep);
  console.log("Is Submitting:", isSubmitting);
  console.log(
    "Is Current Step Valid for Next:",
    isCurrentStepFieldsValidForNextButton
  );
  console.log("Is Overall Form Valid (for publish):", isOverallFormValid);
  console.log(
    "Calculated 'disabled' for Next/Publish button:",
    isSubmitting || !isCurrentStepFieldsValidForNextButton
  );
  // --- END DEBUG LOGS ---

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50 dark:bg-background flex flex-col">
        <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800/30 p-3 text-center text-sm text-blue-700 dark:text-blue-300">
          Just a reminder to publish your job post, you&#39;ll need to
          <a
            href="#"
            className="font-medium underline hover:text-blue-600 dark:hover:text-blue-200"
          >
            verify your phone number
          </a>
        </div>

        <main className="flex-grow flex flex-col items-center justify-start pt-8 sm:pt-10 pb-10 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-4xl xl:max-w-5xl">
            <div className="mb-10 md:mb-16">
              <div className="flex justify-between items-center mb-2.5">
                <p className="text-sm font-medium text-muted-foreground">
                  {currentStep === totalSteps ? "" : "Job post"}
                  {currentStep < totalSteps && (
                    <span className="text-gray-400 dark:text-gray-600 mx-1">
                      •
                    </span>
                  )}
                  {currentStep === totalSteps
                    ? ""
                    : `Step ${currentStep} of ${totalSteps}`}
                </p>
                {currentStep === totalSteps && (
                  <p className="text-sm font-medium text-muted-foreground">
                    Review & Publish
                  </p>
                )}
              </div>
              {currentStep < totalSteps && (
                <Progress value={progressValue} className="w-full h-1" />
              )}
            </div>
            <div className="min-h-[400px] md:min-h-[450px]">
              {currentStep === 1 && <Step1JobTitle />}
              {currentStep === 2 && <Step2Skills />}
              {currentStep === 3 && <Step3Scope />}
              {currentStep === 4 && <Step4Budget />}
              {currentStep === 5 && <Step5Description />}
              {currentStep === totalSteps && <Step6Review />}
            </div>
          </div>
        </main>

        <footer className="sticky bottom-0 bg-white dark:bg-card border-t border-border p-4 shadow-sm">
          <div className="container mx-auto max-w-4xl xl:max-w-5xl flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1 || isSubmitting}
              className="h-11 px-6 text-base 
                         border-4 border-blue-500 bg-blue-100 text-black  /* <<< DEBUG STYLE BACK BUTTON */
                         disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-500" // DEBUG DISABLED STYLE
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={isSubmitting || !isCurrentStepFieldsValidForNextButton}
              className="bg-green" // DEBUG DISABLED STYLE
            >
              {isSubmitting
                ? currentStep === totalSteps
                  ? "Publishing..."
                  : "Proceeding..."
                : currentStep === totalSteps
                ? "Publish Job Post"
                : `Next: ${getNextStepName(currentStep)}`}
            </Button>
          </div>
        </footer>
      </div>
    </FormProvider>
  );
};

export default CompanyOnboardingFlow;
