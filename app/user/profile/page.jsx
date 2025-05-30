import { Suspense } from "react";
import SelfProfile from "@/app/_components/pages/SelfProfile";
import LoadingProfile from "@/app/_components/LoadingProfile";

export const metadata = {
  title: "Profile",
  description: "User Profile",
};

function Page() {
  return (
    <Suspense fallback={<LoadingProfile />}>
      <SelfProfile />
    </Suspense>
  );
}

export default Page;
