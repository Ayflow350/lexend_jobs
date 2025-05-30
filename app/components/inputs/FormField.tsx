/* eslint-disable @typescript-eslint/no-explicit-any */
// FormField.tsx
"use client";

import React, { ReactNode, useState, ReactElement, cloneElement } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  RegisterOptions,
} from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  validation?: RegisterOptions;
  type?: "text" | "password" | "email" | "number" | "textarea";
  /**
   * If you supply `children`, we'll render that instead of the default input/textarea.
   * This is useful for custom components like rich text editors, date pickers, etc.
   */
  children?: ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  required = false,
  disabled = false,
  errors,
  register,
  validation = {},
  type = "text",
  children,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // decide actual input `type` or undefined for textarea
  const controlType =
    type === "password" && showPassword
      ? "text"
      : type === "textarea"
      ? undefined
      : type;

  const baseClasses = `
    peer h-14 w-full px-4 text-lg text-[#1C1B1F] bg-white border rounded-lg
    outline-none transition-all duration-300
    ${
      errors[id]
        ? "border-rose-500 focus:border-rose-500"
        : "border-[#79747E] focus:border-black"
    }
    disabled:opacity-70 disabled:cursor-not-allowed
  `;

  return (
    <div className="w-full relative mb-6">
      {/*
        If the user passed in children, render that instead of our default input/textarea.
        We also attempt to `cloneElement` to inject register/id/disabled if it's a ReactElement.
      */}
      {children ? (
        React.isValidElement(children) ? (
          cloneElement(children as ReactElement<any>, {
            id,
            disabled,
            ...register(id, { required, ...validation }),
          })
        ) : (
          children
        )
      ) : type === "textarea" ? (
        <textarea
          id={id}
          disabled={disabled}
          {...register(id, { required, ...validation })}
          rows={4}
          className={`${baseClasses} resize-none h-auto pt-6 pb-2`}
          placeholder=" "
        />
      ) : (
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required, ...validation })}
          placeholder=" "
          type={controlType}
          className={baseClasses}
        />
      )}

      <label
        htmlFor={id}
        className={`
          absolute left-4 text-base font-medium bg-white px-1 transition-all duration-300
          ${errors[id] ? "text-rose-500" : "text-[#1C1B1F]"}
          ${
            errors[id] || required
              ? "top-0 -translate-y-[50%]"
              : "top-1/2 -translate-y-1/2"
          }
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
          peer-focus:top-0 peer-focus:-translate-y-[50%]
        `}
      >
        {label}
        {required && <span className="text-rose-400 ml-1 text-2xl">*</span>}
      </label>

      {/* toggle eye icon for password fields */}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-5 text-gray-600"
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      )}
    </div>
  );
};

export default FormField;
