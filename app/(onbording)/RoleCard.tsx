import React from "react";

// Define an interface for props that the icon element is expected to accept.
interface ElementAcceptingClassNameProps {
  className?: string;
}

interface RoleCardProps {
  icon: React.ReactElement<ElementAcceptingClassNameProps>;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({
  icon,
  title,
  description,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative flex-1 p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ease-in-out
        hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          isSelected
            ? "border-green bg-white shadow-md focus:ring-green" // Use 'green' for border and focus ring
            : // For 'focus:ring-green', ensure 'green' is defined in `theme.extend.colors.ring` or that `ring` defaults to primary
              // If 'ring' in config is 'hsl(var(--ring))' and '--ring' CSS var is your green, this is fine.
              "border-gray-300 bg-white hover:border-gray-400 focus:ring-gray-400"
        }
      `}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="flex flex-col items-start text-left">
        {/* Radio button visual cue */}
        <div
          className={`
          absolute top-4 right-4 w-5 h-5 border-2 rounded-full flex items-center justify-center
          transition-colors duration-200
          ${
            isSelected
              ? "border-green bg-green" // Use 'green' for border and background
              : "border-gray-400 bg-white"
          }
        `}
        >
          {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
        </div>

        {/* Icon container */}
        <div
          className={`
          p-3 rounded-full mb-4 transition-colors duration-200
          ${
            isSelected
              ? "bg-green/10" // Use a light shade of green, e.g., green with 10% opacity or a specific light green shade
              : // Or, if you have a light green defined in your theme like 'green-100': "bg-green-100"
                // If primary is your green and you want to use shadcn theme: "bg-primary/10" or "bg-primary-light" (if defined)
                "bg-gray-100"
          } 
        `}
        >
          {React.cloneElement(icon, {
            className: `w-7 h-7 transition-colors duration-200 ${
              isSelected
                ? "text-green" // Use 'green' for icon color
                : "text-gray-600"
            }`,
          })}
        </div>

        {/* Text content */}
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default RoleCard;
