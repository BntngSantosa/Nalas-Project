import NavbarLayout from "../layouts/NavbarLayout";
import HeroLayout from "../layouts/HeroLayouts";
import ServiceLayout from "../layouts/ServicesLayout";
import TopCultureLayout from "../layouts/TopCultureLayout";
import FooterLayout from "../layouts/FooterLayout";

const Home = () => {
  return (
    <>
        <HeroLayout/>
        <ServiceLayout/>
        <TopCultureLayout/>
        <FooterLayout/>
    </>
  );
};

export default Home;
