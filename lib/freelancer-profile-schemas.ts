// lib/freelancer-profile-schemas.ts
import { z } from "zod";

// --- Schema for a SINGLE Employment History item ---
export const EmploymentSchema = z
  .object({
    title: z.string().min(1, "Title is required."),
    company: z.string().min(1, "Company is required."),
    location: z.string().optional(),
    country: z.string().optional(),
    isCurrentRole: z.boolean({ required_error: "isCurrentRole is required." }),

    startDate: z.object({
      month: z
        .string({ required_error: "Start month is required." })
        .min(1, "Start month is required."),
      year: z
        .string({ required_error: "Start year is required." })
        .min(1, "Start year is required."),
    }),
    endDate: z.object({
      month: z.string().optional(),
      year: z.string().optional(),
    }),
    description: z
      .string()
      .max(2000, "Description cannot exceed 2000 characters.")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.isCurrentRole) {
      if (!data.endDate.year || !data.endDate.month) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End date is required for past roles.",
          path: ["endDate", "year"],
        });
      }
    }
  });
export type EmploymentFormData = z.infer<typeof EmploymentSchema>;

export const EducationSchema = z.object({
  school: z.string().min(1, "School name is required."),
  degree: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  datesAttended: z.object({
    from: z.string().optional(),
    to: z.string().optional(),
  }),
  description: z
    .string()
    .max(2000, "Description cannot exceed 2000 characters.")
    .optional(),
});
export type EducationFormData = z.infer<typeof EducationSchema>;

// --- Define Schemas for Each Step ---
export const categoryAndSpecialtiesSchema = z.object({
  mainCategory: z.string({ required_error: "Please select a main category." }),
  specialties: z
    .array(z.string())
    .min(1, "Please select at least one specialty.")
    .max(3, "You can select a maximum of 3 specialties."),
});

export const skillsSchema = z.object({
  skills: z
    .array(
      z.string().min(1, "Skill cannot be empty.").max(50, "Skill is too long.")
    )
    .min(1, { message: "Please add at least one skill." })
    .max(15, { message: "You can add a maximum of 15 skills." }),
});

export const professionalTitleSchema = z.object({
  professionalTitle: z
    .string({ required_error: "A professional title is required." })
    .min(10, "Your title must be at least 10 characters.")
    .max(70, "Your title cannot exceed 70 characters."),
});

export const employmentHistorySchema = z.object({
  employmentHistory: z
    .array(EmploymentSchema)
    .min(1, "Add at least one item")
    .optional(),
});

export const educationHistorySchema = z.object({
  educationHistory: z
    .array(EducationSchema)
    .min(1, "Add at least one education entry to proceed.")
    .optional(),
});

export const LanguageProficiencyEnum = z.enum(
  ["basic", "conversational", "fluent", "native"],
  { required_error: "Please select your proficiency level." }
);
export type LanguageProficiency = z.infer<typeof LanguageProficiencyEnum>;

export const LanguageSchema = z.object({
  language: z.string().min(1, "Language name is required."),
  proficiency: LanguageProficiencyEnum,
});
export type LanguageFormData = z.infer<typeof LanguageSchema>;

export const languagesSchema = z.object({
  englishProficiency: LanguageProficiencyEnum,
  otherLanguages: z.array(LanguageSchema).optional(),
});

export const professionalOverviewSchema = z.object({
  professionalOverview: z
    .string()
    .min(100, { message: "Your bio must be at least 100 characters." })
    .max(5000, { message: "Your bio cannot exceed 5000 characters." }),
});

// --- NEW: Schema for the Hourly Rate step ---
export const rateSchema = z.object({
  hourlyRate: z
    .number({
      required_error: "An hourly rate is required.",
      invalid_type_error: "Please enter a valid number.",
    })
    .min(3, { message: "The minimum hourly rate is $3.00." })
    .max(999, { message: "The maximum hourly rate is $999.00." }),
});

export const personalInfoSchema = z.object({
  profilePhoto: z
    .any()
    // In a real app, you'd use `.refine()` to check for File instance, size, and type.
    .refine((value) => value, "A profile photo is required."),
  dateOfBirth: z.date({ required_error: "Date of birth is required." }),
  country: z.string().min(1, "Country is required."),
  streetAddress: z.string().min(1, "Street address is required."),
  aptSuite: z.string().optional(),
  city: z.string().min(1, "City is required."),
  stateProvince: z.string().min(1, "State/Province is required."),
  zipCode: z.string().min(1, "ZIP/Postal code is required."),
  phone: z.object({
    countryCode: z.string().min(1, "Code is required."),
    phoneNumber: z.string().min(5, "A valid phone number is required."),
  }),
});

// --- Overall Freelancer Profile Data Schema ---
export const freelancerProfileSchema = z
  .object({})
  .merge(categoryAndSpecialtiesSchema)
  .merge(skillsSchema)
  .merge(professionalTitleSchema)
  .merge(employmentHistorySchema)
  .merge(educationHistorySchema)
  .merge(languagesSchema)
  .merge(professionalOverviewSchema)
  .merge(rateSchema)
  .merge(personalInfoSchema);

export type FreelancerProfileData = z.infer<typeof freelancerProfileSchema>;
