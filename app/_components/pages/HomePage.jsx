"use client";

import { useState } from "react";
import SectionHeader from "@/app/_components/home/SectionHeader";
import SectionProperties from "../home/SectionProperties";
import SectionFeatured from "../home/SectionFeatured";
import Footer from "@/app/_components/Footer";
import BoundingBox from "../BoundingBox";
import NavMain from "../NavMain";
import SectionPartners from "../home/SectionPartners";
import SectionReviews from "../home/SectionReviews";
import LoadingScreen from "@/app/_components/LoadingScreen";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {!isLoading && (
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
      )}
    </>
  );
}
