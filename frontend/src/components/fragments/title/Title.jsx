import { motion } from "framer-motion";
import useScrollAnimation from "../../../hooks/useScrollAnimation";

const Title = ({ titleh3, titleh1, duration}) => {

  const {ref, controls} = useScrollAnimation({duration});
  
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <motion.h3
          initial={{
            opacity: 0,
            y: 10,
          }}
          ref={ref}
          animate={controls}
          className="text-purplee font-semibold font-poppins text-[0.8rem] md:text-sm"
        >
          {titleh3}
        </motion.h3>
        <motion.h1
          initial={{
            opacity: 0,
            y: 10,
          }}
          ref={ref}
          animate={controls}
          className="text-navyy font-bold font-volkhov text-2xl text-center md:text-3xl"
        >
          {titleh1}
        </motion.h1>
      </div>
    </>
  );
};

export default Title;
