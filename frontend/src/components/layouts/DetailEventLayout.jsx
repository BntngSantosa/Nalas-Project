import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FooterLayout from "../layouts/FooterLayout";
import { Skeleton, SkeletonText, Box } from "@chakra-ui/react";
import Thumbnail from "../fragments/thumbnail/Thumbnail";
import Deskripsi from "../fragments/deskripsi/Deskripsi";
import AlamatLengkap from "../fragments/alamatLengkap/AlamatLengkap";
import FetchEventById from "../../services/FetchEventById";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function DetailEventLayout() {
  const { id } = useParams();
  const [eventWb, setEventWb] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await FetchEventById(id);
      console.log(data);
      setEventWb(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  // Show skeleton loading while fetching data
  if (loading) {
    return (
      <>
        <Box className="w-full px-5 py-10 md:px-24">
          <Skeleton height="200px" />
          <Skeleton height="40px" mt={4} />
          <SkeletonText mt={4} noOfLines={4} spacing="4" />
        </Box>
      </>
    );
  }

  // Check if eventWb is null and handle it
  if (!eventWb) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <p className="text-lg">Data not found.</p>
      </div>
    );
  }

  return (
    <>
      <Thumbnail
        thumbnail={eventWb.thumbnail}
        name={eventWb.name}
        duration={1.5}
      />
      <div className="w-full px-5 md:px-24">
        <Deskripsi desc={eventWb.desc} duration={1.5} />
        <AlamatLengkap address={eventWb.address} duration={1.5} />
        <div className="">
          <h1 className="font-openSans font-semibold text-sm mb-3 sm:text-[16px] md:text-lg lg:text-2xl">
            Kontak
          </h1>
          <div className="flex gap-3 items-center mb-5">
            <FontAwesomeIcon icon={faWhatsapp} className=" md:text-2xl" />
            {" "} <span>{eventWb.call}</span>
          </div>
          <div className="flex gap-3 items-center mb-10">
            <FontAwesomeIcon icon={faEnvelope} className="md:text-2xl" />
            {" "} <span>{eventWb.email}</span>
          </div>
        </div>
      </div>
      <FooterLayout />
    </>
  );
}
