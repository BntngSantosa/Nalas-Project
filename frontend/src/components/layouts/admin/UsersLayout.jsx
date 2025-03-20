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
import FetchAllUsers from "../../../services/FetchAllUsers";
import { Link } from "react-router-dom";
import DeleteData from "../../../services/DeleteData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCaretRight,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const toast = useToast();
  const pageSize = 5;

  // State untuk AlertDialog
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const cancelRef = React.useRef();

  useEffect(() => {
    const fetchData = async () => {
      const userData = await FetchAllUsers();
      setUsers(Array.isArray(userData) ? userData : []);
    };
    fetchData();
  }, []);

  const paginatedUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(users.length / pageSize);

  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Fungsi untuk membuka dialog
  const confirmDelete = (userId) => {
    setSelectedUserId(userId);
    setIsOpen(true);
  };

  // Fungsi untuk menghapus user setelah konfirmasi
  const handleDelete = async () => {
    try {
      await DeleteData(selectedUserId);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedUserId)
      );
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
    } finally {
      setIsOpen(false);
      setSelectedUserId(null);
    }
  };

  return (
    <Stack width="full" gap="5">
      <Heading size="lg" mb="6">
        Home - Data User
      </Heading>
      <Link
        to={"/admin/dashboard/user/tambah"}
        className="flex-1 bg-orangee text-white w-[134px] p-3 rounded-lg shadow-md shadow-orangee/30"
      >
        <FontAwesomeIcon icon={faPlus} /> Tambah User
      </Link>
      <Box
        maxHeight="400px"
        maxWidth="1230px"
        overflowY="auto"
        className="scrollbar"
      >
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedUsers.map((user) => (
              <Tr key={user.id}>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                <Td textAlign="center">
                  <HStack spacing="2">
                    <Link
                      to={`/admin/dashboard/user/update/${user.id}`}
                      className="px-[16px] py-[10px] bg-lightbluee rounded-lg font-semibold text-white"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                    <Button
                      colorScheme="red"
                      size="md"
                      onClick={() => confirmDelete(user.id)}
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

      {/* Alert Dialog Konfirmasi Hapus */}
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
              Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak
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
