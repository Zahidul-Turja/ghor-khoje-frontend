import { GrMapLocation } from "react-icons/gr";
import Reviews from "./Reviews";
import Listings from "./Listings";

function ProfileDescription({ host }) {
  return (
    <div className="">
      <h2 className="text-2xl font-bold">About {host?.full_name}</h2>

      <div className="my-6 flex items-center gap-2">
        <GrMapLocation />{" "}
        <span className="text-sm">Lives in {host?.address?.address}</span>
      </div>

      <p className="text-justify text-sm font-medium tracking-wider">
        {host?.bio}
      </p>

      <Reviews reviews={host?.reviews} name={host?.full_name} />

      <Listings properties={host?.hosted_places} />
    </div>
  );
}

export default ProfileDescription;
