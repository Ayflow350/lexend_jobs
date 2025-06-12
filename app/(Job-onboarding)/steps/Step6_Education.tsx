"use client";

import React, { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, AlertCircle } from "lucide-react"; // Using a different icon for education
import {
  FreelancerProfileData,
  EducationFormData,
} from "@/lib/freelancer-profile-schemas";
import { EducationModal } from "../steps/components/EducationModal"; // Adjust path if needed

const Step6_Education: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FreelancerProfileData>();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "educationHistory",
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

  const handleSave = (data: EducationFormData) => {
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
          <p className="text-sm text-gray-500 mb-2">6/10</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900 leading-tight">
            Clients like to know what you know - add your education here.
          </h1>
          <p className="mt-3 text-base text-gray-600">
            You don&apos;t have to have a degree. Adding any relevant education
            helps make your profile more visible.
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
              {/* Top part of the card with School and Edit/Delete buttons */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg text-gray-800">
                    {field.school}
                  </p>
                  <p className="text-gray-600">{field.degree}</p>
                  <p className="text-sm text-gray-500">{field.fieldOfStudy}</p>
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

              {/* Bottom part of the card with Dates */}
              <div>
                <p className="text-sm text-gray-500 mt-2">
                  {field.datesAttended?.from} - {field.datesAttended?.to}
                </p>
              </div>
            </div>
          ))}

          {/* The "Add education" button is now a grid item itself */}
          <button
            type="button"
            onClick={handleAddNew}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors group h-60"
          >
            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Plus className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-gray-600 group-hover:text-primary">
              Add education
            </span>
          </button>
        </div>

        {errors.educationHistory && (
          <div className="flex items-center text-sm font-medium text-destructive mt-4 max-w-3xl">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            {errors.educationHistory.message ||
              (errors.educationHistory.root &&
                errors.educationHistory.root.message)}
          </div>
        )}
      </div>

      <EducationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        initialData={editingIndex !== null ? fields[editingIndex] : null}
      />
    </>
  );
};

export default Step6_Education;
