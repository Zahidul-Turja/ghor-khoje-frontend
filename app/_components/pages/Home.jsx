import SectionHeader from "@/app/_components/home/SectionHeader";
import SectionProperties from "../home/SectionProperties";
import Footer from "@/app/_components/Footer";
import BoundingBox from "../BoundingBox";
import NavMain from "../NavMain";

export default function Home() {
  return (
    <>
      <NavMain />
      <BoundingBox>
        <SectionHeader />
        <SectionProperties />
      </BoundingBox>
      <Footer />
    </>
  );
}
