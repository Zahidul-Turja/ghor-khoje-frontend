import { Clock, User } from "lucide-react";

const ConversationList = ({
  conversations,
  selectedConversation,
  onSelectConversation,
  currentUser,
}) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="h-full w-1/3 overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="border-b border-gray-200 p-4 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Conversations
        </h2>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`cursor-pointer p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
              selectedConversation?.id === conversation.id
                ? "border-r-2 border-blue-500 bg-blue-50 dark:bg-gray-800"
                : ""
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {conversation.other_user?.profile_image ? (
                  <img
                    src={conversation.other_user.profile_image}
                    alt={conversation.other_user.full_name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-900">
                    <User
                      size={20}
                      className="text-gray-600 dark:text-gray-200"
                    />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-gray-900 dark:font-semibold dark:text-gray-200">
                    {conversation.other_user?.full_name || "Unknown User"}
                  </p>
                  {conversation.last_message && (
                    <p className="flex items-center text-xs text-gray-500 dark:text-gray-300">
                      <Clock size={12} className="mr-1" />
                      {formatTime(conversation.last_message.created_at)}
                    </p>
                  )}
                </div>

                {conversation.last_message && (
                  <div className="mt-1 flex items-center justify-between">
                    <p className="truncate text-sm text-gray-600 dark:text-gray-300">
                      {conversation.last_message.content}
                    </p>
                    {!conversation.last_message.is_read &&
                      conversation.last_message.sender?.id !==
                        currentUser?.id && (
                        <div className="ml-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                      )}
                  </div>
                )}

                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  {conversation.other_user?.user_type || "User"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {conversations.length === 0 && (
        <div className="p-8 text-center text-gray-500 dark:text-gray-300">
          <p>No conversations yet</p>
        </div>
      )}
    </div>
  );
};

export default ConversationList;
