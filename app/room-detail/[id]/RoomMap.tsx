"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function ResizeHandler() {
  const map = useMap();
  useEffect(() => {
    const resize = () => map.invalidateSize();
    const timeout = setTimeout(resize, 100);
    window.addEventListener("resize", resize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", resize);
    };
  }, [map]);
  return null;
}

interface RoomMapProps {
  latitude: number;
  longitude: number;
  address?: string;
}

export default function RoomMap({ latitude, longitude, address }: RoomMapProps) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      style={{ width: "100%", height: "400px" }}
    >
      <TileLayer
        attribution="Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
      />

      <Marker position={[latitude, longitude]}>
        <Popup>{address || "Location"}</Popup>
      </Marker>

      <ResizeHandler />
    </MapContainer>
  );
}
