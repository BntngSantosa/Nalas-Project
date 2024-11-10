import {
  faBook,
  faHandshake,
  faCompactDisc,
} from "@fortawesome/free-solid-svg-icons";
import Card from "../fragments/card/Card";
import Title from "../fragments/title/Title";
import AccessoriesOne from "../fragments/accessories/AccessoriesOne";

const ServiceLayout = () => {

  const paragraphs = [
    "kumpulan informasi yang disimpan secara sistematis untuk keperluan dokumentasi, referensi, dan pelestarian",
    "Aplikasi yang user friendly dirancang dengan antarmuka sederhana dan intuitif, memudahkan pengguna untuk mengoperasikannya.",
    "User-generated content adalah konten yang dibuat dan dibagikan oleh pengguna secara sukarela, seperti ulasan, foto atau video.",
  ];

  const colors = ["#FF946D", "#F1A501", "#747DEF"];

  return (
    <section className="w-full relative p-5 md:px-24 flex flex-col justify-between items-center gap-10">
      <Title duration={1} titleh3="KATEGORI" titleh1="Pelayanan Terbaik Kami"/>
      <div className="w-full flex flex-col justify-center md:justify-evenly items-center gap-5 md:flex-row">
        <Card duration={1}
          icon={faBook}
          color={colors[0]}
          titleh1={"Arsip"}
          paragraph={paragraphs[0]}
        />
        <Card duration={1}
          icon={faHandshake}
          color={colors[2]}
          titleh1={"User friendly"}
          paragraph={paragraphs[1]}
        />
        <Card duration={1}
          icon={faCompactDisc}
          color={colors[1]}
          titleh1={"User Generate Content"}
          paragraph={paragraphs[2]}
        />
      </div>
      <div className="hidden md:block absolute right-0">
        <AccessoriesOne />
      </div>
    </section>
  );
};

export default ServiceLayout;
