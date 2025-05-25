import { Suspense } from "react";
import SelfProfile from "@/app/_components/pages/SelfProfile";

export const metadata = {
  title: "Profile",
  description: "User Profile",
};

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SelfProfile />
    </Suspense>
  );
}

export default Page;
