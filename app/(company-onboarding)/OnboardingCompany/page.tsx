// In PostJobPage.tsx - Manual Approach (Less Recommended)
"use client";
import { useState, useEffect } from "react";
import CompanyOnboardingFlow from "../CompanyOnboardingFlow";
import CompanyOnboardingFlowSkeleton from "../OnboardingCompany/OnboardingFlowSkeleton";

export default function PostJobPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay or data fetch
    const timer = setTimeout(() => setIsLoading(false), 1000); // Show skeleton for 1 sec
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <CompanyOnboardingFlowSkeleton />;
  }

  return <CompanyOnboardingFlow />;
}
