"use client";

import { MdMarkChatUnread } from "react-icons/md";
import { Tooltip } from "react-tooltip";

function ChatIcon({ sender, reciever }) {
  return (
    <>
      <div className="tooltip-chat fixed bottom-12 right-20 z-[1000] cursor-pointer rounded-full bg-primary p-3 text-white shadow-lg transition hover:scale-110">
        <MdMarkChatUnread className="text-2xl" />
      </div>

      <Tooltip
        anchorSelect=".tooltip-chat"
        place="left"
        className="tooltip !rounded-xl !border !border-gray-200 !bg-white !p-0 !shadow-xl transition-all"
      >
        <div className="flex w-48 flex-col items-center p-4">
          <p className="mb-2 text-sm font-medium text-gray-700">
            Chat with the host
          </p>
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gray-300">
            <img
              src="/profile-1.jpg"
              alt="Host Profile"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <p className="mt-2 text-sm font-semibold text-gray-800">John Doe</p>
        </div>
      </Tooltip>
    </>
  );
}

export default ChatIcon;
