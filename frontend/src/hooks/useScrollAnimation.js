// src/hooks/useScrollAnimation.js

import { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const useScrollAnimation = ({ duration = 1 }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const [hasAnimated, setHasAnimated] = useState(false); // State untuk melacak animasi

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { delay: 0.5, duration: duration },
      });
      setHasAnimated(true); // Menandai bahwa animasi telah terjadi
    } else if (hasAnimated && !inView) {
      // Kembalikan ke keadaan awal saat elemen tidak terlihat
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView, hasAnimated, duration]);

  return { ref, controls };
};

export default useScrollAnimation;
