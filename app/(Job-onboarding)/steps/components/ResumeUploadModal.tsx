// components/freelancer-onboarding/ResumeUploadModal.tsx
"use client";

import React, { useState, useRef, DragEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ResumeIllustration } from "./ResumeIllustration";

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File | null) => {
    if (selectedFile && selectedFile.size <= 5 * 1024 * 1024) {
      // 5MB limit
      setFile(selectedFile);
    } else if (selectedFile) {
      alert("File is too large. Please select a file under 5MB.");
      setFile(null);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0] || null;
    handleFileSelect(droppedFile);
  };

  const handleContinue = () => {
    if (file) {
      onUpload(file);
    }
  };

  // Using onOpenChange to handle closing the dialog via overlay click or escape key
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-[525px] p-0"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-medium">
            Add your resume
          </DialogTitle>
          <DialogDescription>
            Use a PDF, Word doc, or rich text file – make sure it&apos;s 5MB or
            less.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6">
          <div
            className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-colors
              ${
                isDragging
                  ? "border-primary bg-primary/10"
                  : "border-gray-300 bg-gray-50"
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="text-center">
                <p className="font-semibold text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setFile(null)}
                  className="text-red-500 h-auto p-1 mt-2"
                >
                  Remove file
                </Button>
              </div>
            ) : (
              <>
                <ResumeIllustration />
                <p className="mt-4 text-gray-600">
                  Drag and drop or{" "}
                  <button
                    type="button"
                    className="font-medium text-primary hover:underline focus:outline-none"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    choose file
                  </button>
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) =>
                    handleFileSelect(e.target.files?.[0] || null)
                  }
                  accept=".pdf,.doc,.docx,.rtf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/rtf"
                />
              </>
            )}
          </div>
        </div>
        <DialogFooter className="bg-gray-50 p-4 sm:p-6 rounded-b-lg flex justify-end">
          <Button
            type="button"
            onClick={handleContinue}
            disabled={!file}
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-gray-200 disabled:text-gray-500"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
