import ButtonAdd from "../buttonadd/ButtonAdd";
import useScrollAnimation from "../../../hooks/useScrollAnimation";
import { motion } from "framer-motion";

const ContentKab = ({ paragraph, fontSpan, duration }) => {
  const { ref, controls } = useScrollAnimation({ duration });

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        ref={ref}
        animate={controls}
        className="grid grid-cols-1 gap-5"
      >
        <p className="font-poppins text-navyy text-sm lg:text-lg">
          <span className="font-semibold text-lg lg:text-2xl">{fontSpan}</span>{" "}
          {paragraph}
        </p>
        <ButtonAdd
          children={"Selengkapnya"}
          linkTo={"https://bandungkab.go.id/info"}
        />
      </motion.div>
    </>
  );
};

export default ContentKab;
