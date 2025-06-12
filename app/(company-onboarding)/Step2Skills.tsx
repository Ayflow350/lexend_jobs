"use client";

import React, { useState, KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { XIcon, PlusIcon, InfoIcon } from "lucide-react"; // Added InfoIcon
import { CompanyOnboardingData } from "@/lib/company-onboarding-schemas"; // Adjust path

// Example popular skills
const popularSkillsWeb = [
  "WordPress",
  "WooCommerce",
  "Web Development",
  "PHP",
  "CSS",
  "Web Design",
  "JavaScript",
  "HTML5",
  "WordPress Plugin",
  "Ecommerce Website",
  "CSS3",
  "MySQL",
  "jQuery",
  "Website Customization",
  "Website",
  "Stripe",
  "API",
  "Ecommerce Website Development",
];

const Step2Skills: React.FC = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CompanyOnboardingData>();
  const [currentSkillInput, setCurrentSkillInput] = useState("");
  const selectedSkills = watch("skills", []);

  const handleAddSkill = () => {
    const skillToAdd = currentSkillInput.trim().replace(/,$/, "");
    if (
      skillToAdd &&
      !selectedSkills.includes(skillToAdd) &&
      selectedSkills.length < 15
    ) {
      const newSkills = [...selectedSkills, skillToAdd];
      setValue("skills", newSkills, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setCurrentSkillInput("");
    } else if (selectedSkills.includes(skillToAdd)) {
      console.warn("Skill already added");
    } else if (selectedSkills.length >= 15) {
      console.warn("Maximum 15 skills allowed");
    }
  };

  const handlePopularSkillClick = (skill: string) => {
    if (!selectedSkills.includes(skill) && selectedSkills.length < 15) {
      const newSkills = [...selectedSkills, skill];
      setValue("skills", newSkills, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const newSkills = selectedSkills.filter((skill) => skill !== skillToRemove);
    setValue("skills", newSkills, { shouldValidate: true, shouldDirty: true });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 items-start">
      {/* Left Column: Guidance */}
      <div className="space-y-3 md:space-y-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          Job post
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-foreground leading-tight">
          What are the main skills required for your work?
        </h1>
        {/* === RESTORED PARAGRAPH === */}
        <p className="text-base text-gray-600 dark:text-muted-foreground">
          This will help us match you with the right talent. Add skills that
          accurately describe the expertise needed.
        </p>
        {/* ========================== */}
      </div>

      {/* Right Column: Form Input */}
      <div className="space-y-8">
        <FormField
          control={control}
          name="skills"
          render={() => (
            <FormItem>
              <FormLabel className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5">
                Search skills or add your own
              </FormLabel>
              <div className="flex items-stretch gap-2">
                <Input
                  type="text"
                  placeholder="e.g., React, Node.js, Figma"
                  className="h-11 px-4 text-base flex-grow rounded-md"
                  value={currentSkillInput}
                  onChange={(e) => setCurrentSkillInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  type="button"
                  onClick={handleAddSkill}
                  disabled={!currentSkillInput.trim()}
                  className="h-11 px-5 bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 rounded-md text-sm"
                >
                  Add
                </Button>
              </div>
              <FormDescription className="mt-2 text-sm flex items-center">
                <InfoIcon className="mr-1.5 h-4 w-4 text-muted-foreground" />{" "}
                {/* Used InfoIcon */}
                For the best results, add 3-5 skills. (Max 15)
              </FormDescription>
              {errors.skills &&
                !errors.skills.message &&
                errors.skills.root && (
                  <FormMessage>{errors.skills.root.message}</FormMessage>
                )}
              {errors.skills?.message && (
                <FormMessage>{errors.skills.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        {selectedSkills.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">
              SELECTED SKILLS
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-sm py-1.5 px-3 rounded-full font-medium flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1.5 -mr-0.5 rounded-full hover:bg-muted-foreground/20 p-0.5 focus:outline-none focus:ring-1 focus:ring-ring"
                    aria-label={`Remove ${skill}`}
                  >
                    <XIcon className="h-3.5 w-3.5" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-foreground mb-2.5">
            Popular skills for Web Design
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularSkillsWeb.map((skill, index) => (
              <Button
                key={index}
                type="button"
                variant="outline"
                size="sm"
                className="font-normal rounded-full h-8 px-3.5 text-xs sm:text-sm border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500"
                onClick={() => handlePopularSkillClick(skill)}
                disabled={
                  selectedSkills.includes(skill) || selectedSkills.length >= 15
                }
              >
                {skill}
                <PlusIcon className="ml-1.5 h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2Skills;
