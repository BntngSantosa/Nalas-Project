import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import FetchUserById from "../../../services/FetchUserById"
import UpdateUserService from "../../../services/UpdateUser";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Box,
} from "@chakra-ui/react";

export default function UpdateUserLayout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({ username: "", email: "" });

  useEffect(() => {
    // Memuat data user berdasarkan id
    const fetchUserData = async () => {
      const userData = await FetchUserById(id);
      if (userData) {
        setInitialValues({
          username: userData.username,
          email: userData.email,
        });
      }
    };
    fetchUserData();
  }, [id]);

  // Validasi menggunakan Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const onSubmit = async (values) => {
    try {
      await UpdateUserService(id, values);
      navigate("/admin/dashboard/user");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Box p={5} maxWidth="400px" mx="auto">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Update User
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Field as={Input} name="username" placeholder="Enter username" />
            <Text color="red.500" fontSize="sm">
              <ErrorMessage name="name" />
            </Text>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Field
              as={Input}
              name="email"
              placeholder="Enter email"
              type="email"
            />
            <Text color="red.500" fontSize="sm">
              <ErrorMessage name="email" />
            </Text>
          </FormControl>

          <Button colorScheme="blue" type="submit" width="full">
            Update
          </Button>
        </Form>
      </Formik>
    </Box>
  );
}
