"use client";
import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react"; // Added import for MapPin

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
        const defaultLat = formData?.latitude || 40.7128;
        const defaultLng = formData?.longitude || -74.006;

        // Create map with specific options to fix UI issues
        const map = window.L.map(mapRef.current, {
          scrollWheelZoom: false, // Disable scroll to zoom
          dragging: true, // Enable dragging
          tap: false, // Disable tap handler for mobile
          preferCanvas: true, // Use canvas renderer for better performance
        }).setView([defaultLat, defaultLng], 13);

        mapInstanceRef.current = map;

        // Add tile layer with proper z-index handling
        window.L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
            minZoom: 2,
            tileSize: 256,
            zoomOffset: 0,
            updateWhenIdle: true,
            detectRetina: true,
          },
        ).addTo(map);

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

        // Add zoom controls explicitly
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

        // Add custom zoom control buttons
        const zoomInBtn = document.createElement("button");
        zoomInBtn.innerHTML = "+";
        zoomInBtn.className =
          "absolute bottom-4 right-16 rounded-full bg-white p-2 text-xl shadow-md";
        zoomInBtn.style.zIndex = 1000;
        zoomInBtn.onclick = () => map.zoomIn();

        const zoomOutBtn = document.createElement("button");
        zoomOutBtn.innerHTML = "−";
        zoomOutBtn.className =
          "absolute bottom-4 right-4 rounded-full bg-white p-2 text-xl shadow-md";
        zoomOutBtn.style.zIndex = 1000;
        zoomOutBtn.onclick = () => map.zoomOut();

        // Need to append these to the map container after a short delay
        setTimeout(() => {
          const mapContainer = mapRef.current;
          if (mapContainer) {
            mapContainer.style.position = "relative";
            mapContainer.appendChild(zoomInBtn);
            mapContainer.appendChild(zoomOutBtn);
          }
        }, 300);

        // Need to wait for tiles to load and then invalidate size
        map.whenReady(() => {
          setTimeout(() => {
            map.invalidateSize();
            setMapLoaded(true);
          }, 300);
        });
      } catch (error) {
        console.error("Error initializing map:", error);
        setError("Failed to initialize map");
        setMapLoaded(true); // Remove loading indicator
      }
    };

    // Load Leaflet dynamically in the browser
    if (isBrowser) {
      if (!window.L) {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js";
        script.integrity =
          "sha512-BwHfrr4c9kmRkLw6iXFdzcdWV/PGkVgiIyIWLLlTSXzWQzxuSg4DiQUCpauz/EWjgk5TYQqX/kvn9pG1NpYfqg==";
        script.crossOrigin = "anonymous";
        script.onload = initMap;
        script.onerror = () => {
          setError("Failed to load map library");
          setMapLoaded(true);
        };
        document.body.appendChild(script);
      } else {
        initMap();
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
        mapInstanceRef.current.invalidateSize();
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
            {/* Map Container with explicit size and position */}
            <div className="relative h-96 w-full rounded-lg border border-gray-300 bg-gray-100 shadow-inner">
              {/* Load Leaflet CSS explicitly inline to avoid dependency issues */}
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                .leaflet-container {
                  width: 100% !important;
                  height: 100% !important;
                  z-index: 1;
                  position: absolute !important;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;            
                }
                .leaflet-tile-container img {
                  width: 256px !important;
                  height: 256px !important;
                }
                .leaflet-control-container {
                  z-index: 2;
                }
              `,
                }}
              />

              {!mapLoaded && isBrowser && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white bg-opacity-70">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
                    <span className="text-gray-500">Loading map...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-red-50 bg-opacity-80">
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

              {/* Map container with explicit full dimensions */}
              <div
                ref={mapRef}
                className="absolute inset-0 h-full w-full"
                style={{
                  zIndex: 10,
                }}
              ></div>
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
