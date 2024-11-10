const FormTitle = ({titleh1, titleh2}) => {
    return (
      <div className="grid grid-cols-1 gap-2">
        <h1 className="font-volkhov font-semibold text-navyy text-xl">
          {titleh1}
        </h1>
        <h2 className="font-poppins text-navyy text-sm">{titleh2}</h2>
      </div>
    );
}

export default FormTitle;