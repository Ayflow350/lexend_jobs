"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { PaperclipIcon, File, X } from "lucide-react"; // Added new icons
import { CompanyOnboardingData } from "@/lib/company-onboarding-schemas";
import { TiptapEditor } from "@/components/ui/TiptapEditor";

// A small component to display a file chip neatly
const FileChip = ({ file, onRemove }: { file: File; onRemove: () => void }) => (
  <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2 flex items-center justify-between text-sm">
    <div className="flex items-center gap-2 overflow-hidden">
      <File className="h-4 w-4 text-gray-500 flex-shrink-0" />
      <span className="truncate text-gray-800 dark:text-gray-300">
        {file.name}
      </span>
    </div>
    <button
      type="button"
      onClick={onRemove}
      className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <X className="h-3 w-3 text-gray-600 dark:text-gray-400" />
    </button>
  </div>
);

const Step5Description: React.FC = () => {
  const { control, watch, setValue } = useFormContext<CompanyOnboardingData>();

  const attachments = watch("attachments", []) as File[];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const currentFiles = watch("attachments") || [];
      const combinedFiles = [...currentFiles, ...newFiles].slice(0, 5);
      setValue("attachments", combinedFiles, { shouldValidate: true });
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const currentFiles = watch("attachments") || [];
    setValue(
      "attachments",
      currentFiles.filter((_, index) => index !== indexToRemove),
      { shouldValidate: true }
    );
  };

  return (
    <div className="w-full">
      {/* Guidance Section */}
      <div className="space-y-3 mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-foreground leading-tight">
          Describe what you need
        </h1>
        <p className="text-base text-gray-600 dark:text-muted-foreground">
          Help talent understand your needs by explaining:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-gray-600 dark:text-muted-foreground">
          <li>The task or deliverables you expect.</li>
          <li>The skills and experience required.</li>
          <li>Your preferred communication style and workflow.</li>
        </ul>
      </div>

      {/* Main container for the form elements */}
      <div className="space-y-8">
        {/* Tiptap Editor */}
        <FormField
          control={control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TiptapEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Provide a detailed description of the work to be done..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- ATTACHMENTS SECTION (NOW CONSTRAINED IN WIDTH) --- */}
        <div className="pt-4 space-y-3 max-w-lg">
          {" "}
          {/* <-- THE KEY CHANGE IS HERE: max-w-lg */}
          <FormLabel className="text-base font-semibold text-gray-800 dark:text-gray-200">
            Attachments (optional)
          </FormLabel>
          <div className="pt-2">
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={handleFileChange}
              className="sr-only"
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.zip"
            />
            <FormLabel
              htmlFor="file-upload"
              className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:border-primary dark:hover:border-primary transition-colors"
            >
              <PaperclipIcon className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Attach file
              </span>
            </FormLabel>
          </div>
          {attachments.length > 0 && (
            <div className="pt-2 space-y-2">
              <p className="text-xs text-muted-foreground">Selected files:</p>
              {attachments.map((file, index) => (
                <FileChip
                  key={index}
                  file={file}
                  onRemove={() => handleRemoveFile(index)}
                />
              ))}
            </div>
          )}
          <FormDescription className="text-xs text-muted-foreground pt-1">
            Max file size: 100MB. You can upload up to 5 files.
          </FormDescription>
        </div>
      </div>
    </div>
  );
};

export default Step5Description;
