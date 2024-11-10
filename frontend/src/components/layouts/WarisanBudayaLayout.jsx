import React, { useEffect, useState } from "react";
import FetchWB from "../../services/FetchWb";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FooterLayout from "../layouts/FooterLayout"
import imgDecore from "../../assets/images/imgs/8.jpeg"

export default function WarisanBudayaLayout() {
  const [wbsByType, setWbsByType] = useState({});
  const types = [
    "Arsitektur",
    "Naskah",
    "Kerajinan Tradisional",
    "Upacara Tradisional",
    "Kesenian Tradisional",
  ];

  const fetchData = async (type) => {
    const data = await FetchWB(type);
    if (Array.isArray(data)) {
      setWbsByType((prev) => ({ ...prev, [type]: data }));
    } else {
      console.error("Data is not an array", data);
    }
  };

  useEffect(() => {
    types.forEach((type) => fetchData(type));
  }, []);

  const renderWb = (wbs) => {
    return wbs.map((item) => {
      return (
        <Link
          to={`/detail-wb/wb/${item.id}`}
          key={item.id}
          className="min-w-[300px] md:min-w-[250px] h-[200px] flex-col rounded-lg overflow-hidden relative shadow-lg snap-center group"
        >
          <div className="">
            <img
              src={item.thumbnail}
              alt=""
              className="w-full h-[200px] object-cover group-hover:scale-110 transition-all ease-in-out duration-150"
            />
          </div>
          <div className="w-full felx flex-col gap-3 p-3 bg-gradient-to-b from-navyy/0 to-navyy absolute left-0 bottom-0">
            <h1 className="font-openSans font-semibold text-[12px] text-white md:text-[14px]">
              {item.name}
            </h1>
            <p className="font-poppins text-[10px] text-white md:text-[12px]">
              Kec. {item.kecamatan}
            </p>
          </div>
        </Link>
      );
    });
  };

  return (
    <>
      <motion.div
        initial={{ x: 10, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {
            delay: 0.5,
            duration: 1,
          },
        }}
        className="w-full h-[150px] mt-24 mb-10 relative"
      >
        <h1 className="font-volkhov font-semibold text-4xl text-white absolute bottom-1/2 translate-y-1/2 left-5 md:left-24 md:text-5xl">
          Warisan Budaya
        </h1>
        <img
          src={imgDecore}
          alt=""
          className="w-full h-full object-cover bg-no-repeat"
        />
      </motion.div>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            delay: 1,
            duration: 1,
          },
        }}
        className="w-full px-5 pb-10 md:px-24"
      >
        {types.map(
          (type) =>
            wbsByType[type] &&
            wbsByType[type].length > 0 && (
              <div key={type} className="mb-5">
                <h1 className="font-poppins font-semibold text-sm mb-3">
                  {type}
                </h1>
                <div className="w-full flex gap-3 overflow-x-scroll no-scrollbar scrollbar whitespace-nowrap snap-proximity snap-x">
                  {renderWb(wbsByType[type])}
                </div>
              </div>
            )
        )}
      </motion.div>
      <FooterLayout />
    </>
  );
}
