import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const FooterItems = () => {
  return (
    <>
      <div className="w-full flex gap-5 md:gap-20">
        <div className="flex flex-col gap-3 w-[40%]  md:w-[30%]">
          <h2 className="font-poppins font-semibold text-navyy text-xs md:text-[14px]">
            Alamat
          </h2>
          <p className="font-poppins text-navyy text-[10px] md:text-[14px]">
            Jl. Raya Soreang Km.17 Komplek Pemda Soreang 40912,Kabupaten
            Bandung, Jawa Barat,Indonesia
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-poppins font-semibold text-navyy text-xs md:text-[14px]">
            Social Media
          </h2>
          <div className="w-full flex gap-3">
            <a target="_blank" href="https://www.facebook.com/bandungpemkab">
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-navyy text-sm md:text-xl"
              />
            </a>
            <a target="_blank" href="https://instagram.com/bandungpemkab">
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-navyy text-sm md:text-xl"
              />
            </a>
            <a target="_blank" href="https://twitter.com/bandungpemkab">
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-navyy text-sm md:text-xl"
              />
            </a>
            <a target="_blank" href="https://bandungkab.go.id/UCfI5MVFVHuKqiwemQPesKcg">
              <FontAwesomeIcon
                icon={faYoutube}
                className="text-navyy text-sm md:text-xl"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-poppins font-semibold text-navyy text-xs md:text-[14px]">
            Kontak
          </h2>
          <p className="font-poppins  text-navyy text-[10px] md:text-[14px]">
            {" "}
            Telp 022 5892244{" "}
          </p>
        </div>
      </div>
      
    </>
  );
};

export default FooterItems;
