import { faFilm, faMountainSun, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import FetchAllUsers from "../../../services/FetchAllUsers";
import FetchEventWb from "../../../services/FetchEventWbService";
import FetchAllWb from "../../../services/FetchAllWb";
import { Heading } from "@chakra-ui/react";

const StatCard = ({ icon, title, count }) => {
  return (
    <div className="w-full h-40 bg-white shadow-lg shadow-black/20 rounded-lg overflow-hidden p-10 flex flex-col gap-5 justify-between items-start">
      <FontAwesomeIcon icon={icon} className="text-4xl" />
      <div className="w-full flex justify-between items-center">
        <span className="font-poppins font-medium text-sm">
          {title} {count}
        </span>
      </div>
    </div>
  );
}

export default function DashboardLayout() {
  const [users, setUsers] = useState([]);
  const [eventWb, setEventWb] = useState([]);
  const [Wb, setWb] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await FetchAllUsers();
      const eventWbData = await FetchEventWb();
      const WbData = await FetchAllWb();

      setUsers(Array.isArray(userData) ? userData : []);
      setEventWb(Array.isArray(eventWbData) ? eventWbData : []);
      setWb(Array.isArray(WbData) ? WbData : []);
    };
    fetchData();
  }, []);

  return (
    <div className="">
      <Heading size="lg" mb="6">
        Home - Dashboard
      </Heading>
      <div className="w-full flex flex-col justify-between items-center gap-5 md:flex-row">
        <StatCard icon={faUsers} title="User" count={users.length} />
        <StatCard icon={faMountainSun} title="Warisan Budaya" count={Wb.length} />
        <StatCard icon={faFilm} title="Event" count={eventWb.length} />
      </div>
    </div>
  );
}
