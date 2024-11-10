import HeroImg from "../../../assets/images/imgs/heroimage.svg";
import { motion } from "framer-motion";
import useScrollAnimation from "../../../hooks/useScrollAnimation";

const ImgHero = ({duration}) => {

  const {ref, controls} = useScrollAnimation({duration});
  
  return (
    <motion.img
      initial={{
        opacity: 0,
        y: 10,
      }}
      ref={ref}
      animate={controls}
      className="w-full md:w-1/2 lg:w-[500px]"
      src={HeroImg}
      alt=""
    />
  );
};

export default ImgHero;
