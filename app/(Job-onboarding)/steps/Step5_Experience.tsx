"use client";

import React, { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, AlertCircle, MapPin } from "lucide-react";
import {
  FreelancerProfileData,
  EmploymentFormData,
} from "@/lib/freelancer-profile-schemas";
import { ExperienceModal } from "../steps/components/ExperienceModal"; // Adjust path if needed
import { format } from "date-fns";

// We need the months array to convert month names back to a number for the Date object
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Step5_Experience: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FreelancerProfileData>();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "employmentHistory",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddNew = () => {
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  const handleSave = (data: EmploymentFormData) => {
    if (editingIndex !== null) {
      update(editingIndex, data);
    } else {
      append(data);
    }
    handleCloseModal();
  };

  return (
    <>
      <div className="w-full">
        <div className="mb-10 text-left max-w-3xl">
          <p className="text-sm text-gray-500 mb-2">5/10</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900 leading-tight">
            If you have relevant work experience, add it here.
          </h1>
          <p className="mt-3 text-base text-gray-600">
            Freelancers who add their experience are twice as likely to win
            work. But if you&apos;re just starting out, you can still create a
            great profile. Just head on to the next page.
          </p>
        </div>

        {/* --- The Responsive Grid Container --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Map over existing fields and render a detailed card for each */}
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border rounded-lg p-5 flex flex-col justify-between bg-white shadow-sm h-60"
            >
              {/* Top part of the card with Title and Edit/Delete buttons */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg text-gray-800">
                    {field.title}
                  </p>
                  <p className="text-gray-600">{field.company}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(index)}
                  >
                    <Edit className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Bottom part of the card with Location and Dates */}
              <div>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
                  <span>
                    {field.location}, {field.country}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {format(
                    new Date(
                      Number(field.startDate.year),
                      months.indexOf(field.startDate.month)
                    ),
                    "MMM yyyy"
                  )}{" "}
                  -{" "}
                  {field.isCurrentRole
                    ? "Present"
                    : format(
                        new Date(
                          Number(field.endDate.year!),
                          months.indexOf(field.endDate.month!)
                        ),
                        "MMM yyyy"
                      )}
                </p>
              </div>
            </div>
          ))}

          {/* The "Add experience" button is now a grid item itself */}
          <button
            type="button"
            onClick={handleAddNew}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors group h-60"
          >
            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Plus className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-gray-600 group-hover:text-primary">
              Add experience
            </span>
          </button>
        </div>

        {errors.employmentHistory && (
          <div className="flex items-center text-sm font-medium text-destructive mt-4 max-w-3xl">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            {errors.employmentHistory.message ||
              (errors.employmentHistory.root &&
                errors.employmentHistory.root.message)}
          </div>
        )}
      </div>

      <ExperienceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        initialData={editingIndex !== null ? fields[editingIndex] : null}
      />
    </>
  );
};

export default Step5_Experience;
