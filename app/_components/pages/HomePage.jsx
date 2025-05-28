import SectionHeader from "@/app/_components/home/SectionHeader";
import SectionProperties from "../home/SectionProperties";
import SectionFeatured from "../home/SectionFeatured";
import Footer from "@/app/_components/Footer";
import BoundingBox from "../BoundingBox";
import NavMain from "../NavMain";
import SectionPartners from "../home/SectionPartners";
import SectionReviews from "../home/SectionReviews";

export default function HomePage() {
  return (
    <>
      <NavMain />
      <BoundingBox>
        <SectionHeader />
        <SectionFeatured />
        <SectionProperties />
        <SectionReviews />
        <SectionPartners />
      </BoundingBox>
      <Footer />
    </>
  );
}
