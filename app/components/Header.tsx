"use client";
import { Menu } from "lucide-react";
import Image from "next/image";
import React from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      {/* Sidebar (unchanged) */}
      <div
        className={`
          fixed inset-y-0 right-0 w-72 bg-white z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          lg:hidden
        `}
      >
        <Sidebar toggle={toggleSidebar} />
      </div>

      {/* Full-width bar */}
      <div className="w-full  py-5 text-white">
        {/* Centered inner container */}
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo + links */}
            <div className="flex items-center gap-x-4">
              <Image src="/Lexend.svg" alt="logo" width={100} height={100} />
              <ul className="hidden lg:flex gap-x-8">
                <li>Find Jobs</li>
                <li>Browse Companies</li>
                <li>Settings</li>
                <li>Contact</li>
              </ul>
            </div>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-x-4 cursor-pointer">
              <ul className="flex gap-x-8">
                <Link href="/sign-in">Log in</Link>
              </ul>
              <button className="bg-green py-2 px-4 rounded-md cursor-pointer">
                <Link href="/Onboarding">Start free trial</Link>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden py-2 px-4 rounded-md"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
