import SectionHeader from "@/app/_components/home/SectionHeader";
import SectionProperties from "../home/SectionProperties";
import Footer from "@/app/_components/Footer";

export default function Home() {
  return (
    <>
      <div className="px-16">
        <SectionHeader />
        <SectionProperties />
      </div>
      <Footer />
    </>
  );
}
