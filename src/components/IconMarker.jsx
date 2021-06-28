import defaultMarker from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";

const IconMarker = L.icon({
  iconUrl: defaultMarker,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [25, 35],
  className: "leaflet-venue-icon",
});

export default IconMarker;
