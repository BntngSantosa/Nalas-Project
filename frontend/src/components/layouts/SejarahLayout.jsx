import KabBandung from "../../assets/images/imgs/kabbandung.jpg";
import Title from "../fragments/title/Title";
import ImageSejarah from "../fragments/imgsejarah/ImageSejarah";
import ContentKab from "../fragments/contentkab/ContentKab";

const SejarahLayout = () => {

  const paragraph = "lahir melalui Piagam Sultan Agung Mataram, yaitu pada Songo tahun Alif bulan Muharam atau sama dengan hari sabtu tanggal 20 April tahun 1641 M, sebagai Bupati Pertama pada waktu adalah Tumenggung Wiraangunangun (1641-1681 M). dari bukti tersebut maka ditetapkan bahwa tanggal 20 April sebagai tanggal Jadi Kabupaten Bandung.";

  return (
    <>
      <section className="w-full px-5 pb-10 pt-24 md:px-24">
        <div className="w-full">
          <Title duration={1} titleh3={"Sejarah"} titleh1={"Singkat Sejarah"} />
          <div
            className="mt-10 w-full flex flex-col gap-5 md:flex-row md:gap-10 justify-between items-center"
          >
            <ImageSejarah duration={1.5} ImgKabBandung={KabBandung} />
            <ContentKab duration={1.5} paragraph={paragraph} fontSpan={"Kabupaten Bandung"}/>
          </div>
        </div>
      </section>
    </>
  );
};

export default SejarahLayout;
