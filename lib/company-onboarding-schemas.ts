// lib/company-onboarding-schemas.ts
import { z } from "zod";

// --- Step 1: Job Title ---
export const jobTitleSchema = z.object({
  jobTitle: z
    .string({ required_error: "Job title is required." })
    .min(5, { message: "Job title must be at least 5 characters." })
    .max(100, { message: "Job title cannot exceed 100 characters." }),
});
export type JobTitleFormData = z.infer<typeof jobTitleSchema>;

// --- Step 2: Skills ---
export const skillsSchema = z.object({
  skills: z
    .array(
      z.string().min(1, "Skill cannot be empty.").max(50, "Skill is too long.")
    )
    .min(1, { message: "Please add at least one skill." })
    .max(15, { message: "You can add a maximum of 15 skills." }),
});
export type SkillsFormData = z.infer<typeof skillsSchema>;

// --- Step 3: Scope, Duration, Experience ---
export const projectSizeEnum = z.enum(["large", "medium", "small"], {
  required_error: "Please select a project size.",
  invalid_type_error: "Invalid project size selected.",
});
export type ProjectSize = z.infer<typeof projectSizeEnum>;

export const projectDurationEnum = z.enum(
  ["moreThan6Months", "3to6Months", "1to3Months"],
  {
    required_error: "Please select the project duration.",
    invalid_type_error: "Invalid project duration selected.",
  }
);
export type ProjectDuration = z.infer<typeof projectDurationEnum>;

export const experienceLevelEnum = z.enum(["entry", "intermediate", "expert"], {
  required_error: "Please select the required experience level.",
  invalid_type_error: "Invalid experience level selected.",
});
export type ExperienceLevel = z.infer<typeof experienceLevelEnum>;

export const scopeSchema = z.object({
  projectSize: projectSizeEnum,
  projectDuration: projectDurationEnum,
  experienceLevel: experienceLevelEnum,
});
export type ScopeFormData = z.infer<typeof scopeSchema>;

// --- Step 4: Budget ---
export const paymentTypeEnum = z.enum(["hourly", "fixed"], {
  required_error: "Please select a payment type for the budget.",
});
export type PaymentType = z.infer<typeof paymentTypeEnum>;

const hourlyPaymentObject = z.object({
  paymentType: z.literal("hourly"),
  hourlyRateFrom: z
    .number({
      invalid_type_error: "Minimum rate must be a valid number.",
      required_error: "Minimum hourly rate is required.", // Added required_error
    })
    .positive({ message: "Minimum rate must be positive." })
    .min(0.01, { message: "Minimum rate is $0.01/hr." })
    .optional(), // Making it optional and handling with superRefine
  hourlyRateTo: z
    .number({
      invalid_type_error: "Maximum rate must be a valid number.",
      required_error: "Maximum hourly rate is required.", // Added required_error
    })
    .positive({ message: "Maximum rate must be positive." })
    .min(0.01, { message: "Minimum rate is $0.01/hr." })
    .optional(), // Making it optional and handling with superRefine
});

const fixedPricePaymentObject = z.object({
  paymentType: z.literal("fixed"),
  fixedPriceBudget: z
    .number({
      invalid_type_error: "Budget must be a valid number.",
      required_error: "Fixed price budget is required.", // Added required_error
    })
    .positive({ message: "Budget must be positive." })
    .min(1, { message: "Minimum budget is $1." })
    .optional(), // Making it optional and handling with superRefine
});

const budgetDiscriminatedUnion = z.discriminatedUnion("paymentType", [
  hourlyPaymentObject,
  fixedPricePaymentObject,
]);

// --- Step 5: Job Description ---
const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; // 100MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/jpeg",
  "image/png",
  "application/zip",
];

