// components/freelancer-onboarding/ResumeIllustration.tsx
import React from "react";

// A simple SVG component to replicate the illustration in the upload modal.
export const ResumeIllustration: React.FC = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto"
  >
    <g clipPath="url(#clip0_807_2)">
      <path
        d="M62.5 87.5H29.1667C27.9583 87.5 27.0833 86.625 27.0833 85.4167V14.5833C27.0833 13.375 27.9583 12.5 29.1667 12.5H70.8333C72.0417 12.5 72.9167 13.375 72.9167 14.5833V54.1667L62.5 87.5Z"
        fill="#F3F4F6"
        stroke="#E5E7EB"
        strokeWidth="2"
      />
      <path d="M41.6667 31.25H60.4167" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
      <path d="M41.6667 43.75H60.4167" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
      <path d="M41.6667 56.25H52.0833" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
      <path d="M37.5 18.75L41.1458 22.3958L37.5 26.0417" stroke="#34D399" strokeWidth="0" />
      <path d="M35.4167 22.9167L39.0625 26.5625L35.4167 30.2083" stroke="#34D399" strokeWidth="0" />
      <path d="M35.4167 18.75L39.0625 22.3958L35.4167 26.0417" fill="#34D399" />
      <circle cx="37.5" cy="22.5" r="3" fill="#10B981" />
      <text x="35" y="26" fontSize="8" fill="white" fontWeight="bold">✓</text>
      <circle cx="37.5" cy="35.5" r="3" fill="#10B981" />
      <text x="35" y="39" fontSize="8" fill="white" fontWeight="bold">✓</text>
      
      <circle cx="75" cy="58" r="14" fill="#FECACA" />
      <circle cx="75" cy="54" r="6" fill="#F87171" />
      <path d="M67 70 C 70 65, 80 65, 83 70" stroke="#F87171" strokeWidth="2" fill="none" />
    </g>
    <defs>
      <clipPath id="clip0_807_2">
        <rect width="100" height="100" fill="white" />
      </clipPath>
    </defs>
  </svg>
);