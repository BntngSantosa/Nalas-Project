import React from "react";
import { motion } from "framer-motion";
import useScrollAnimation from "../../../hooks/useScrollAnimation";

export default function Youtube({ videoId, duration }) {
  const {ref, controls} = useScrollAnimation(duration);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{
        opacity: 0,
        y: 10,
      }}
      className="mb-5"
    >
      <iframe
        className="w-full h-[250px] rounded-lg md:h-[350px] lg:h-[500px]"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </motion.div>
  );
}
