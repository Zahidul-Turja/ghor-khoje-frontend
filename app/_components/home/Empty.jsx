import { Folders } from "lucide-react";

function Empty() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 py-24">
      <Folders className="h-16 w-16" />
      <h2 className="mt-4 text-center text-2xl font-semibold text-gray-700">
        No properties found
      </h2>
    </div>
  );
}

export default Empty;
