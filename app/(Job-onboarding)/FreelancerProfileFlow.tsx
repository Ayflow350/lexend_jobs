"use client";

import React, { useState, useMemo } from "react";
import { useForm, FormProvider, Path, get } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FreelancerProfileData,
  freelancerProfileSchema,
} from "@/lib/freelancer-profile-schemas";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import Step1_MethodSelection from "../(Job-onboarding)/steps/Step1_MethodSelection";
import Step2_Category from "../(Job-onboarding)/steps/Step2_Category";
import Step3_Skills from "../(Job-onboarding)/steps/Step3_Skills";
import Step4_Title from "../(Job-onboarding)/steps/Step4_Title";
import Step5_Experience from "../(Job-onboarding)/steps/Step5_Experience";
import Step6_Education from "../(Job-onboarding)/steps/Step6_Education";
import Step7_Languages from "../(Job-onboarding)/steps/Step7_Languages";
import Step8_Bio from "../(Job-onboarding)/steps/Step8_Bio";
import Step9_Rate from "../(Job-onboarding)/steps/Step9_Rate";
import Step10_Location from "../(Job-onboarding)/steps/Step10_Location";
import Step11_Review from "../(Job-onboarding)/steps/Step11_Review";
const totalOnboardingSteps = 10;
const manualFlowStartStep = 2;
const reviewStep = 11;

const stepFields: Record<number, Path<FreelancerProfileData>[]> = {
  2: ["mainCategory", "specialties"],
  3: ["skills"],
  4: ["professionalTitle"],
  5: ["employmentHistory"],
  6: ["educationHistory"],
  7: ["englishProficiency", "otherLanguages"],
  8: ["professionalOverview"],
  9: ["hourlyRate"],
  10: [
    "profilePhoto",
    "dateOfBirth",
    "country",
    "streetAddress",
    "city",
    "stateProvince",
    "zipCode",
    "phone",
  ],
};

const getNextButtonText = (currentStep: number): string => {
  if (currentStep === 10) return "Review Profile";
  // The footer is hidden on step 11, so this text is effectively not used.
  if (currentStep === 11) return "Submit Profile";
  return "Next";
};

const FreelancerProfileFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isManualFlow, setIsManualFlow] = useState(false);

  const methods = useForm<FreelancerProfileData>({
    resolver: zodResolver(freelancerProfileSchema),
    mode: "onChange",
    defaultValues: {
      mainCategory: "",
      specialties: [],
      skills: [],
      professionalTitle: "",
      employmentHistory: [],
      educationHistory: [],
      englishProficiency: "basic",
      otherLanguages: [],
      professionalOverview: "",
      hourlyRate: undefined,
      profilePhoto: null,
      dateOfBirth: undefined,
      country: "",
      streetAddress: "",
      aptSuite: "",
      city: "",
      stateProvince: "",
      zipCode: "",
      phone: { countryCode: "+1", phoneNumber: "" },
    },
  });

  const {
    watch,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const employmentHistory = watch("employmentHistory", []);
  const educationHistory = watch("educationHistory", []);
  const languages = watch("otherLanguages", []);

  const handleMethodSelect = (method: "linkedin" | "resume" | "manual") => {
    if (method === "manual") {
      setIsManualFlow(true);
      setCurrentStep(manualFlowStartStep);
    } else {
      alert(
        `${
          method.charAt(0).toUpperCase() + method.slice(1)
        } import flow would start here.`
      );
    }
  };

  const onFinalSubmit = (data: FreelancerProfileData) => {
    console.log("FINAL SUBMITTED PROFILE DATA:", data);
    alert(
      "Profile Submitted Successfully! Check the console for the final data object."
    );
  };

  const handleNext = async () => {
    const fields = stepFields[currentStep];
    const isStepValid = fields ? await trigger(fields) : true;

    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    if (currentStep >= 5 && currentStep <= 7) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > manualFlowStartStep) {
      setCurrentStep((prev) => prev - 1);
    } else {
      setIsManualFlow(false);
      setCurrentStep(1);
    }
  };

  const handleEditSection = (stepNumber: number) => {
    if (stepNumber >= manualFlowStartStep && stepNumber < reviewStep) {
      setCurrentStep(stepNumber);
    }
  };

  const isStepInvalid = useMemo(() => {
    if (currentStep === reviewStep) return !isValid;
    if (currentStep === 5) return employmentHistory?.length === 0;
    if (currentStep === 6) return educationHistory?.length === 0;
    if (currentStep === 7) return !watch("englishProficiency");

    const fieldsForCurrentStep = stepFields[currentStep];
    if (!fieldsForCurrentStep) return false;
    return fieldsForCurrentStep.some((field) => get(errors, field));
  }, [
    errors,
    currentStep,
    employmentHistory,
    educationHistory,
    languages,
    watch,
    isValid,
  ]);

  if (!isManualFlow) {
    return <Step1_MethodSelection onSelect={handleMethodSelect} />;
  }

  const progressValue =
    currentStep > totalOnboardingSteps
      ? 100
      : ((currentStep - 1) / totalOnboardingSteps) * 100;

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-grow flex flex-col items-center justify-start pt-8 sm:pt-10 pb-10 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-5xl">
            {currentStep < reviewStep && (
              <div className="mb-10 md:mb-16">
                <p className="text-sm font-medium text-muted-foreground mb-2.5">{`Step ${
                  currentStep - 1
                } of ${totalOnboardingSteps}`}</p>
                <Progress value={progressValue} className="w-full h-1" />
              </div>
            )}
            <div className="min-h-[600px] flex items-start justify-center">
              {currentStep === 2 && <Step2_Category />}
              {currentStep === 3 && <Step3_Skills />}
              {currentStep === 4 && <Step4_Title />}
              {currentStep === 5 && <Step5_Experience />}
              {currentStep === 6 && <Step6_Education />}
              {currentStep === 7 && <Step7_Languages />}
              {currentStep === 8 && <Step8_Bio />}
              {currentStep === 9 && <Step9_Rate />}
              {currentStep === 10 && <Step10_Location />}
              {/* === FIX #1: Pass the onSubmit function === */}
              {currentStep === reviewStep && (
                <Step11_Review
                  onEdit={handleEditSection}
                  onSubmit={handleSubmit(onFinalSubmit)}
                />
              )}
            </div>
          </div>
        </main>

        {/* === FIX #2: Conditionally render the footer === */}
        {currentStep < reviewStep && (
          <footer className="sticky bottom-0 bg-white border-t border-border p-4 shadow-sm">
            <div className="container mx-auto max-w-5xl flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isSubmitting}
              >
                Back
              </Button>
              <div className="flex items-center gap-4">
                {currentStep >= 5 && currentStep <= 7 && (
                  <Button
                    variant="ghost"
                    onClick={handleSkip}
                    className="text-primary hover:text-primary"
                  >
                    Skip for now
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={isSubmitting || isStepInvalid}
                  className={cn("transition-colors", {
                    "bg-primary text-primary-foreground hover:bg-primary/90":
                      !isStepInvalid,
                    "bg-gray-200 text-gray-400 cursor-not-allowed":
                      isStepInvalid,
                  })}
                >
                  {getNextButtonText(currentStep)}
                </Button>
              </div>
            </div>
          </footer>
        )}
      </div>
    </FormProvider>
  );
};

export default FreelancerProfileFlow;
