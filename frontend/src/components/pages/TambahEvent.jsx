import TambahEventLayout from "../layouts/TambahEventLayout";
import ProtectedLayout from "../layouts/ProtectedLayout"

const TambahEven = () => {
    return (
        <ProtectedLayout>
            <TambahEventLayout paddingTop={24} location={"/event"}/>
        </ProtectedLayout>
    )
}

export default TambahEven;