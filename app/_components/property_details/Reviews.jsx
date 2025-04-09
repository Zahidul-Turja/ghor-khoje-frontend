import Image from "next/image";
import { FaStar } from "react-icons/fa";

function Reviews() {
  return (
    <div className="grid grid-cols-2 gap-8 border-t border-gray-200">
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
    </div>
  );
}

export default Reviews;

function ReviewCard() {
  return (
    <div className="">
      <div className="flex items-center gap-4 p-4">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={"/profile-1.jpg"}
            alt="Host Profile"
            width={60}
            height={60}
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-bold">John Doe</h3>
          <p className="text-xs">5 days ago</p>
        </div>
      </div>
      <div className="flex items-center gap-2 px-4">
        <div className="flex text-xs">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <span className="text-sm font-semibold text-gray-700">4.83</span>
      </div>
      <p className="p-4 text-xs font-semibold">
        t is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English.{" "}
      </p>
    </div>
  );
}
