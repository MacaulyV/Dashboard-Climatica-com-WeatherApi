import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { motion } from "framer-motion";

interface MapProps {
  center: { lat: number; lng: number };
}

const GoogleMaps: React.FC<MapProps> = ({ center }) => {
  const containerStyle = {
    borderRadius: "25px",
    border: "2px solid #3e0078",
    width: "100%",
    height: "300px",
    position: "relative",
    marginLeft: "-8.5%",
    marginTop: "-0.0%",
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDNYUl1UjVcOS6FJXyrQn7yh2-PIPnWDRA">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <GoogleMap mapContainerStyle={containerStyle} zoom={10} center={center}>
          <Marker position={center} />
        </GoogleMap>
      </motion.div>
    </LoadScript>
  );
};

export default GoogleMaps;
