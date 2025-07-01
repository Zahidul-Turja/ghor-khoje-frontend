import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa";

function SocialSection({ social_links }) {
  return (
    <div className="border-t border-gray-200 py-8 dark:border-gray-700">
      <h2 className="mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200">
        Social Media
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {social_links.facebook && (
          <a
            href={social_links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition duration-300 hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="rounded-full bg-white p-1 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
              <FaFacebook className="text-3xl" />
            </div>
            <span className="font-medium">Facebook</span>
          </a>
        )}

        {social_links.twitter && (
          <a
            href={social_links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition duration-300 hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="rounded-full bg-gray-700 p-2 text-white">
              <FaTwitter className="text-lg" />
            </div>
            <span className="font-medium">Twitter</span>
          </a>
        )}

        {social_links.instagram && (
          <a
            href={social_links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition duration-300 hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="rounded-full bg-gray-700 p-2 text-white">
              <FaInstagram />
            </div>
            <span className="font-medium">Instagram</span>
          </a>
        )}

        {social_links.linkedin && (
          <a
            href={social_links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition duration-300 hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="rounded-full bg-gray-700 p-2 text-white">
              <FaLinkedin />
            </div>
            <span className="font-medium">LinkedIn</span>
          </a>
        )}

        {social_links.youtube && (
          <a
            href={social_links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition duration-300 hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="rounded-full bg-gray-700 p-2 text-white">
              <FaYoutube />
            </div>
            <span className="font-medium">YouTube</span>
          </a>
        )}
        {social_links.telegram && (
          <a
            href={social_links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition duration-300 hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="rounded-full bg-gray-700 p-2 text-white">
              <FaTelegramPlane />
            </div>
            <span className="font-medium">Telegram</span>
          </a>
        )}
      </div>
    </div>
  );
}
export default SocialSection;
