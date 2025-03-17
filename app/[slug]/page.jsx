import BoundingBox from "@/app/_components/BoundingBox";
import Property from "@/app/_components/pages/Property";
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
        <Property />
      </BoundingBox>
      <Footer />
    </>
  );
}

export default Page;
