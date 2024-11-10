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

  useEffect(() => {
    const fetchData = async () => {
      const userData = await FetchAllUsers();
      setUsers(Array.isArray(userData) ? userData : []);
    };
    fetchData();
  }, []);

  // Menghitung data untuk halaman saat ini
  const paginatedUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(users.length / pageSize);

  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleDelete = async (userId) => {
    try {
      await DeleteData(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
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
                      onClick={() => handleDelete(user.id)}
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
