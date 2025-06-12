"use client";

import React, { useState, KeyboardEvent } from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { FreelancerProfileData } from "@/lib/freelancer-profile-schemas";
import skillsData from "../data/skills.json";

// Helper function to capitalize each word in a string
const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const Step3_Skills: React.FC = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FreelancerProfileData>();

  const [inputValue, setInputValue] = useState("");
  const selectedSkills = watch("skills", []);
  const mainCategory = watch("mainCategory") as keyof typeof skillsData;

  const suggestions = skillsData[mainCategory] || [];

  // === THIS IS THE ONLY MODIFIED FUNCTION ===
  const handleAddSkill = (skillToAdd: string) => {
    // 1. Trim whitespace and capitalize the skill
    const formattedSkill = capitalizeWords(skillToAdd.trim());

    // 2. Check for existence (case-insensitive) to prevent duplicates like "React" and "react"
    const alreadyExists = selectedSkills.some(
      (skill) => skill.toLowerCase() === formattedSkill.toLowerCase()
    );

    if (formattedSkill && !alreadyExists && selectedSkills.length < 15) {
      setValue("skills", [...selectedSkills, formattedSkill], {
        shouldValidate: true,
      });
    }
    setInputValue(""); // Clear input after adding
  };
  // ==========================================

  const handleRemoveSkill = (skillToRemove: string) => {
    setValue(
      "skills",
      selectedSkills.filter((skill) => skill !== skillToRemove),
      { shouldValidate: true }
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddSkill(inputValue);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-medium text-gray-900">
          Nearly there! What work are you here to do?
        </h1>
        <p className="mt-2 text-gray-600 max-w-3xl">
          Your skills show clients what you can offer, and help us choose which
          jobs to recommend to you. Add or remove the ones we&apos;ve suggested,
          or start typing to pick more. It&apos;s up to you.
        </p>
        <a
          href="#"
          className="text-primary font-semibold text-sm mt-2 block hover:underline"
        >
          Why choosing carefully matters
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <FormField
            control={control}
            name="skills"
            render={() => (
              <FormItem>
                <div className="border border-input rounded-lg p-2 flex flex-wrap items-center gap-2 min-h-[44px]">
                  {selectedSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="text-sm py-1 px-3 rounded-full font-medium flex items-center gap-1.5 border-gray-400"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="rounded-full focus:outline-none focus:ring-1 focus:ring-ring"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </Badge>
                  ))}
                  <Input
                    type="text"
                    placeholder={
                      selectedSkills.length === 0 ? "Enter skills here" : ""
                    }
                    className="flex-grow border-none shadow-none focus-visible:ring-0 p-0 h-auto bg-transparent"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={selectedSkills.length >= 15}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  {errors.skills && (
                    <FormMessage>{errors.skills.message}</FormMessage>
                  )}
                  <p className="text-sm text-gray-500 ml-auto">Max 15 skills</p>
                </div>
              </FormItem>
            )}
          />

          {suggestions.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Suggested skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((skill) => (
                  <Button
                    key={skill}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="font-normal rounded-full h-8 px-3.5 text-gray-700"
                    onClick={() => handleAddSkill(skill)}
                    disabled={
                      selectedSkills.some(
                        (s) => s.toLowerCase() === skill.toLowerCase()
                      ) || selectedSkills.length >= 15
                    }
                  >
                    <Plus className="h-4 w-4 mr-1.5" />
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="hidden lg:flex justify-center items-start">
          <div className="bg-gray-50 p-6 rounded-lg text-center max-w-xs">
            <img
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d" // Placeholder avatar
              alt="Upwork Pro"
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-700 italic mb-4">
              “Lexend&apos;s algorithm will recommend specific job posts to you
              based on your skills. So choose them carefully to get the best
              match!”
            </p>
            <p className="font-semibold text-gray-600">Lexend Pro Tip</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3_Skills;
