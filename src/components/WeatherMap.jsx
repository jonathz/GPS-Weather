import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import IconMarker from "./IconMarker.jsx";
import DivIcon from "./DivIcon.jsx";
import L from "leaflet";
import petitionFetch from "../petitionFetch.js";

const WeatherMap = ({ location }) => {
  const [temp, setTemp] = useState(center:'',center:'',center:'',center:'',center:'',);
  useEffect(() => {
    petitionFetch(
      `https://corsproxybypass.herokuapp.com/https://api.darksky.net/forecast/88030114c5e47763a011a75e7a10c633/${location.lat}, ${location.lng}`
    ).then((data) => setTemp({center:((data.currently.temperature-32)*5)/9}));
    petitionFetch(
      `https://corsproxybypass.herokuapp.com/https://api.darksky.net/forecast/88030114c5e47763a011a75e7a10c633/${location.lat}, ${location.lng}`
    ).then((data) => setTemp(...temp,{north:((data.currently.temperature-32)*5)/9}));
      console.log(temp);
  }, [location]);
  var centre = L.divIcon({
    className: "leaflet-div-icon2",
    html: `<span>${temp.center?.toFixed(1)}°</span>`,
  });
  var north = L.divIcon({
    className: "leaflet-div-icon2",
    html: `<span>${temp.north?.toFixed(1)}°</span>`,
  });
  var south = L.divIcon({
    className: "leaflet-div-icon2",
    html: `<span>${"sur"}°</span>`,
  });
  var east = L.divIcon({
    className: "leaflet-div-icon2",
    html: `<span>${"east"}°</span>`,
  });
  var west = L.divIcon({
    className: "leaflet-div-icon2",
    html: `<span>${"west"}°</span>`,
  });

  return (
    <>
      <Map center={{ lat: location.lat, lng: location.lng }} zoom={11}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.lat, location.lng]} icon={centre}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker
          position={[parseFloat(location.lat) + 0.1, location.lng]}
          icon={north}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker
          position={[parseFloat(location.lat) - 0.1, location.lng]}
          icon={south}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker
          position={[location.lat, parseFloat(location.lng) - 0.1]}
          icon={west}
        >
          centre
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker
          position={[location.lat, parseFloat(location.lng) + 0.1]}
          icon={east}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    </>
  );
};

export default WeatherMap;
