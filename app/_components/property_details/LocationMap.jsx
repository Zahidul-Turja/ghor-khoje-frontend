"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

function LocationMap({ lat, lng }) {
  useEffect(() => {
    // Fix for marker icons
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  // Function to open location in Google Maps
  const openInGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="space-y-4">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        {/* OpenStreetMap Tile Layer (Free) */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]}>
          <Popup>
            Location: {lat}, {lng}
          </Popup>
        </Marker>
      </MapContainer>

      <button
        onClick={openInGoogleMaps}
        className="mt-4 cursor-pointer rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold"
      >
        <span>Open in Google Maps</span>
      </button>
    </div>
  );
}

export default LocationMap;
