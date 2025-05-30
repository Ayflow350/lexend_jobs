"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Using App Router navigation
import Link from "next/link";
import { HiOutlineUser, HiOutlineBuildingOffice2 } from "react-icons/hi2";
import RoleCard from "./RoleCard"; // Make sure this path is correct

// shadcn/ui Button (optional, but recommended for consistency)
// If you decide to use it, make sure to add it: npx shadcn@latest add button
// import { Button as ShadButton } from "@/components/ui/button";

// Interfaces (assuming these are correct and defined)
interface ElementAcceptingClassNameProps {
  className?: string;
}
type SelectedRole = "seeker" | "company";
interface RoleOption {
  id: SelectedRole;
  icon: React.ReactElement<ElementAcceptingClassNameProps>;
  title: string;
  description: string;
}

const OnboardingChoice: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<SelectedRole>("seeker");
  const router = useRouter();

  const handleRoleSelect = (role: SelectedRole): void => {
    setSelectedRole(role);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (selectedRole === "seeker") {
      console.log("Navigating to Job Seeker signup page...");
      // Corrected Path: Assuming your job seeker signup page is at /signup/job-seeker or /JobSeekerSignUp
      router.push("/CompanySignUp"); // Or your actual path e.g., "/JobSeekerSignUp"
    } else if (selectedRole === "company") {
      console.log("Navigating to Company signup page...");
      // Corrected Path: Assuming your company signup page is at /signup/company or /CompanySignUp
      router.push("/JobSeekerSignUp"); // Or your actual path e.g., "/CompanySignUp"
    }
  };

  const roles: RoleOption[] = [
    {
      id: "seeker",
      icon: <HiOutlineUser />,
      title: "I'm a Job Seeker",
      description: "Find your next career move or freelance opportunity.",
    },
    {
      id: "company",
      icon: <HiOutlineBuildingOffice2 />,
      title: "I'm a Company",
      description: "Hire skilled talent for your projects and teams.",
    },
  ];

  const getButtonText = (): string => {
    if (selectedRole === "seeker") return "Apply as a Job Seeker";
    if (selectedRole === "company") return "Continue as a Company";
    return "Continue";
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl w-full max-w-3xl mx-auto">
      <h2
        id="onboarding-choice-title"
        className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3"
      >
        Join as a Job Seeker or Company
      </h2>
      <p className="text-center text-gray-600 mb-8 md:mb-10">
        Select your role to tailor your experience.
      </p>

      <form onSubmit={handleSubmit}>
        <div
          className="flex flex-col sm:flex-row gap-5 sm:gap-6 mb-8 md:mb-10"
          role="radiogroup"
          aria-labelledby="onboarding-choice-title"
        >
          {roles.map((role) => (
            <RoleCard // This component should now be using your brand green for its selected state
              key={role.id}
              icon={role.icon}
              title={role.title}
              description={role.description}
              isSelected={selectedRole === role.id}
              onClick={() => handleRoleSelect(role.id)}
            />
          ))}
        </div>

        {/* --- Main Submit Button --- */}
        {/* Option 1: Using Tailwind classes with your 'green' color */}
        <button
          type="submit"
          className={`
            w-full py-3.5 px-6 rounded-lg text-white font-semibold transition-all duration-200 ease-in-out
            bg-green hover:bg-green/90 focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2
            transform active:scale-[0.98]
          `}
          // 'green' comes from your tailwind.config.js `colors.green`
          // `focus:ring-green` uses this named color for the ring
        >
          {getButtonText()}
        </button>

        {/* Option 2: Using shadcn/ui Button (Recommended for consistency if you use shadcn elsewhere) */}
        {/* <ShadButton
          type="submit"
          className="w-full py-3.5 h-auto text-base font-semibold active:scale-[0.98]"
          // The default variant of ShadButton should pick up your '--primary' (green) color
          // Ensure text-primary-foreground gives good contrast (e.g., white text on your green)
        >
          {getButtonText()}
        </ShadButton> */}
      </form>

      <p className="text-center text-sm text-gray-500 mt-6 md:mt-8">
        Already have an account?{" "}
        <Link
          href="/login" // Assuming you have a login page at this path
          className="font-semibold text-green hover:text-green/80 hover:underline"
          // text-green uses your named 'green' from tailwind.config.js
        >
          Log In
        </Link>
      </p>
    </div>
  );
};

export default OnboardingChoice;
