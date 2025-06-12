"use client";

import React, { useEffect } from "react"; // Added useEffect for debugging
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CompanyOnboardingData,
  PaymentType,
} from "@/lib/company-onboarding-schemas";
import { ClockIcon, DollarSignIcon, CheckCircle2Icon } from "lucide-react";
import HourlyRateDistributionChart from "./HourlyRateDistributionChart"; // Ensure this path is correct

const paymentTypeOptions = [
  {
    value: "hourly" as PaymentType,
    label: "Hourly rate",
    icon: <ClockIcon className="mr-2 h-5 w-5" />,
  },
  {
    value: "fixed" as PaymentType,
    label: "Fixed price",
    icon: <DollarSignIcon className="mr-2 h-5 w-5" />,
  },
];

// Example static data for the chart - replace with dynamic data if available
const exampleChartData = [
  { label: "$5", value: 10 },
  { label: "12", value: 50, highlight: true },
  { label: "15", value: 70, highlight: true },
  { label: "20", value: 60, highlight: true },
  { label: "25", value: 45, highlight: true },
  { label: "30", value: 30 },
  { label: "38", value: 20 },
  { label: "50", value: 15 },
  { label: "$70+", value: 5 },
];

const Step4Budget: React.FC = () => {
  const { control, watch, setValue, getFieldState, formState } =
    useFormContext<CompanyOnboardingData>(); // Added getValues for debug

  const paymentType = watch("budget.paymentType");

  // For debugging default value propagation
  useEffect(() => {
    // console.log("Step4Budget Mounted. Watched paymentType:", paymentType);
    // console.log("Step4Budget Mounted. RHF value for budget.paymentType:", getValues("budget.paymentType"));
  }, []);

  const handleNotReadyToSetBudget = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (paymentType === "fixed") {
      setValue("budget.fixedPriceBudget", undefined, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    console.log("User is not ready to set a budget.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 items-start">
      {/* Left Column: Guidance */}
      <div className="space-y-3 md:space-y-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          Job post
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-foreground leading-tight">
          Tell us about your budget.
        </h1>
        <p className="text-base text-gray-600 dark:text-muted-foreground">
          This will help us match you to talent within your range.
        </p>
      </div>

      {/* Right Column: Form Inputs */}
      <div className="space-y-8">
        <FormField
          control={control}
          name="budget.paymentType"
          render={({ field }) => {
            // console.log("Rendering budget.paymentType Field. Value from RHF:", field.value); // For debugging
            return (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value as PaymentType);
                      if (value === "hourly") {
                        setValue("budget.fixedPriceBudget", undefined, {
                          shouldDirty: true,
                          shouldValidate: !!getFieldState(
                            "budget.fixedPriceBudget",
                            formState
                          ).isTouched,
                        });
                      } else if (value === "fixed") {
                        setValue("budget.hourlyRateFrom", undefined, {
                          shouldDirty: true,
                          shouldValidate: !!getFieldState(
                            "budget.hourlyRateFrom",
                            formState
                          ).isTouched,
                        });
                        setValue("budget.hourlyRateTo", undefined, {
                          shouldDirty: true,
                          shouldValidate: !!getFieldState(
                            "budget.hourlyRateTo",
                            formState
                          ).isTouched,
                        });
                      }
                    }}
                    value={field.value || ""} // Use value for controlled component with RHF, ensure it's not undefined for RadioGroup
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {paymentTypeOptions.map((option) => {
                      const isSelected = field.value === option.value;
                      return (
                        <FormItem key={option.value} className="w-full">
                          <FormControl>
                            <RadioGroupItem
                              value={option.value}
                              id={`budget.paymentType-${option.value}`}
                              className="sr-only"
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor={`budget.paymentType-${option.value}`}
                            className={`
                              relative flex flex-col items-center justify-center rounded-lg border-2 
                              p-6 text-center transition-all duration-200 ease-in-out cursor-pointer group
                              hover:shadow-md 
                              ${
                                isSelected
                                  ? "border-primary bg-primary/10 dark:bg-primary/20 shadow-lg ring-2 ring-primary ring-offset-background ring-offset-2"
                                  : "border-border bg-card hover:border-slate-300 dark:hover:border-slate-700"
                              }
                            `}
                          >
                            {isSelected && (
                              <CheckCircle2Icon className="absolute top-3 right-3 h-6 w-6 text-primary" />
                            )}
                            <div
                              className={`mb-2 text-muted-foreground group-hover:text-foreground ${
                                isSelected ? "text-primary" : ""
                              }`}
                            >
                              {option.icon}
                            </div>
                            <span
                              className={`font-medium group-hover:text-foreground ${
                                isSelected ? "text-primary" : "text-foreground"
                              }`}
                            >
                              {option.label}
                            </span>
                          </FormLabel>
                        </FormItem>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* Conditional Fields based on Payment Type */}
        {paymentType === "hourly" && (
          <div className="space-y-6 p-6 border border-input rounded-lg bg-background shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="budget.hourlyRateFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="e.g. 12"
                          className="pl-8 pr-12"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : parseFloat(e.target.value)
                            )
                          }
                          value={field.value ?? ""}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          /hr
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="budget.hourlyRateTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          placeholder="e.g. 25"
                          className="pl-8 pr-12"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : parseFloat(e.target.value)
                            )
                          }
                          value={field.value ?? ""}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          /hr
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormDescription className="text-xs text-muted-foreground">
              This is the average rate for similar projects. <br />
              Professionals tend to charge{" "}
              <span className="font-semibold text-foreground">
                $12 - $25 /hour (USD)
              </span>{" "}
              for web design projects like yours. Experts may charge higher
              rates.
            </FormDescription>
            {/* INTEGRATED CHART */}
            <div className="mt-6 w-full">
              <HourlyRateDistributionChart
                data={exampleChartData}
                width={400}
                height={150}
              />
            </div>
          </div>
        )}

        {paymentType === "fixed" && (
          <div className="space-y-6 p-6 border border-input rounded-lg bg-background shadow-sm">
            <FormField
              control={control}
              name="budget.fixedPriceBudget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    What is the best cost estimate for your project?
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="e.g. 500"
                        className="pl-8"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : parseFloat(e.target.value)
                          )
                        }
                        value={field.value ?? ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormDescription className="text-xs text-muted-foreground">
              Set a price for the project and pay at the end, or you can divide
              the project into milestones and pay as each milestone is
              completed. <br />
              You can negotiate this cost and create milestones when you chat
              with your freelancer.
            </FormDescription>
            <Button
              variant="link"
              type="button"
              onClick={handleNotReadyToSetBudget}
              className="p-0 h-auto text-sm text-primary hover:text-primary/80 font-medium"
            >
              Not ready to set a budget?
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step4Budget;
