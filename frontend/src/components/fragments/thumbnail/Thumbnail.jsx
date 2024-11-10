import React from "react";
import { motion } from "framer-motion";
import useScrollAnimation from "../../../hooks/useScrollAnimation";

export default function Thumbnail({
  thumbnail,
  name,
  kecamatan,
  kabupaten,
  duration,
}) {
  const { ref, controls } = useScrollAnimation(duration);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{
        opacity: 0,
        y: 10,
      }}
      className="relative pt-24"
    >
      <img
        src={thumbnail}
        alt={name}
        className="w-full md:h-[550px] object-cover"
      />
      <div className="w-full felx flex-col gap-3 p-3 md:px-10 md:py-5 lg:px-24 lg:py-10 bg-gradient-to-b from-navyy/0 to-navyy absolute left-0 bottom-0">
        <h1 className="font-openSans font-semibold text-[12px] text-white md:text-[26px] lg:text-[28px] sm:text-[14px]">
          {name}
        </h1>
        <p className="font-poppins font-light text-[10px] text-white md:text-[20px] lg:text-[24px] sm:text-[14px]">
          {kecamatan} {kabupaten}
        </p>
      </div>
    </motion.div>
  );
}
