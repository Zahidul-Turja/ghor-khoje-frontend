import NavMain from "@/app/_components/NavMain";
import Layout from "@/app/_components/self_profile/Layout";
import BoundingBox from "../BoundingBox";
import ProfileComponent from "@/app/_components/self_profile/ProfileComponent";

function SelfProfile() {
  return (
    <>
      <NavMain />
      <BoundingBox>
        <Layout>
          <ProfileComponent />
        </Layout>
      </BoundingBox>
    </>
  );
}

export default SelfProfile;
