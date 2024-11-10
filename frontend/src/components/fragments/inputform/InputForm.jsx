import { Field } from "formik";

const InputForm = ({type, id, name, placeholder}) => {
    return (
      <Field
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="w-full border-2 border-navyy/30 px-5 py-2 rounded-full outline-orangee text-[13px]"
      />
    );
}

export default InputForm;