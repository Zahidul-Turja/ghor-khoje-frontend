"use client";

import NavMain from "@/app/_components/NavMain";
import Layout from "@/app/_components/self_profile/Layout";
import BoundingBox from "../BoundingBox";
import ProfileComponent from "@/app/_components/self_profile/ProfileComponent";
import { useSearchParams } from "next/navigation";
import Dashboard from "../self_profile/Dashboard";

function SelfProfile() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  return (
    <>
      <NavMain />
      <BoundingBox>
        <Layout>
          {section === "profile" && <ProfileComponent />}
          {section === "dashboard" && <Dashboard />}
        </Layout>
      </BoundingBox>
    </>
  );
}

export default SelfProfile;
