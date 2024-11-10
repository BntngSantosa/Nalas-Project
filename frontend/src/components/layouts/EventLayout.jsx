import React, { useEffect, useState } from "react";
import FooterLayout from "../layouts/FooterLayout";
import FetchEventWb from "../../services/FetchEventWbService";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import imgDecore from "../../assets/images/imgs/8.jpeg";


export default function EventLayout() {
  const [eventWb, setEventWb] = useState([]);

  const fetchEventWb = async () => {
    const data = await FetchEventWb();
    Array.isArray(data)
      ? setEventWb(data)
      : console.error("Data is not an array", data);
  };

  useEffect(() => {
    fetchEventWb();
  }, []);

  const renderEvent = (eventWbs) => {
    return eventWbs.map((item) => {
      return (
        <>
          <Link
            to={`/detail-event/event/${item.id}`}
            key={item.id}
            className="w-full flex-col rounded-lg overflow-hidden relative shadow-lg snap-center group"
          >
            <div className="">
              <img
                src={item.thumbnail}
                alt=""
                className="w-full h-[250px] md:h-[320px] object-cover group-hover:scale-110 transition-all ease-in-out duration-150"
              />
            </div>
            <div className="w-full felx flex-col gap-3 p-3 bg-gradient-to-b from-navyy/0 to-navyy absolute left-0 bottom-0">
              <h1 className="font-openSans font-semibold text-[16px] text-white">
                {item.name}
              </h1>
            </div>
          </Link>
        </>
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
          Event
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
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
          {renderEvent(eventWb)}
        </div>
      </motion.div>
      <FooterLayout />
    </>
  );
}
