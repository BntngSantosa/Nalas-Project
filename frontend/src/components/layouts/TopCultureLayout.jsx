import Title from "../fragments/title/Title";
import CardTopCulture from "../fragments/topcard/CardTopCulture";
import BangkongReang from "../../assets/images/imgs/bangkongreang.jpg";
import CandiMenje from "../../assets/images/imgs/Bojongmenje_1.jpg";
import React from "react";
import Decore from "../../assets/images/accessories/decore.svg";
import { motion } from "framer-motion";

const TopCultureLlayout = () => {
  return (
    <section className="w-full relative p-5 md:p-24 flex flex-col justify-between items-center gap-10">
      <Title
        duration={1}
        titleh3="WARISAN dan BUDAYA"
        titleh1="Warisan Dan Budaya Terpopuler"
      />
      <div className="w-full flex flex-col justify-center md:justify-evenly items-center gap-5 md:flex-row">
        <CardTopCulture
          image={BangkongReang}
          titleh1="Bangkong Reang"
          address="Kecamatan Ciwidey"
        />
        <CardTopCulture
          image={CandiMenje}
          titleh1="Candi Bojong Mneje"
          address="Kecamatan Rancaekek"
        />
        <CardTopCulture
          image={BangkongReang}
          titleh1="Bangkong Reang"
          address="Kecamatan Ciwidey"
        />
      </div>
      <div className="">
        <motion.img
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.5,
              duration: 1.5,
            },
          }}
          src={Decore}
          alt=""
          className="hidden md:block absolute bottom-48 right-[95px] -z-20"
        />
      </div>
    </section>
  );
};

export default TopCultureLlayout;
