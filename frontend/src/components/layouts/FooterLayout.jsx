import BgFixed from "../fragments/bgfixed/BgFixed";
import LogoInstansi from "../fragments/logoinstansi/LogoInstansi";
import FooterItems from "../fragments/alamat/FooterItems";

const FooterLayout = () => {
  return (
    <>
      <footer className="w-full mt-10 p-5  md:px-24 flex flex-col justify gap-5">
        <LogoInstansi />
        <div className="w-full h-[1px] bg-navyy"></div>
        <FooterItems />
      </footer>
      <div className="p-5 md:p-8">
        <p className="font-poppins font-medium text-orangee text-[10px] md:text-[12px] text-center">
          {" "}
          Copyright @ 2024 Kabupaten Bandung - Diskominfo
        </p>
      </div>
      <BgFixed />
    </>
  );
};

export default FooterLayout;
