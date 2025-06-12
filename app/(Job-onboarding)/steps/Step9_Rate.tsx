"use client";

import React, { useMemo } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FreelancerProfileData } from "@/lib/freelancer-profile-schemas";

// This component simulates the input with a currency symbol
const CurrencyInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
        $
      </span>
      <Input
        type="number"
        step="0.01"
        className={`pl-7 ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
});
CurrencyInput.displayName = "CurrencyInput";

const Step9_Rate: React.FC = () => {
  const { control, watch } = useFormContext<FreelancerProfileData>();
  const hourlyRate = watch("hourlyRate");

  const { serviceFee, youGet } = useMemo(() => {
    const rate = Number(hourlyRate) || 0;
    // Assuming a flat 10% service fee for this example
    const fee = rate * 0.1;
    const finalAmount = rate - fee;
    return {
      serviceFee: fee,
      youGet: finalAmount,
    };
  }, [hourlyRate]);

  return (
    <div className="w-full max-w-3xl">
      <div className="mb-10 text-left">
        <p className="text-sm text-gray-500 mb-2">9/10</p>
        <h1 className="text-3xl md:text-4xl font-medium text-gray-900 leading-snug">
          Now, let&apos;s set your hourly rate.
        </h1>
        <p className="mt-3 text-gray-600">
          Clients will see this rate on your profile and in search results once
          you publish your profile. You can adjust your rate every time you
          submit a proposal.
        </p>
      </div>

      <div className="space-y-8">
        {/* Hourly Rate Input */}
        <div className="flex justify-between items-start pt-6 border-t">
          <div>
            <h3 className="text-xl font-medium">Hourly rate</h3>
            <p className="text-gray-600 mt-1">
              Total amount the client will see.
            </p>
          </div>
          <div className="flex items-center gap-2 max-w-[200px]">
            <Controller
              name="hourlyRate"
              control={control}
              render={({ field, fieldState }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <CurrencyInput
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : parseFloat(value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <span className="text-gray-500">/hr</span>
          </div>
        </div>

        {/* Service Fee */}
        <div className="flex justify-between items-start pt-6 border-t">
          <div>
            <h3 className="text-xl font-medium">Service fee</h3>
            <p className="text-gray-600 mt-1 max-w-md">
              This helps us run the platform and provide services like payment
              protection and customer support. Fees vary and are shown before
              contract acceptance.
              <a
                href="#"
                className="text-primary font-semibold ml-1 hover:underline"
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="flex items-center gap-2 max-w-[200px]">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                -$
              </span>
              <Input
                readOnly
                value={serviceFee.toFixed(2)}
                className="pl-8 bg-gray-100 border-gray-100 text-gray-700"
              />
            </div>
            <span className="text-gray-500">/hr</span>
          </div>
        </div>

        {/* You'll get */}
        <div className="flex justify-between items-start pt-6 border-t">
          <div>
            <h3 className="text-xl font-medium">You&apos;ll get</h3>
            <p className="text-gray-600 mt-1">
              The estimated amount you&apos;ll receive after service fees.
            </p>
          </div>
          <div className="flex items-center gap-2 max-w-[200px]">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                $
              </span>
              <Input
                readOnly
                value={youGet.toFixed(2)}
                className="pl-7 bg-gray-100 border-gray-100 font-semibold text-gray-800"
              />
            </div>
            <span className="text-gray-500">/hr</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step9_Rate;
