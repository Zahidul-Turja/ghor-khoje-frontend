import NavMain from "@/app/_components/NavMain";
import Layout from "@/app/_components/self_profile/Layout";
import BoundingBox from "../BoundingBox";

function SelfProfile() {
  return (
    <>
      <NavMain />
      <BoundingBox>
        <Layout>
          <h1>Self Profile</h1>
        </Layout>
      </BoundingBox>
    </>
  );
}

export default SelfProfile;
