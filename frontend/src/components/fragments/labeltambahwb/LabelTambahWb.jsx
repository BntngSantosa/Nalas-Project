const LabelTambahWb = ({htmlFor, children}) => {
  return (
    <label htmlFor={htmlFor} className="font-poppins text-navyy text-sm">
      {children}
    </label>
  );
};

export default LabelTambahWb;
