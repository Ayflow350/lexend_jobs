"use client";

import React from "react";
import CareerStat from "./Avatar";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Hero = () => {
  return (
    <div className="text-white py-12 flex flex-col items-center justify-center">
      <motion.h1
        variants={fadeLeft}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="text-3xl md:text-6xl font-bold text-center lg:w-[1000px]"
      >
        Connect talent to roles of any expertise
      </motion.h1>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="py-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-white text-center bg-green py-2 px-6 rounded-md"
        >
          Try it out
        </motion.button>
      </motion.div>

      <motion.div
        variants={fadeRight}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <CareerStat />
      </motion.div>

      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="translate-y-28 lg:translate-y-0 lg:pt-[50px] relative"
      >
        {/* Floating image animation wrapper */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/Figure.svg"
            alt="hero image"
            width={980}
            height={400}
            priority
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 md:bottom-44 md:left-[360px] lg:bottom-56 lg:left-[450px]"
        >
          <Image
            src="/PlayButton.svg"
            alt="play button"
            width={80}
            height={80}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
