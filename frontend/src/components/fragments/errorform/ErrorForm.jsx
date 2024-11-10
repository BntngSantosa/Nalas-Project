import { ErrorMessage } from "formik";

const ErrorForm = ({ name, component }) => {
  return (
    <ErrorMessage
      name={name}
      component={component}
      className="text-red-500 text-sm"
    />
  );
};

export default ErrorForm;
