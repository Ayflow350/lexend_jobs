"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FreelancerProfileData } from "@/lib/freelancer-profile-schemas";
import { cn } from "@/lib/utils";
import { CountryCodeCombobox } from "./CountryCodeCombobox";

interface PhoneInputProps {
  className?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ className }) => {
  const { register, control } = useFormContext<FreelancerProfileData>();

  return (
    <div
      className={cn(
        "flex items-center w-full rounded-md border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
    >
      <Controller
        control={control}
        name="phone.countryCode"
        render={({ field }) => (
          <CountryCodeCombobox
            value={field.value}
            onValueChange={field.onChange}
          />
        )}
      />

      <div className="h-6 w-px bg-input"></div>

      <Input
        type="tel"
        placeholder="Enter number"
        className="flex-grow h-full bg-transparent border-0 rounded-l-none focus-visible:ring-0 focus-visible:ring-offset-0"
        {...register("phone.phoneNumber")}
      />
    </div>
  );
};
