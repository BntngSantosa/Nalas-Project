import {motion} from "framer-motion";
import useScrollAnimation from "../../../hooks/useScrollAnimation";

const CardTopCulture = ({image, titleh1, address, duration}) => {

  const {ref, controls} = useScrollAnimation({duration});
  
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      ref={ref}
      animate={controls}
      className="w-[280px] h-[457px] bg-white shadow-xl rounded-[24px] overflow-hidden flex flex-col justify-between group"
    >
      <img src={image} alt="" className="h-full object-cover opacity-70 group-hover:opacity-100 group-hover:transform group-hover:scale-110 transition-all ease-in-out duration-500" />
      <div className="px-6 py-5 grid grid-cols-1 gap-2 bg-white z-10">
        <h1 className="font-poppins font-medium text-[14px] text-navyy">
          {titleh1}
        </h1>
        <p href="" className="font-poppins text-[13px] text-navyy">
          {address}
        </p>
      </div>
    </motion.div>
  );
};

export default CardTopCulture;