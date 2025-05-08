import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

function ContactSection({ address, phone, email }) {
  return (
    <div className="border-t border-gray-200 py-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Contact Information
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <FaEnvelope className="text-gray-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-800">{email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <FaPhone className="text-gray-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium text-gray-800">{phone}</p>
          </div>
        </div>
      </div>

      <h2 className="mb-4 mt-8 text-xl font-semibold text-gray-800">Address</h2>
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <FaMapMarkerAlt className="text-gray-700" />
          </div>
          <div>
            <p className="font-medium text-gray-800">{address.address}</p>
            <p className="mt-1 text-gray-600">
              {address.city}, {address.state}, {address.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
