import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarLayout from "../layouts/NavbarLayout";
import FetchWbById from "../../services/FetchWbById";
import FooterLayout from "../layouts/FooterLayout";
import { Skeleton, SkeletonText, Box } from "@chakra-ui/react";
import getVideoId from "../../utils/GetVideoId";
import Thumbnail from "../fragments/thumbnail/Thumbnail";
import Deskripsi from "../fragments/deskripsi/Deskripsi";
import AlamatLengkap from "../fragments/alamatLengkap/AlamatLengkap";
import Galeri from "../fragments/galeri/Galeri";
import Youtube from "../fragments/youtube/Youtube";

export default function DetailWbLayout() {
  const { id } = useParams();
  const [wb, setWb] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await FetchWbById(id);
      console.log(data);
      setWb(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  // Show skeleton loading while fetching data
  if (loading) {
    return (
      <>
        <NavbarLayout />
        <Box className="w-full px-5 py-10 md:px-24">
          <Skeleton height="200px" />
          <Skeleton height="40px" mt={4} />
          <SkeletonText mt={4} noOfLines={4} spacing="4" />
        </Box>
      </>
    );
  }

  // Check if wb is null and handle it
  if (!wb) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <p className="text-lg">Data not found.</p>
      </div>
    );
  }

  const videoId = getVideoId(wb.youtube);

  return (
    <>
      <Thumbnail
        thumbnail={wb.thumbnail}
        name={wb.name}
        kecamatan={wb.kecamatan}
        kabupaten={wb.kabupaten}
        duration={1.5}
      />
      <div className="w-full px-5 md:px-24">
        <Deskripsi desc={wb.desc} duration={1.5}/>
        <AlamatLengkap address={wb.address} duration={1.5}/>
        <Galeri galeri={wb.galeri} description={wb.desc} duration={1.5}/>
        <Youtube videoId={videoId} duration={1.5}/>
      </div>
      <FooterLayout />
    </>
  );
}
