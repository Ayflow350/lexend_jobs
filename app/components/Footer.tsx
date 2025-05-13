import React from "react";
import Link from "next/link";
import Image from "next/image";

const footerNav = [
  {
    section: "Discover",
    links: [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Companies", href: "/companies" },
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    section: "For Job Seekers",
    links: [
      { label: "How It Works", href: "/how-it-works#seekers" },
      { label: "Create Profile", href: "/create-profile" },
      { label: "Browse Categories", href: "/jobs/categories" },
      { label: "Help Center", href: "/help" },
    ],
  },
  {
    section: "For Employers",
    links: [
      { label: "Post a Job", href: "/post-job" },
      { label: "Pricing", href: "/pricing" },
      { label: "Manage Listings", href: "/dashboard/jobs" },
      { label: "Employer FAQ", href: "/faq#employers" },
    ],
  },
  {
    section: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Security", href: "/security" },
    ],
  },
];

const FooterLogo = [
  { id: 1, logo: "/instagram.svg" },
  { id: 2, logo: "/linkedin.svg" },
  { id: 3, logo: "/twitter.svg" },
  { id: 4, logo: "/Youtube.svg" },
  { id: 5, logo: "/Facebook.svg" },
  { id: 6, logo: "/dribble.svg" },
];

const Footer: React.FC = () => {
  return (
    <div className="px-4 pb-4">
      <footer className="bg-[#1C1C1E] text-white mt-12 rounded-[24px] overflow-hidden">
        <div className="container mx-auto max-w-[1200px] px-4 py-12">
          {/** Main grid: 1 column on mobile, 2 on small, 3 on md, 6 on lg **/}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 border-b border-[#838383]/25 pb-8">
            {/** Logo block spans full width on mobile, 2 cols on small, 3 on md, back to 2 on lg **/}
            <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-2 flex flex-col">
              <Image
                src="/Lexend.svg"
                alt="Lexend Logo"
                width={117}
                height={40}
              />
              <p className="text-sm text-gray-400 mt-4">
                Design amazing digital experiences that create more happy in the
                world.
              </p>
            </div>

            {/** Now each nav section takes 1 col **/}
            {footerNav.map((section) => (
              <div key={section.section}>
                <h4 className="font-semibold mb-4">{section.section}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white text-sm block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/** Bottom row: stack on mobile, side-by-side on md+ **/}
          <div className="mt-8 flex flex-col md:flex-row items-center md:justify-between gap-4">
            <div className="text-gray-600 text-xs">
              &copy; {new Date().getFullYear()} @Lexend. All rights reserved.
            </div>
            <div className="flex gap-4">
              {FooterLogo.map((logo) => (
                <Link key={logo.id} href="#">
                  <Image
                    src={logo.logo}
                    alt="Social Media Logo"
                    width={24}
                    height={24}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
