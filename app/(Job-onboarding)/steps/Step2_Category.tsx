"use client";

import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
// Import the Tooltip components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FreelancerProfileData } from "@/lib/freelancer-profile-schemas";
import { X } from "lucide-react";
import categoriesData from "../data/categories.json";

const Step2_Category: React.FC = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors, isSubmitted, touchedFields },
  } = useFormContext<FreelancerProfileData>();

  const selectedMainCategory = watch("mainCategory");
  const selectedSpecialties = watch("specialties", []);

  const defaultCategoryValue = categoriesData[0]?.value || "";

  const [activeCategory, setActiveCategory] = useState<string>(
    selectedMainCategory || defaultCategoryValue
  );

  useEffect(() => {
    if (!selectedMainCategory) {
      setValue("mainCategory", defaultCategoryValue, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [selectedMainCategory, setValue, defaultCategoryValue]);

  const handleCategoryClick = (categoryValue: string) => {
    setActiveCategory(categoryValue);
  };

  const handleSpecialtyChange = (specialtyValue: string) => {
    const isAdding =
      !selectedSpecialties.includes(specialtyValue) &&
      !(
        selectedMainCategory === activeCategory &&
        selectedSpecialties.includes(specialtyValue)
      );

    if (selectedSpecialties.length >= 3 && isAdding) {
      return; // Global limit reached, do nothing.
    }

    if (activeCategory !== selectedMainCategory && isAdding) {
      setValue("mainCategory", activeCategory, { shouldValidate: true });
      setValue("specialties", [specialtyValue], { shouldValidate: true });
      return;
    }

    const newSpecialties = [...selectedSpecialties];
    const index = newSpecialties.indexOf(specialtyValue);

    if (index > -1) {
      newSpecialties.splice(index, 1);
    } else {
      newSpecialties.push(specialtyValue);
    }
    setValue("specialties", newSpecialties, { shouldValidate: true });
  };

  const clearSelections = () => {
    setActiveCategory(defaultCategoryValue);
    setValue("mainCategory", defaultCategoryValue, { shouldValidate: true });
    setValue("specialties", [], { shouldValidate: true });
  };

  const currentSpecialtyOptions =
    categoriesData.find((c) => c.value === activeCategory)?.specialties || [];

  const shouldShowMainCategoryError =
    (touchedFields.mainCategory || isSubmitted) && errors.mainCategory;
  const shouldShowSpecialtiesError =
    (touchedFields.specialties || isSubmitted) && errors.specialties;

  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-medium text-gray-900">
          Great, so what kind of work are you here to do?
        </h1>
        <p className="mt-2 text-gray-600">
          Don&apos;t worry, you can change these choices later on.
        </p>
      </div>

      <div className="border rounded-lg grid grid-cols-1 md:grid-cols-12 min-h-[400px]">
        <div className="md:col-span-5 md:border-r p-4">
          <p className="text-sm font-semibold text-gray-500 mb-3 px-2">
            Select 1 category
          </p>
          <div className="space-y-1">
            {categoriesData.map((category) => {
              const isVisuallyActive = activeCategory === category.value;
              const isFormSelected = selectedMainCategory === category.value;
              const count = isFormSelected ? selectedSpecialties.length : 0;

              // === THE ONLY CHANGE IS IN THIS `className` TEMPLATE STRING ===
              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => handleCategoryClick(category.value)}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isVisuallyActive ? "bg-primary/10" : "hover:bg-gray-100"
                  } ${isFormSelected ? "text-primary" : "text-gray-700"}`}
                >
                  {category.label}{" "}
                  {count > 0 && (
                    <span className="text-primary font-bold">({count})</span>
                  )}
                </button>
              );
            })}
          </div>
          {shouldShowMainCategoryError && (
            <FormMessage className="mt-2 px-2">
              {errors.mainCategory?.message}
            </FormMessage>
          )}
        </div>

        <div className="md:col-span-7 p-4">
          <p className="text-sm font-semibold text-gray-500 mb-3 px-2">
            Now, select 1 to 3 specialties
          </p>
          <div className="space-y-3">
            <FormField
              control={control}
              name="specialties"
              render={() => (
                <FormItem className="space-y-3">
                  {currentSpecialtyOptions.map((specialty) => {
                    const isChecked =
                      selectedMainCategory === activeCategory &&
                      selectedSpecialties.includes(specialty.value);
                    const isDisabled =
                      selectedSpecialties.length >= 3 && !isChecked;

                    const SpecialtyItem = (
                      <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50">
                        <Checkbox
                          id={specialty.value}
                          checked={isChecked}
                          onCheckedChange={() =>
                            handleSpecialtyChange(specialty.value)
                          }
                          disabled={isDisabled}
                        />
                        <label
                          htmlFor={specialty.value}
                          className={`text-sm font-medium leading-none cursor-pointer ${
                            isDisabled
                              ? "cursor-not-allowed opacity-50"
                              : "text-gray-800"
                          }`}
                        >
                          {specialty.label}
                        </label>
                      </div>
                    );

                    if (isDisabled) {
                      return (
                        <TooltipProvider
                          key={specialty.value}
                          delayDuration={100}
                        >
                          <Tooltip>
                            <TooltipTrigger asChild>
                              {SpecialtyItem}
                            </TooltipTrigger>
                            <TooltipContent className="bg-amber-100 border-amber-300 text-amber-900">
                              <p>
                                You have reached the maximum of 3 specialties.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    }

                    return <div key={specialty.value}>{SpecialtyItem}</div>;
                  })}
                  {shouldShowSpecialtiesError && (
                    <FormMessage className="mt-2 px-2">
                      {errors.specialties?.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Button
              variant="link"
              size="sm"
              onClick={clearSelections}
              className="text-primary font-semibold h-auto p-2 mt-4"
            >
              <X className="w-4 h-4 mr-1" />
              Clear selections
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2_Category;
