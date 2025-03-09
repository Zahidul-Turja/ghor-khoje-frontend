import SectionHeader from "@/app/_components/home/SectionHeader";
import SectionProperties from "../home/SectionProperties";
import Footer from "@/app/_components/Footer";
import BoundingBox from "../BoundingBox";

export default function Home() {
  return (
    <>
      <BoundingBox>
        <SectionHeader />
        <SectionProperties />
      </BoundingBox>
      <Footer />
    </>
  );
}
