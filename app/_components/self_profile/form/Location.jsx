"use client";
import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

function Location({ activeTab, formData, handleInputChange, setFormData }) {
  // Map functionality
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isBrowser, setIsBrowser] = useState(false);

  // Set isBrowser to true when component mounts in the browser
  useEffect(() => {
    setIsBrowser(true);

    // Cleanup function to destroy the map when component unmounts
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Initialize map when component is visible and in browser environment
  useEffect(() => {
    // Skip if not in browser, tab not active, or map already loaded
    if (!isBrowser || activeTab !== "location" || !mapRef.current || mapLoaded)
      return;

    // Function to initialize map
    const initMap = () => {
      try {
        // Clear any existing map
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }

        // Get default coordinates
        const defaultLat = formData?.latitude || 23.777176;
        const defaultLng = formData?.longitude || 90.399452;

        // Create map with optimized options
        const map = window.L.map(mapRef.current, {
          scrollWheelZoom: true, // Enable scroll zoom
          dragging: true,
          tap: true,
          preferCanvas: false, // Use SVG renderer for better compatibility
          zoomControl: true,
          attributionControl: true,
          maxZoom: 18,
          minZoom: 2,
        }).setView([defaultLat, defaultLng], 13);

        mapInstanceRef.current = map;

        // Add tile layer with better error handling and options
        const tileLayer = window.L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
            minZoom: 2,
            tileSize: 256,
            zoomOffset: 0,
            detectRetina: true,
            crossOrigin: true,
            // Add error handling for tiles
            errorTileUrl:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
          },
        );

        // Add event listeners for tile loading
        tileLayer.on("tileerror", function (error) {
          console.warn("Tile loading error:", error);
        });

        tileLayer.on("tileloadstart", function () {
          // Optional: Add loading indicator
        });

        tileLayer.on("tileload", function () {
          // Tiles loaded successfully
        });

        tileLayer.addTo(map);

        // Create marker if coordinates exist in formData
        if (formData?.latitude && formData?.longitude) {
          const marker = window.L.marker(
            [formData.latitude, formData.longitude],
            {
              draggable: true,
            },
          ).addTo(map);
          markerRef.current = marker;

          setSelectedLocation({
            lat: formData.latitude,
            lng: formData.longitude,
          });

          // Add drag event
          marker.on("dragend", function () {
            const position = marker.getLatLng();

            setFormData((prevState) => ({
              ...prevState,
              latitude: position.lat,
              longitude: position.lng,
            }));

            setSelectedLocation({
              lat: position.lat,
              lng: position.lng,
            });
          });
        }

        // Add click event to map
        map.on("click", function (e) {
          const clickedLocation = {
            lat: e.latlng.lat,
            lng: e.latlng.lng,
          };

          // Update form data with new coordinates
          setFormData((prevState) => ({
            ...prevState,
            latitude: clickedLocation.lat,
            longitude: clickedLocation.lng,
          }));

          setSelectedLocation(clickedLocation);

          // Update or create marker
          if (markerRef.current) {
            markerRef.current.setLatLng(clickedLocation);
          } else {
            const marker = window.L.marker(clickedLocation, {
              draggable: true,
            }).addTo(map);
            markerRef.current = marker;

            // Add drag event
            marker.on("dragend", function () {
              const position = marker.getLatLng();

              setFormData((prevState) => ({
                ...prevState,
                latitude: position.lat,
                longitude: position.lng,
              }));

              setSelectedLocation({
                lat: position.lat,
                lng: position.lng,
              });
            });
          }
        });

        // Position zoom controls
        map.zoomControl.setPosition("bottomright");

        // Add search control
        const searchControl = window.L.control({ position: "topleft" });

        searchControl.onAdd = function () {
          const container = window.L.DomUtil.create(
            "div",
            "leaflet-control leaflet-bar",
          );
          container.style.backgroundColor = "white";
          container.style.padding = "5px";
          container.style.margin = "10px";
          container.style.borderRadius = "4px";
          container.style.boxShadow = "0 1px 5px rgba(0,0,0,0.4)";
          container.style.width = "250px";

          const input = window.L.DomUtil.create(
            "input",
            "search-input",
            container,
          );
          input.type = "text";
          input.placeholder = "Search location...";
          input.style.width = "100%";
          input.style.border = "1px solid #ccc";
          input.style.borderRadius = "4px";
          input.style.padding = "8px";

          // Prevent map clicks when interacting with the search box
          window.L.DomEvent.disableClickPropagation(container);
          window.L.DomEvent.disableScrollPropagation(container);

          // Handle search
          window.L.DomEvent.on(input, "keydown", function (e) {
            if (e.key === "Enter") {
              e.preventDefault();

              const searchValue = input.value;
              if (!searchValue) return;

              // Use OpenStreetMap Nominatim API for search
              fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchValue)}`,
              )
                .then((response) => response.json())
                .then((data) => {
                  if (data && data.length > 0) {
                    const result = data[0];
                    const lat = parseFloat(result.lat);
                    const lng = parseFloat(result.lon);

                    map.setView([lat, lng], 16);

                    // Update form data
                    setFormData((prevState) => ({
                      ...prevState,
                      latitude: lat,
                      longitude: lng,
                    }));

                    setSelectedLocation({ lat, lng });

                    // Update or create marker
                    if (markerRef.current) {
                      markerRef.current.setLatLng([lat, lng]);
                    } else {
                      const marker = window.L.marker([lat, lng], {
                        draggable: true,
                      }).addTo(map);
                      markerRef.current = marker;

                      // Add drag event
                      marker.on("dragend", function () {
                        const position = marker.getLatLng();

                        setFormData((prevState) => ({
                          ...prevState,
                          latitude: position.lat,
                          longitude: position.lng,
                        }));

                        setSelectedLocation({
                          lat: position.lat,
                          lng: position.lng,
                        });
                      });
                    }
                  }
                })
                .catch((error) => {
                  console.error("Error searching location:", error);
                  setError("Error searching for location");
                });
            }
          });

          return container;
        };

        searchControl.addTo(map);

        // Wait for map to be ready and then invalidate size
        map.whenReady(() => {
          setTimeout(() => {
            map.invalidateSize(true);
            setMapLoaded(true);
          }, 100);
        });

        // Force invalidate size after a longer delay to ensure proper rendering
        setTimeout(() => {
          if (map && map.invalidateSize) {
            map.invalidateSize(true);
          }
        }, 500);
      } catch (error) {
        console.error("Error initializing map:", error);
        setError("Failed to initialize map");
        setMapLoaded(true);
      }
    };

    // Load Leaflet dynamically in the browser
    if (isBrowser) {
      if (!window.L) {
        // Load CSS first
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        link.crossOrigin = "";
        document.head.appendChild(link);

        // Then load the script
        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.integrity =
          "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
        script.crossOrigin = "";
        script.onload = () => {
          // Fix default marker icons
          delete window.L.Icon.Default.prototype._getIconUrl;
          window.L.Icon.Default.mergeOptions({
            iconRetinaUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
            iconUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
          });

          setTimeout(initMap, 100);
        };
        script.onerror = () => {
          setError("Failed to load map library");
          setMapLoaded(true);
        };
        document.body.appendChild(script);
      } else {
        // Fix marker icons if Leaflet is already loaded
        delete window.L.Icon.Default.prototype._getIconUrl;
        window.L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        });

        setTimeout(initMap, 100);
      }
    }
  }, [isBrowser, activeTab, formData?.latitude, formData?.longitude]);

  // Reinitialize map when tab becomes active
  useEffect(() => {
    if (
      activeTab === "location" &&
      isBrowser &&
      mapRef.current &&
      mapInstanceRef.current
    ) {
      setTimeout(() => {
        mapInstanceRef.current.invalidateSize(true);
      }, 100);
    }
  }, [activeTab, isBrowser]);

  return (
    <div className={activeTab === "location" ? "block" : "hidden"}>
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city || ""}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Area Name
            </label>
            <input
              type="text"
              name="area_name"
              value={formData.area_name || ""}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Area Code
            </label>
            <input
              type="text"
              name="area_code"
              value={formData.area_code || ""}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Block Name
            </label>
            <input
              type="text"
              name="block_name"
              value={formData.block_name || ""}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Street Name
            </label>
            <input
              type="text"
              name="street_name"
              value={formData.street_name || ""}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              House Name
            </label>
            <input
              type="text"
              name="house_name"
              value={formData.house_name || ""}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              House Number
            </label>
            <input
              type="text"
              name="house_number"
              value={formData.house_number || ""}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Apartment Number
            </label>
            <input
              type="text"
              name="apartment_number"
              value={formData.apartment_number || ""}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Floor Number
            </label>
            <input
              type="text"
              name="floor_number"
              value={formData.floor_number || ""}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="number"
              name="latitude"
              value={formData.latitude || ""}
              onChange={handleInputChange}
              step="0.000001"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="number"
              name="longitude"
              value={formData.longitude || ""}
              onChange={handleInputChange}
              step="0.000001"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="rounded-lg border border-dashed border-gray-300 p-4">
          <div className="space-y-4">
            {/* Map Container */}
            <div className="relative h-96 w-full overflow-hidden rounded-lg border border-gray-300 bg-gray-100">
              {!mapLoaded && isBrowser && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
                    <span className="text-gray-500">Loading map...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-red-50">
                  <div className="rounded-lg bg-white p-4 shadow-lg">
                    <h3 className="text-lg font-bold text-red-600">
                      Error Loading Map
                    </h3>
                    <p className="text-gray-700">{error}</p>
                    <button
                      className="mt-3 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                      onClick={() => {
                        setError(null);
                        setMapLoaded(false);
                      }}
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {/* Map container */}
              <div
                ref={mapRef}
                className="h-full w-full"
                style={{
                  minHeight: "384px",
                  position: "relative",
                }}
              />
            </div>

            {selectedLocation && (
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="flex items-center space-x-2">
                  <MapPin size={20} className="text-blue-600" />
                  <h3 className="font-medium text-blue-800">
                    Selected Location
                  </h3>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Latitude</p>
                    <p className="font-medium">
                      {selectedLocation.lat.toFixed(6)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Longitude</p>
                    <p className="font-medium">
                      {selectedLocation.lng.toFixed(6)}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Click on the map to set location or drag the marker to adjust
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;
