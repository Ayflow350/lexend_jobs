import React from "react";
import Image from "next/image"; // or 'use "react" <img>' if you’re not in Next.js

export default function CareerStat() {
  const avatars = [
    "/Users/Avatar1.svg",
    "/Users/Avatar2.svg",
    "/Users/Avatar3.svg",
  ];

  return (
    <div className="flex items-center">
      {/* Avatar stack */}
      <div className="flex -space-x-3">
        {avatars.map((src, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full ring-2 ring-white overflow-hidden"
          >
            <Image src={src} alt={`User ${i + 1}`} width={32} height={32} />
          </div>
        ))}
      </div>

      {/* Text */}
      <div className="ml-3 text-sm">
        <span className="font-semibold text-white">4.6k </span>
        <span className="text-white">Career Opportunities</span>
      </div>
    </div>
  );
}
