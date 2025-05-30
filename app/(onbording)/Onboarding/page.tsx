import React from "react";
import OnboardingChoice from "../OnboardingChoice"; // Adjust path as necessary

const OnboardingStartPage: React.FC = () => {
  return (
    // This div acts as the full-page container
    <div className="min-h-screen flex items-center justify-center bg-[#F5EEE9] p-4">
      <OnboardingChoice />
    </div>
  );
};

export default OnboardingStartPage;
