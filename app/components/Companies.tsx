import Image from "next/image";
import React from "react";

const Companies = () => {
  interface Company {
    id: number;
    name: string;
    logo: string;
    description: string;
  }

  const companies: Company[] = [
    { id: 1, name: "Company 1", logo: "/Logos/logo1.svg", description: "…" },
    { id: 2, name: "Company 2", logo: "/Logos/logo2.svg", description: "…" },
    { id: 3, name: "Company 3", logo: "/Logos/logo3.svg", description: "…" },
    { id: 4, name: "Company 4", logo: "/Logos/logo4.svg", description: "…" },
    { id: 5, name: "Company 5", logo: "/Logos/logo5.svg", description: "…" },
    { id: 6, name: "Company 6", logo: "/Logos/logo6.svg", description: "…" },
  ];

  return (
    <section className="container mx-auto max-w-[1200px]">
      <div className="pt-20 lg:pt-24 pb-8 lg:pb-10  ">
        {/* Mobile: horizontal marquee */}
        <div className="md:hidden overflow-x-auto whitespace-nowrap py-4">
          {companies.map((company) => (
            <div
              key={company.id}
              className="inline-block px-4 flex-shrink-0"
              style={{ width: 120 }}
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={110}
                height={16}
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Desktop: static grid */}
        <div className="hidden md:grid md:grid-cols-6 gap-8">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex flex-col items-center justify-center p-4"
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={110}
                height={16}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
