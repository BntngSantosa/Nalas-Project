import React from "react";
import ErrorForm from "../../fragments/errorform/ErrorForm";

const FileInput = ({
  label,
  name,
  accept,
  multiple,
  setFieldValue,
  preview,
  setPreview,
}) => (
  <div className="grid grid-cols-1 gap-2">
    <label className="font-poppins text-navyy text-sm">{label}</label>
    <input
      className="w-full border-2 border-navyy/30 px-5 py-2 rounded-full outline-orangee text-[13px]"
      type="file"
      name={name}
      accept={accept}
      multiple={multiple}
      onChange={(event) => {
        const files = event.target.files;
        setFieldValue(name, files);
        const previews = Array.from(files).map((file) =>
          URL.createObjectURL(file)
        );
        setPreview(previews);
      }}
    />
    {preview && (
      <div className="mt-2 grid grid-cols-3 gap-2">
        {preview.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Preview ${index}`}
            className="w-20 h-20"
          />
        ))}
      </div>
    )}
    <ErrorForm name={name} component={"div"} />
  </div>
);

export default FileInput;
