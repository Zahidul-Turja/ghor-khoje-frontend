import BoundingBox from "@/app/_components/BoundingBox";
import NavMain from "@/app/_components/NavMain";
import UserHostPage from "@/app/_components/pages/UserHostPage";

export const metadata = {
  title: "Host Profile",
};

function Page() {
  return (
    <>
      <NavMain classes={"border-b border-gray-200 "} />
      <BoundingBox classes="px-64">
        <UserHostPage />
      </BoundingBox>
    </>
  );
}

export default Page;
