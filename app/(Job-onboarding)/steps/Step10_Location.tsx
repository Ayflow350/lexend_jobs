"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Plus, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CountryCombobox } from "@/components/ui/CountryCombobox"; // Adjust path if needed
import { PhoneInput } from "../steps/components/PhoneInput"; // Adjust path if needed
import { FreelancerProfileData } from "@/lib/freelancer-profile-schemas";

const Step10_Location: React.FC = () => {
  const { control, setValue } = useFormContext<FreelancerProfileData>();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [dateOfBirthPopoverOpen, setDateOfBirthPopoverOpen] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profilePhoto", file, { shouldValidate: true });
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const inputHeightClass = "h-11";

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-10 text-left">
        <p className="text-sm text-gray-500 mb-2">10/10</p>
        <h1 className="text-3xl md:text-4xl font-medium text-gray-900 leading-snug">
          A few last details, then you can check and publish your profile.
        </h1>
        <p className="mt-3 text-gray-600">
          A professional photo helps you build trust with your clients. To keep
          things safe and simple, they&apos;ll pay you through us - which is why
          we need your personal information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left: Photo Upload */}
        <div className="md:col-span-1 flex flex-col items-center pt-6">
          <div className="relative w-32 h-32 rounded-full bg-gray-200 mb-4 flex items-center justify-center overflow-hidden">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-16 h-16 text-gray-400" />
            )}
            <label
              htmlFor="photo-upload"
              className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Plus className="w-8 h-8 text-white" />
            </label>
          </div>
          <FormField
            control={control}
            name="profilePhoto"
            render={() => (
              <FormItem>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    className={`border-primary text-primary hover:text-primary hover:bg-primary/10 ${inputHeightClass}`}
                    onClick={() =>
                      document.getElementById("photo-upload")?.click()
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" /> Upload photo
                  </Button>
                </FormControl>
                <input
                  id="photo-upload"
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg"
                  onChange={handlePhotoUpload}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* === THE FIX IS HERE: All form fields are now nested inside this div === */}
        <div className="md:col-span-2 space-y-6">
          <FormField
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Birth *</FormLabel>
                <Popover
                  open={dateOfBirthPopoverOpen}
                  onOpenChange={setDateOfBirthPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          inputHeightClass,
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>yyyy-mm-dd</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setDateOfBirthPopoverOpen(false);
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown" // This should work if your Calendar component is up to date
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country *</FormLabel>
                <CountryCombobox
                  value={field.value}
                  onValueChange={field.onChange}
                  className={inputHeightClass}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street address *</FormLabel>
                  <FormControl>
                    <Input {...field} className={inputHeightClass} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="aptSuite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Apt/Suite <span className="text-gray-500">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className={inputHeightClass} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              control={control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City *</FormLabel>
                  <FormControl>
                    <Input {...field} className={inputHeightClass} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="stateProvince"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <FormControl>
                    <Input {...field} className={inputHeightClass} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP/Postal code</FormLabel>
                  <FormControl>
                    <Input {...field} className={inputHeightClass} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="phone.phoneNumber"
            render={() => (
              <FormItem>
                <FormLabel>Phone *</FormLabel>
                <PhoneInput className={inputHeightClass} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Step10_Location;
