import {
  FaBirthdayCake,
  FaIdCard,
  FaGlobe,
  FaTransgender,
} from "react-icons/fa";

function AboutSection({
  bio,
  gender,
  date_of_birth,
  languages,
  preferred_language,
  nid,
}) {
  // Format date of birth
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format languages array
  const formattedLanguages = languages
    ?.split(",")
    .map((lang) => lang.trim().charAt(0).toUpperCase() + lang.trim().slice(1))
    .join(", ");

  return (
    <div className="border-t border-gray-200 py-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">Biography</h2>
      <p className="mb-8 leading-relaxed text-gray-600">{bio}</p>

      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Personal Information
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <FaTransgender className="text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="font-medium text-gray-800">
              {gender.charAt(0) + gender.slice(1).toLowerCase()}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <FaBirthdayCake className="text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium text-gray-800">
              {formatDate(date_of_birth)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <FaIdCard className="text-gray-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">NID</p>
            <p className="font-medium text-gray-800">{nid}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <FaGlobe className="text-gray-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Languages</p>
            <p className="font-medium text-gray-800">{formattedLanguages}</p>
            <p className="mt-1 text-sm text-gray-500">
              Preferred:{" "}
              {preferred_language?.charAt(0).toUpperCase() +
                preferred_language?.slice(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
