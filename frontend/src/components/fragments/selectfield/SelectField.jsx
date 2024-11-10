import React from "react";
import { Select, Box } from "@chakra-ui/react";
import LabelTambahWb from "../../fragments/labeltambahwb/LabelTambahWb";
import ErrorForm from "../../fragments/errorform/ErrorForm";

const SelectField = ({ label, name, options, setFieldValue, selected }) => (
  <Box className="flex flex-col gap-2">
    <LabelTambahWb>{label}</LabelTambahWb>
    <Select
      css={{
        width: "100%",
        borderRadius: "100px",
        border: "2px solid rgb(24 30 75 / 0.3)",
        outline: "none",
        fontSize: "13px"
      }}
      _focus={{ outline: "none", border: "2px solid #F1A501" }}
      name={name}
      placeholder={`Pilih ${label.toLowerCase()}`}
      onChange={(e) => setFieldValue(name, e.target.value)}
      value={selected}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </Select>
    <ErrorForm name={name} component={"div"} />
  </Box>
);

export default SelectField;
