import BoundingBox from "@/app/_components/BoundingBox";
import Property from "@/app//_components/property_details/Property";
import NavMain from "@/app/_components/NavMain";

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
    </>
  );
}

export default Page;
