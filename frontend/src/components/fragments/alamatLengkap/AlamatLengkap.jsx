import React from 'react'
import { motion } from 'framer-motion';
import useScrollAnimation from '../../../hooks/useScrollAnimation';

export default function AlamatLengkap({address, duration}) {
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
      <h1 className="font-openSans font-semibold text-sm mb-3 sm:text-[16px] md:text-lg lg:text-2xl">
        Alamat Lengkap
      </h1>
      <p className="font-poppins font-light text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px]">
        {address}
      </p>
    </motion.div>
  );
}
