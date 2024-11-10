import { motion } from "framer-motion";
import useScrollAnimation from "../../../hooks/useScrollAnimation";

const ImageSejarah = ({ ImgKabBandung, duration }) => {
  const { ref, controls } = useScrollAnimation({ duration });

  return (
    <motion.img
      initial={{
        opacity: 0,
        y: 10,
      }}
      ref={ref}
      animate={controls}
      src={ImgKabBandung}
      alt=""
      className="w-full rounded-xl shadow-lg shadow-navyy/40 md:w-1/2"
    />
  );
};

export default ImageSejarah;
