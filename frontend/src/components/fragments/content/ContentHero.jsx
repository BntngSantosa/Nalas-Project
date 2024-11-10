import { motion } from "framer-motion";
import useScrollAnimation from "../../../hooks/useScrollAnimation";

const ContentHero = ({duration}) => {
  const { ref, controls } = useScrollAnimation(duration);
  return (
    <>
      <motion.h3
        ref={ref}
        animate={controls}
        initial={{
          opacity: 0,
          y: 10,
        }}
        className="text-pinkk font-bold font-poppins text-md md:text-lg"
      >
        Warisan sunda jembarna taya dua
      </motion.h3>
      <motion.h1
        ref={ref}
        animate={controls}
        initial={{
          opacity: 0,
          y: 10,
        }}
        className="text-navyy font-bold font-volkhov text-3xl lg:text-6xl"
      >
        Jelajahi dan lestarikan warisan budaya
      </motion.h1>
      <motion.p
        ref={ref}
        animate={controls}
        initial={{
          opacity: 0,
          y: 10,
        }}
        className="text-purplee font-poppins text-sm lg:text-[16px]"
      >
        Warisan budaya yang megah terus menginspirasi kekaguman, meski terkadang
        dibayangi oleh kebanggaan berlebih. Mereka lebih memilih melestarikan
        tradisi, terhanyut dalam cerita dan musik leluhur. Pintu gerbang cagar
        budaya dijaga ketat, usaha keras dilakukan untuk mempertahankannya bagi
        generasi mendatang
      </motion.p>
    </>
  );
};

export default ContentHero;
