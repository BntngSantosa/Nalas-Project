import React, { useEffect, useState } from "react";
import {
  Stack,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  HStack,
  useToast,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DeleteWb from "../../../services/DeleteWb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faPen,
  faTrash,
  faPlus,
  faX,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import UpdateStatusApproved from "../../../services/UpdateStatusApproved";
import UpdateStatusRejected from "../../../services/UpdateStatusRejected";
import FetchAllEvent from "../../../services/FetchAllEvent";

export default function EventDataLayout() {
  const [eventWb, setEventWb] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const toast = useToast();
  const pageSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      const eventData = await FetchAllEvent();
      setEventWb(Array.isArray(eventData) ? eventData : []);
    };
    fetchData();
  }, []);

  const handleUpdateStatusApproved = async (id, location = "event") => {
    try {
      const updatedData = await UpdateStatusApproved(id, location);
      setEventWb((prevEventWb) =>
        prevEventWb.map((item) =>
          item.id === id ? { ...item, status: updatedData.data.status } : item
        )
      );
      toast({
        title: "Status berhasil diupdate",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      toast({
        title: "Status gagal diupdate.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const handleUpdateStatusRejected = async (id, location = "event") => {
    try {
      const updatedData = await UpdateStatusRejected(id, location);
      setEventWb((prevEventWb) =>
        prevEventWb.map((item) =>
          item.id === id ? { ...item, status: updatedData.data.status } : item
        )
      );
      toast({
        title: "Status berhasil diupdate",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      toast({
        title: "Status gagal diupdate.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const handleDelete = async (wbId, location = "event") => {
    try {
      await DeleteWb(wbId, location);
      setEventWb((prevEventWb) => prevEventWb.filter((eventWb) => eventWb.id !== wbId));
      toast({
        title: "Data berhasil dihapus.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      toast({
        title: "Data gagal dihapus.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const paginatedWb = eventWb.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(eventWb.length / pageSize);

  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <Stack width="full" gap="5">
      <Heading size="lg" mb="6">
        Home - Data Event
      </Heading>
      <Link
        to={"/admin/dashboard/eventWb/tambah"}
        className="flex-1 bg-orangee text-white w-[141px] p-3 rounded-lg shadow-md shadow-orangee/30"
      >
        <FontAwesomeIcon icon={faPlus} /> Tambah Event
      </Link>

      <Box
        maxHeight="400px"
        maxWidth="1230px"
        overflowY="auto"
        className="scrollbar"
      >
        <Table variant="simple" size="md" maxW="xl">
          <Thead>
            <Tr>
              <Th>Nama</Th>
              <Th>Deskripsi</Th>
              <Th>Alamat lengkap</Th>
              <Th>No Telepon</Th>
              <Th>Email</Th>
              <Th>Tanggal</Th>
              <Th>Thumbnail</Th>
              <Th>Status</Th>
              <Th>Approvals</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedWb.map((eventWb) => (
              <Tr key={eventWb.id}>
                <Td>{eventWb.name}</Td>
                <Td>{eventWb.desc.slice(0, 50)}...</Td>
                <Td>{eventWb.address}</Td>
                <Td>{eventWb.call}</Td>
                <Td>{eventWb.email}</Td>
                <Td>{new Date(eventWb.date).toISOString().split("T")[0]}</Td>
                <Td>
                  <img src={eventWb.thumbnail} alt="" />
                </Td>
                <Td>{eventWb.status}</Td>
                <Td textAlign="center">
                  <HStack justify="center">
                    <Button
                      colorScheme="blue"
                      size="md"
                      onClick={() => handleUpdateStatusApproved(eventWb.id)}
                      disabled={
                        eventWb.status == "APPROVED" ||
                        eventWb.status === "REJECTED"
                      }
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </Button>
                    <Button
                      colorScheme="red"
                      size="md"
                      onClick={() => handleUpdateStatusRejected(eventWb.id)}
                      disabled={
                        eventWb.status == "APPROVED" ||
                        eventWb.status === "REJECTED"
                      }
                    >
                      <FontAwesomeIcon icon={faX} />
                    </Button>
                  </HStack>
                </Td>
                <Td textAlign="center">
                  <HStack spacing="2">
                    <Link
                      to={`/admin/dashboard/eventWb/update/${eventWb.id}`}
                      className="px-[16px] py-[10px] bg-lightbluee rounded-lg font-semibold text-white"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                    <Button
                      colorScheme="red"
                      size="md"
                      onClick={() => handleDelete(eventWb.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <HStack justify="center" mt="4">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <FontAwesomeIcon icon={faCaretRight} />
        </Button>
      </HStack>
    </Stack>
  );
}
