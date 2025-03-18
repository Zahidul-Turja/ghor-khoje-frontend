import BoundingBox from "@/app/_components/BoundingBox";
import PropertyPage from "@/app/_components/pages/PropertyPage";
import NavMain from "@/app/_components/NavMain";
import Footer from "@/app/_components/Footer";

export const metadata = {
  title: "Property Details",
};

function Page() {
  return (
    <>
      <NavMain />
      <BoundingBox classes="px-52">
        <PropertyPage />
      </BoundingBox>
      <Footer />
    </>
  );
}

export default Page;
