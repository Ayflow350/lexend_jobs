"use client";

import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FreelancerProfileData } from "@/lib/freelancer-profile-schemas";
import { MapPin, Pencil, Plus } from "lucide-react";
import { format } from "date-fns";

// Reusable card component for sections with an "Edit" button
const ReviewSectionCard: React.FC<{
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}> = ({ title, onEdit, children }) => (
  <div className="bg-white rounded-lg border p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-medium text-gray-800">{title}</h3>
      <Button
        variant="ghost"
        size="icon"
        onClick={onEdit}
        className="w-9 h-9 rounded-full border-2 border-primary text-primary hover:text-primary"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
    {children}
  </div>
);

// Card for sections that can be empty and have an "Add" button
const AddableSectionCard: React.FC<{
  title: string;
  onAdd: () => void;
  children: React.ReactNode;
}> = ({ title, onAdd, children }) => (
  <div className="bg-white rounded-lg border p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-medium text-gray-800">{title}</h3>
      <Button
        variant="ghost"
        size="icon"
        onClick={onAdd}
        className="w-9 h-9 rounded-full border-2 border-primary text-primary hover:text-primary"
      >
        <Plus className="h-5 w-5" />
      </Button>
    </div>
    {children}
  </div>
);

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

const Step11_Review: React.FC<{
  onEdit: (step: number) => void;
  onSubmit: () => void;
}> = ({ onEdit, onSubmit }) => {
  const { getValues } = useFormContext<FreelancerProfileData>();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const data = getValues();
  const photoFile = data.profilePhoto;
  const userName = "Luke Justin"; // Placeholder

  useEffect(() => {
    if (photoFile instanceof File) {
      const url = URL.createObjectURL(photoFile);
      setPhotoPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [photoFile]);

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-medium">Preview Profile</h1>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-between mb-8 border">
        <div>
          <h2 className="text-2xl font-medium">
            Looking good, {userName.split(" ")[0]}!
          </h2>
          <p className="text-gray-600 mt-1">
            Make any edits you want, then submit your profile.
          </p>
        </div>
        <Button
          size="lg"
          onClick={onSubmit}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Submit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* === WIDER LEFT COLUMN === */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-start pb-6 border-b">
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover mr-5"
                />
              )}
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{userName}</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(10)}
                    className="w-9 h-9 rounded-full border-2 border-primary text-primary hover:text-primary"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center text-gray-500 mt-2">
                  <MapPin className="h-4 w-4 mr-1.5" />
                  <span>
                    {data.city}, {data.country}
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-6 pb-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">
                  {data.professionalTitle}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(4)}
                  className="w-9 h-9 rounded-full border-2 border-primary text-primary hover:text-primary"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-gray-700 whitespace-pre-wrap break-words">
                {data.professionalOverview}
              </p>
            </div>
            <div className="pt-6 flex justify-between items-center">
              <div>
                <p className="text-xl font-bold">
                  ${data.hourlyRate?.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">Hourly rate</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(9)}
                className="w-9 h-9 rounded-full border-2 border-primary text-primary hover:text-primary"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <AddableSectionCard title="Work history" onAdd={() => onEdit(5)}>
            {data.employmentHistory && data.employmentHistory.length > 0 ? (
              <div className="space-y-6 mt-4">
                {data.employmentHistory.map((job, i) => (
                  <div key={i}>
                    <h4 className="font-semibold text-lg">{job.title}</h4>
                    <p className="text-gray-600">{job.company}</p>
                    <p className="text-sm text-gray-500">
                      {format(
                        new Date(
                          Number(job.startDate.year),
                          months.indexOf(job.startDate.month)
                        ),
                        "MMM yyyy"
                      )}{" "}
                      -{" "}
                      {job.isCurrentRole
                        ? "Present"
                        : format(
                            new Date(
                              Number(job.endDate.year!),
                              months.indexOf(job.endDate.month!)
                            ),
                            "MMM yyyy"
                          )}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-4">No items to display.</p>
            )}
          </AddableSectionCard>

          <AddableSectionCard title="Education" onAdd={() => onEdit(6)}>
            {data.educationHistory && data.educationHistory.length > 0 ? (
              <div className="space-y-4 mt-4">
                {data.educationHistory.map((edu, i) => (
                  <div key={i}>
                    <p className="font-semibold text-gray-800">{edu.school}</p>
                    <p className="text-sm text-gray-600">{edu.degree}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-4">No items to display.</p>
            )}
          </AddableSectionCard>
        </div>

        {/* === NARROWER RIGHT COLUMN === */}
        <div className="lg:col-span-1 space-y-8">
          <ReviewSectionCard title="Languages" onEdit={() => onEdit(7)}>
            <div className="space-y-1 text-gray-700 mt-4">
              <p>
                <span className="font-semibold">English:</span>{" "}
                <span className="capitalize">{data.englishProficiency}</span>
              </p>
              {data.otherLanguages?.map((lang) => (
                <p key={lang.language}>
                  <span className="font-semibold">{lang.language}:</span>{" "}
                  <span className="capitalize">{lang.proficiency}</span>
                </p>
              ))}
            </div>
          </ReviewSectionCard>

          <ReviewSectionCard title="Skills" onEdit={() => onEdit(3)}>
            <div className="flex flex-wrap gap-2 mt-4">
              {data.skills?.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </ReviewSectionCard>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Button
          size="lg"
          onClick={onSubmit}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Submit Profile
        </Button>
      </div>
    </div>
  );
};

export default Step11_Review;
