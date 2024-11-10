import ContentHero from "../fragments/content/ContentHero";
import ImgHero from "../fragments/imagehero/ImgHero";

const HeroLayout = () => {
  return (
    <section id="#Hero" className="w-full px-5 pt-24 pb-5 flex flex-col justify-between items-center gap-5 md:flex-row md:px-24">
      <div className="w-full md:w-1/2 flex flex-col items-start gap-3">
        <ContentHero duration={1}/>
      </div>
      <ImgHero duration={2}/>
    </section>
  );
};

export default HeroLayout;
