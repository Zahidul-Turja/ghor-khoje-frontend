import { Construction } from "lucide-react";
import InProgress from "../InProgress";

function BookMarks() {
  return (
    <div className="min-h-screen bg-gradient-to-br sm:px-6">
      <div className="mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Settings</h1>
          <div className="flex gap-2">
            <div className="rounded-full bg-primary/80 p-2 shadow-md">
              <Construction size={20} className="text-white" />
            </div>
          </div>
        </div>

        <InProgress />
      </div>
    </div>
  );
}

export default BookMarks;
