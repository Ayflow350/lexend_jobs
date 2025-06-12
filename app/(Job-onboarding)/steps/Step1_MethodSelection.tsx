// components/freelancer-onboarding/Step1_MethodSelection.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Linkedin, FileText, Clock } from "lucide-react";
import { ResumeUploadModal } from "./components/ResumeUploadModal";

interface Step1MethodSelectionProps {
  onSelect: (method: "linkedin" | "resume" | "manual") => void;
}

const Step1_MethodSelection: React.FC<Step1MethodSelectionProps> = ({
  onSelect,
}) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleResumeUpload = (file: File) => {
    console.log("Resume uploaded:", file.name);
    alert(
      `Resume "${file.name}" uploaded. The app would now parse it and move to the next step.`
    );
    setIsUploadModalOpen(false);
    // Potentially call onSelect('resume') here to advance the flow
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
          <div className="w-full max-w-5xl">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
              <span className="font-medium">1/10 Create your profile</span>
              <Clock className="w-4 h-4" />
              <span>5-10 min</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-4">
              How would you like to tell us about yourself?
            </h2>
            <p className="text-gray-600 mb-12 max-w-2xl">
              We need to get a sense of your education, experience and skills.
              It&apos;s quickest to import your information — you can edit it
              before your profile goes live.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4 max-w-lg">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onSelect("linkedin")}
                  className="w-full h-auto justify-start gap-4 p-4 text-left border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                >
                  <Linkedin className="w-6 h-6 text-blue-700 flex-shrink-0" />
                  <span className="font-medium text-gray-800">
                    Import from LinkedIn
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="w-full h-auto justify-start gap-4 p-4 text-left border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                >
                  <Upload className="w-6 h-6 text-gray-700 flex-shrink-0 " />
                  <span className="font-medium text-gray-800">
                    Upload your resume
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onSelect("manual")}
                  className="w-full h-auto justify-start gap-4 p-4  text-left border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                >
                  <FileText className="w-6 h-6 text-gray-700 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-800">
                      Fill out manually
                    </span>
                    <span className="text-sm text-gray-500 ml-2">(15 min)</span>
                  </div>
                </Button>
              </div>

              <div className="hidden md:flex justify-center items-start">
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg text-center max-w-xs">
                  <img
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    alt="Upwork Pro"
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                  <p className="text-gray-700 italic mb-4">
                    “Your Upwork profile is how you stand out from the crowd.
                    It’s what you use to win work, so let’s make it a good one.”
                  </p>
                  <p className="font-semibold text-gray-600">Upwork Pro Tip</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="sticky bottom-0 bg-white border-t p-4">
          <div className="container mx-auto max-w-5xl flex justify-between items-center">
            <Button variant="outline" disabled>
              Back
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Continue editing your profile
            </Button>
          </div>
        </footer>
      </div>

      <ResumeUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleResumeUpload}
      />
    </>
  );
};

export default Step1_MethodSelection;
