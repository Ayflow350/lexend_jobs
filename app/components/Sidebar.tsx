import {
  BellIcon,
  BriefcaseBusiness,
  FileText,
  MessageCircleDashed,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const Sidebar = ({ toggle }: { toggle: () => void }) => {
  return (
    <div className="text-black ">
      <div className="pt-8 px-4">
        <div className="flex  items-center gap-x-40">
          <Image src="/BlackLogo.svg" alt="" width={80} height={80} />
          <X onClick={toggle} />
        </div>
        <div className="flex mt-20 ">
          <ul className=" w-full  divide-y divide-gray-300">
            <li className="flex items-center gap-x-2 cursor-pointer py-6">
              <BriefcaseBusiness />
              Jobs
            </li>
            <li className="flex items-center gap-x-2 cursor-pointer py-6">
              <FileText size={20} />
              Applications
            </li>
            <li className="flex items-center gap-x-2 cursor-pointer py-6">
              <User />
              Profile
            </li>
            <li className="flex items-center gap-x-2 cursor-pointer py-6">
              <MessageCircleDashed />
              Messages
            </li>
            <li className="flex items-center gap-x-2  cursor-pointer py-6">
              <BellIcon />
              Notifications
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