export const descriptionSchema = z.object({
  jobDescription: z
    .string({ required_error: "Job description is required." })
    .min(50, { message: "Description must be at least 50 characters." })
    .max(50000, { message: "Description cannot exceed 50,000 characters." }),
  attachments: z
    .array(
      z
        .instanceof(File, { message: "Invalid file provided." })
        .refine((file) => file.size <= MAX_FILE_SIZE_BYTES, {
          message: `File size should be less than ${
            MAX_FILE_SIZE_BYTES / 1024 / 1024
          }MB.`,
        })
        .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
          message: "Unsupported file type.",
        })
    )
    .max(5, { message: "You can upload a maximum of 5 files." })
    .optional(), // Make attachments optional overall
});
export type DescriptionFormData = z.infer<typeof descriptionSchema>;

// --- Overall Onboarding Data ---
export const companyOnboardingDataSchema = z
  .object({}) // Start with an empty object to merge into
  .merge(jobTitleSchema)
  .merge(skillsSchema)
  .merge(scopeSchema)
  .merge(z.object({ budget: budgetDiscriminatedUnion })) // Budget is nested under a 'budget' key
  .merge(descriptionSchema) // Merge the description schema
  .superRefine((data, ctx) => {
    // Budget specific refinements (already present, ensure paths are correct)
    if (data.budget.paymentType === "hourly") {
      const { hourlyRateFrom, hourlyRateTo } = data.budget;

      if (hourlyRateFrom === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Minimum hourly rate is required for hourly payment.",
          path: ["budget", "hourlyRateFrom"],
        });
      }
      if (hourlyRateTo === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Maximum hourly rate is required for hourly payment.",
          path: ["budget", "hourlyRateTo"],
        });
      }
      if (
        hourlyRateFrom !== undefined &&
        hourlyRateTo !== undefined &&
        hourlyRateTo < hourlyRateFrom
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Maximum rate cannot be less than minimum rate.",
          path: ["budget", "hourlyRateTo"],
        });
      }
    } else if (data.budget.paymentType === "fixed") {
      const { fixedPriceBudget } = data.budget;
      if (fixedPriceBudget === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Fixed price budget is required for fixed payment.",
          path: ["budget", "fixedPriceBudget"],
        });
      }
    }

    // No additional superRefine for jobDescription needed here unless there are cross-field dependencies.
    // The min/max length for jobDescription is handled by its own schema definition.
  });
export type CompanyOnboardingData = z.infer<typeof companyOnboardingDataSchema>;

// --- Schemas for individual steps (can be useful for step-specific validation triggers) ---
export const Step1Schema = jobTitleSchema;
export const Step2Schema = skillsSchema;
export const Step3Schema = scopeSchema;

// Step4Schema for validating the budget part in isolation.
export const Step4Schema = budgetDiscriminatedUnion.superRefine((data, ctx) => {
  if (data.paymentType === "hourly") {
    const { hourlyRateFrom, hourlyRateTo } = data; // No 'budget.' prefix here as it's relative to this schema
    if (hourlyRateFrom === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Minimum hourly rate is required.",
        path: ["hourlyRateFrom"],
      });
    }
    if (hourlyRateTo === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Maximum hourly rate is required.",
        path: ["hourlyRateTo"],
      });
    }
    if (
      hourlyRateFrom !== undefined &&
      hourlyRateTo !== undefined &&
      hourlyRateTo < hourlyRateFrom
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Maximum rate cannot be less than minimum rate.",
        path: ["hourlyRateTo"],
      });
    }
  } else if (data.paymentType === "fixed") {
    const { fixedPriceBudget } = data; // No 'budget.' prefix here
    if (fixedPriceBudget === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Fixed price budget is required.",
        path: ["fixedPriceBudget"],
      });
    }
  }
});
export type BudgetFormData = z.infer<typeof Step4Schema>; // This type would be for the budget object itself

// Step5Schema is simply the descriptionSchema
export const Step5Schema = descriptionSchema;
// No need for a new type if DescriptionFormData is sufficient.
export type Step5FormData = z.infer<typeof Step5Schema>;
