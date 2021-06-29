import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import petitionFetch from "../petitionFetch.js";

const WeatherMap = ({ location }) => {
  const [temp, setTemp] = useState("");
  useEffect(() => {
    petitionFetch(
      `https://corsproxybypass.herokuapp.com/https://api.darksky.net/forecast/88030114c5e47763a011a75e7a10c633/${location.lat}, ${location.lng}`
    ).then((data) =>
      setTemp((((data.currently?.temperature - 32) * 5) / 9).toFixed(1))
    );
  }, [location]);
  var centre = L.divIcon({
    className: "leaflet-div-icon2",
    html: `<span>${temp}°</span>`,
  });

  return (
    <>
      <Map center={{ lat: location.lat, lng: location.lng }} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.lat, location.lng]} icon={centre}></Marker>
      </Map>
      <br />
    </>
  );
};

export default WeatherMap;
