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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import FetchAllWb from "../../../services/FetchAllWb";
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

export default function WbDataLyout() {
  const [wb, setWb] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const toast = useToast();
  const pageSize = 5;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const cancelRef = React.useRef();

  useEffect(() => {
    const fetchData = async () => {
      const wbData = await FetchAllWb();
      setWb(Array.isArray(wbData) ? wbData : []);
    };
    fetchData();
  }, []);

  const handleUpdateStatusApproved = async (id, location = "wb") => {
    try {
      const updatedData = await UpdateStatusApproved(id, location);
      setWb((prevWb) =>
        prevWb.map((item) =>
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

  const handleUpdateStatusRejected = async (id, location = "wb") => {
    try {
      const updatedData = await UpdateStatusRejected(id, location);
      setWb((prevWb) =>
        prevWb.map((item) =>
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

  const handleDelete = async () => {
    try {
      await DeleteWb(selectedId, "wb");
      setEventWb((prevWb) => prevWb.filter((wb) => wb.id !== selectedId));
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

  const paginatedWb = wb.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(wb.length / pageSize);

  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <Stack width="full" gap="5">
      <Heading size="lg" mb="6">
        Home - Data Warisan Budaya
      </Heading>
      <Link
        to={"/admin/dashboard/wb/tambah"}
        className="flex-1 bg-orangee text-white w-[214px] p-3 rounded-lg shadow-md shadow-orangee/30"
      >
        <FontAwesomeIcon icon={faPlus} /> Tambah Warisan Budaya
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
              <Th>Kategori</Th>
              <Th>Tipe</Th>
              <Th>Kecamatan</Th>
              <Th>Kabupaten</Th>
              <Th>Alamat lengkap</Th>
              <Th>Youtube</Th>
              <Th>Thumbnail</Th>
              <Th>Galeri</Th>
              <Th>Status</Th>
              <Th>Approvals</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedWb.map((wb) => (
              <Tr key={wb.id}>
                <Td>{wb.name}</Td>
                <Td>{wb.desc.slice(0, 50)}...</Td>
                <Td>{wb.category}</Td>
                <Td>{wb.type}</Td>
                <Td>{wb.kecamatan}</Td>
                <Td>{wb.kabupaten}</Td>
                <Td>{wb.address}</Td>
                <Td>{wb.youtube}</Td>
                <Td>
                  <img src={wb.thumbnail} alt="" />
                </Td>
                <Td>
                  <div className="grid grid-cols-1 gap-3 place-content-center">
                    {Array.isArray(wb.galeri) &&
                      wb.galeri.map((item) => (
                        <img key={item.id} src={item.url} className="w-full" />
                      ))}
                  </div>
                </Td>
                <Td>{wb.status}</Td>
                <Td textAlign="center">
                  <HStack justify="center">
                    <Button
                      colorScheme="blue"
                      size="md"
                      onClick={() => handleUpdateStatusApproved(wb.id)}
                      disabled={
                        wb.status == "APPROVED" || wb.status === "REJECTED"
                      }
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </Button>
                    <Button
                      colorScheme="red"
                      size="md"
                      onClick={() => handleUpdateStatusRejected(wb.id)}
                      disabled={
                        wb.status == "APPROVED" || wb.status === "REJECTED"
                      }
                    >
                      <FontAwesomeIcon icon={faX} />
                    </Button>
                  </HStack>
                </Td>
                <Td textAlign="center">
                  <HStack spacing="2">
                    <Link
                      to={`/admin/dashboard/wb/update/${wb.id}`}
                      className="px-[16px] py-[10px] bg-lightbluee rounded-lg font-semibold text-white"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                    <Button
                      colorScheme="red"
                      size="md"
                      onClick={() => {
                        setSelectedId(wb.id);
                        setIsOpen(true);
                      }}
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
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Konfirmasi Hapus
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak
              dapat dibatalkan.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Batal
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Hapus
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Stack>
  );
}
