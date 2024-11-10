import bgfixed from "../../../assets/images/imgs/slogan.svg";

const BgFixed = () => {
  return (
    <div
      className="w-full h-screen bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgfixed})` }}
    ></div>
  );
};

export default BgFixed;
