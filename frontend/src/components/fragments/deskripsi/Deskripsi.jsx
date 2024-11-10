import React from 'react'
import { motion } from 'framer-motion';
import useScrollAnimation from '../../../hooks/useScrollAnimation';

export default function Deskripsi({desc, duration}) {
  const {ref, controls} = useScrollAnimation(duration);
  
  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{
        opacity: 0,
        y: 10,
      }}
      className="mt-10 mb-5 md:mb-10 lg:max-w-[750px]"
    >
      <h1 className="font-openSans font-semibold text-sm mb-3 sm:text-[16px] md:text-lg lg:text-2xl">
        Deskripsi
      </h1>
      <p className="font-poppins font-light text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px]">
        {desc}
      </p>
    </motion.div>
  );
}
