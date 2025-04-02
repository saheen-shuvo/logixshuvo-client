/* eslint-disable react/prop-types */
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ latitude, longitude, deliveryAddress }) => {
  const [open, setOpen] = useState(false);

  // Convert latitude and longitude to float
  const position = [parseFloat(latitude), parseFloat(longitude)];

  return (
    <div>
      <button
        className="bg-blue-500 text-white btn btn-xs sm:w-16"
        onClick={() => setOpen(true)}
      >
        Map
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg relative w-[90%] h-[90%]">
            <button
              className="absolute top-2 right-2 text-black btn"
              onClick={() => setOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-lg font-bold mb-2">Delivery Location</h2>
            <div className="w-full h-full">
              <MapContainer
                center={position}
                zoom={13}
                className="w-full h-[90%] p-4"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                  <Popup>{deliveryAddress}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
