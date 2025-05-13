import React from "react";
import CareerStat from "./Avatar";
import Image from "next/image";

const Hero = () => {
  return (
    <div className=" text-white  py-12 flex flex-col items-center justify-center">
      <h1 className=" text-3xl  md:text-6xl font-bold text-center lg:w-[1000px] ">
        Connect talent to roles of any expertise
      </h1>
      <div className="py-6">
        <button className=" text-white text-center bg-green py-2 px-6 rounded-md">
          Try it out
        </button>
      </div>
      <div>
        <CareerStat />
      </div>
      <div className="translate-y-28 lg:translate-y-0 lg:pt-[50px] relative ">
        <Image src="/Figure.svg" alt="hero image" width={980} height={400} />
        <div
          className="
      absolute
      bottom-16   /* small/mobile */
      left-1/2
      transform -translate-x-1/2

      md:bottom-44  /* tablet+ */
      md:left-[360px]
      lg:bottom-56  /* desktop */
      lg:left-[450px]
    "
        >
          <Image
            src="/PlayButton.svg"
            alt="play button"
            width={80}
            height={80}
            className="
        w-12 h-12       /* mobile: 48×48px */
        sm:w-14 sm:h-14 /* small tablets: 56×56px */
        md:w-20 md:h-20 /* medium screens: 80×80px */
      "
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
