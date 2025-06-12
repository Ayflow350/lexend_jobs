"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaApple } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Utilities and Schemas
import {
  // countryList, // No longer need to import countryList directly here if Combobox handles it
  JobSeekerSignupFormData,
  jobSeekerSignupSchema,
} from "@/lib/form-utils"; // ADJUST PATH AS NEEDED

// GoogleGIcon component
const GoogleGIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.64 9.20455C17.64 8.56818 17.5827 7.95455 17.4682 7.36364H9V10.8182H13.8436C13.6336 11.9455 12.9973 12.9182 12.0473 13.5682V15.8182H14.9564C16.6782 14.2545 17.64 11.9455 17.64 9.20455Z"
      fill="#4285F4"
    />
    <path
      d="M9 18C11.43 18 13.4673 17.1818 14.9564 15.8182L12.0473 13.5682C11.2382 14.0864 10.2055 14.4318 9 14.4318C6.88818 14.4318 5.07636 13.0182 4.36545 11.0909H1.35182V13.4318C2.86182 16.1182 5.71636 18 9 18Z"
      fill="#34A853"
    />
    <path
      d="M4.36545 11.0909C4.18182 10.5727 4.09091 10.0182 4.09091 9.45455C4.09091 8.89091 4.18182 8.33636 4.36545 7.81818V5.47727H1.35182C0.716364 6.65455 0.363636 7.99091 0.363636 9.45455C0.363636 10.9182 0.716364 12.2545 1.35182 13.4318L4.36545 11.0909Z"
      fill="#FBBC05"
    />
    <path
      d="M9 4.47727C10.3255 4.47727 11.5073 4.94545 12.4827 5.85455L15.0209 3.31364C13.4673 1.84091 11.43 0.909091 9 0.909091C5.71636 0.909091 2.86182 2.78182 1.35182 5.47727L4.36545 7.81818C5.07636 5.89091 6.88818 4.47727 9 4.47727Z"
      fill="#EA4335"
    />
  </svg>
);

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CountryCombobox } from "@/components/ui/CountryCombobox"; // Import your new component

const JobSeekerSignupPage: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useForm<JobSeekerSignupFormData>({
    resolver: zodResolver(jobSeekerSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      country: undefined,
      sendEmails: true,
      agreeTerms: false,
    },
  });

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  function onSubmit(values: JobSeekerSignupFormData) {
    console.log("Job Seeker signup form submitted with Zod:", values);
    // TODO: Implement actual signup logic
  }

  const companySignupPath = "/CompanySignUp";

  return (
    <div className="min-h-screen bg-[#F5EEE9] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl">
        {/* ... Top Link ... */}
        <div className="text-center sm:text-right mb-6 sm:mb-4">
          <span className="text-sm text-gray-600 mr-1">
            Want to hire talent?
          </span>
          <Link href={companySignupPath} legacyBehavior>
            <a className="font-medium text-green hover:text-green/80 hover:underline">
              Sign up as a client
            </a>
          </Link>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-xl">
          {/* ... Heading ... */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Apply as <span className="text-green">Talent</span>
            </h2>
          </div>

          {/* ... Social Logins ... */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <Button
              variant="outline"
              className="w-full py-6 text-sm text-gray-700"
            >
              <FaApple className="h-5 w-5 mr-2 text-black dark:text-white" />
              Continue with Apple
            </Button>
            <Button
              variant="outline"
              className="w-full py-6 text-sm text-gray-700"
            >
              <GoogleGIcon /> <span className="ml-2">Continue with Google</span>
            </Button>
          </div>

          {/* ... OR Separator ... */}
          <div className="mt-6 flex items-center">
            <Separator className="flex-1" />
            <span className="px-3 text-sm text-gray-500">OR</span>
            <Separator className="flex-1" />
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 space-y-6"
            >
              {/* ... FirstName, LastName, Email, Password fields ... (same as before) ... */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-6 sm:space-y-0">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password{" "}
                      <span className="text-xs text-gray-500">
                        (8+ characters)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={passwordVisible ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 h-full px-3 text-gray-500 hover:text-green"
                          aria-label={
                            passwordVisible ? "Hide password" : "Show password"
                          }
                        >
                          {passwordVisible ? (
                            <HiEyeOff className="h-5 w-5" />
                          ) : (
                            <HiEye className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Country Combobox */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    {" "}
                    {/* Ensure label and combobox are stacked */}
                    <FormLabel>Country</FormLabel>
                    <CountryCombobox
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select your country"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ... Checkboxes (same as before) ... */}
              <FormField
                control={form.control}
                name="sendEmails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5 border-gray-300 focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-medium text-gray-700 cursor-pointer">
                        Send me emails with tips, and new Gigs that match my
                        skills.
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5 border-gray-300 focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-gray-700 cursor-pointer">
                        Yes, I understand and agree to the{" "}
                        <Link href="/terms" legacyBehavior>
                          <a className="font-medium text-green hover:text-green/80 hover:underline">
                            User Agreement
                          </a>
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" legacyBehavior>
                          <a className="font-medium text-green hover:text-green/80 hover:underline">
                            Privacy Policy
                          </a>
                        </Link>
                        .
                      </FormLabel>
                      <FormMessage className="!mt-1.5" />
                    </div>
                  </FormItem>
                )}
              />

              {/* ... Submit Button (same as before) ... */}

              <Button
                type="submit"
                className="w-full py-3 text-base font-semibold active:scale-[0.98]"
                disabled={form.formState.isSubmitting}
              >
                <Link href="/OnboardingJob">
                  {form.formState.isSubmitting
                    ? "Creating Account..."
                    : "Create my account"}
                </Link>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerSignupPage;
