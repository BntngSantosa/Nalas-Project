import ProtectedLayout from "../layouts/ProtectedLayout";
import TambahWbLayout from "../layouts/TambahWbLayout";

const TambahWb = () => {
  return (
    <ProtectedLayout>
      <TambahWbLayout paddingTop={24} location={"warisan-budaya"}/>
    </ProtectedLayout>
  );
};

export default TambahWb;
