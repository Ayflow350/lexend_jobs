"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import {
  FreelancerProfileData,
  LanguageProficiency,
} from "@/lib/freelancer-profile-schemas";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

// --- IMPORT THE LANGUAGE COMBOBOX ---
import { LanguageCombobox } from "./components/LanguageCombobox"; // Adjust path if necessary

const proficiencyLevels: { value: LanguageProficiency; label: string }[] = [
  { value: "basic", label: "Basic" },
  { value: "conversational", label: "Conversational" },
  { value: "fluent", label: "Fluent" },
  { value: "native", label: "Native or Bilingual" },
];

const Step7_Languages: React.FC = () => {
  const { control } = useFormContext<FreelancerProfileData>();

  // This now correctly points to the 'otherLanguages' array field
  const { fields, append, remove } = useFieldArray({
    control,
    name: "otherLanguages",
  });

  const handleAddLanguage = () => {
    // Appends a new object with default values to the array
    append({ language: "", proficiency: "basic" });
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="mb-10 text-left">
        <p className="text-sm text-gray-500 mb-2">7/10</p>
        <h1 className="text-3xl md:text-4xl font-medium text-gray-900 leading-snug">
          Looking good. Next, tell us which languages you speak.
        </h1>
        <p className="mt-3 text-gray-600">
          Upwork is global, so clients are often interested to know what
          languages you speak. English is a must, but do you speak any other
          languages?
        </p>
      </div>

      <div className="space-y-6">
        {/* English Proficiency - A required, default field */}
        <div className="grid grid-cols-2 gap-4 items-end border-b pb-6">
          <div>
            <p className="font-medium text-gray-800">Language</p>
            <p className="mt-2 text-gray-700 text-base">English</p>
          </div>
          <FormField
            control={control}
            name="englishProficiency"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-gray-800">
                  Proficiency
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="My level is..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {proficiencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Other Languages - Dynamically added */}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-2 gap-4 items-end border-b pb-6"
          >
            {/* --- THIS IS THE REPLACEMENT --- */}
            <FormField
              control={control}
              name={`otherLanguages.${index}.language`}
              render={({ field: comboField }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormControl>
                    <LanguageCombobox
                      value={comboField.value}
                      onValueChange={comboField.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-end gap-2">
              <FormField
                control={control}
                name={`otherLanguages.${index}.proficiency`}
                render={({ field: selectField }) => (
                  <FormItem className="flex-grow">
                    <Select
                      onValueChange={selectField.onChange}
                      defaultValue={selectField.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="My level is..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {proficiencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="text-destructive"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}

        {/* Add Language Button */}
        <Button
          type="button"
          variant="outline"
          className="text-primary border-primary hover:text-primary hover:bg-primary/10"
          onClick={handleAddLanguage}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a language
        </Button>
      </div>
    </div>
  );
};

export default Step7_Languages;
