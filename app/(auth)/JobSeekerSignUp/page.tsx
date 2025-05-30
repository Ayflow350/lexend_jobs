"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaApple } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";

// Re-using the GoogleGIcon from the previous example.
// If it's in a separate file, import it. Otherwise, define it here.
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const JobSeekerSignupPage: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle job seeker signup logic here
    console.log("Job seeker signup form submitted");
  };

  // Make sure this path is correct for your company signup page
  const companySignupPath = "/CompanySignUp"; // Or "/CompanySignUp" if that's your route

  return (
    <div className="min-h-screen bg-[#F5EEE9] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl">
        <div className="text-center sm:text-right mb-6 sm:mb-4">
          <span className="text-sm text-gray-600 mr-1">
            Want to hire talent?
          </span>
          <Link href={companySignupPath} legacyBehavior>
            <a className="font-medium text-green hover:text-green/80 hover:underline">
              Sign up as a company
            </a>
          </Link>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Apply as <span className="text-green">Talent</span>
            </h2>
          </div>

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

          <div className="mt-6 flex items-center">
            <Separator className="flex-1" />
            <span className="px-3 text-sm text-gray-500">OR</span>
            <Separator className="flex-1" />
          </div>

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-6 sm:space-y-0">
              <div className="flex-1 space-y-1.5">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="Jane"
                />
              </div>
              <div className="flex-1 space-y-1.5">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  placeholder="Smith"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">
                Password{" "}
                <span className="text-xs text-gray-500">
                  (8 or more characters)
                </span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 h-full px-3 text-gray-500 hover:text-green" // hover to brand green
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
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="country">Country</Label>
              <Select name="country" required>
                <SelectTrigger id="country" className="w-full">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="gb">United Kingdom</SelectItem>
                  <SelectItem value="ng">Nigeria</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="sendEmails"
                  name="sendEmails"
                  className="mt-0.5 border-gray-300 focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="sendEmails"
                    className="font-medium text-gray-700 cursor-pointer"
                  >
                    Send me emails with tips, and new Gigs that match my skills.
                  </Label>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeTerms"
                  name="agreeTerms"
                  required
                  className="mt-0.5 border-gray-300 focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="agreeTerms"
                    className="text-gray-700 cursor-pointer"
                  >
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
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full py-3 text-base font-semibold active:scale-[0.98]"
                // Default variant of shadcn/ui Button will use --primary (your green)
                // and --primary-foreground for text
              >
                Create my account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerSignupPage;
