import React from "react";
import { motion } from "framer-motion";
import useScrollAnimation from "../../../hooks/useScrollAnimation";

export default function Galeri({galeri, description, duration}) {
  const {ref, controls}= useScrollAnimation(duration);
  
  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{
        opacity: 0,
        y: 10,
      }}
      className="mb-5 md:mb-10"
    >
      <div className="grid grid-cols-2 gap-3 place-content-center md:grid-cols-3">
        {Array.isArray(galeri) &&
          galeri.map((item) => (
            <img
              key={item.id}
              src={item.url}
              alt={description}
              className="w-full rounded-lg shadow-lg "
            />
          ))}
      </div>
    </motion.div>
  );
}
