import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {motion} from "framer-motion";
import useScrollAnimation from "../../../hooks/useScrollAnimation";

const Card = ({ icon, color, titleh1, paragraph, duration }) => {

  const {ref, controls} = useScrollAnimation(duration);
  
  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{
        opacity: 0,
        y: 10,
      }}
      whileHover={
        {
          scale: 1.05,
          transition: {
            duration: 0.5,
          },
        }
      }
      className="w-[16.7rem] h-[20rem] flex flex-col justify-center items-center gap-5 p-5 rounded-[36px] hover:shadow-xl shadow-navyy"
    >
      <FontAwesomeIcon icon={icon} size="5x" color={color}></FontAwesomeIcon>
      <h1 className="font-openSans text-navyy font-semibold text-[15px] text-center">
        {titleh1}
      </h1>
      <p className="font-poppins text-navyy text-[13px] text-center">
        {paragraph}
      </p>
    </motion.div>
  );
};

export default Card;
