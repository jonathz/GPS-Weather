import React, { useState } from "react";
import "./App.css";
import CityConditions from "./components/CityConditions";
import NavBar from "./components/NavBar";
import WeatherMap from "./components/WeatherMap";
import WeekConditions from "./components/WeekConditions.jsx";

function App() {
  const [city, setCity] = useState({
    lat: "4.605575533040425",
    lng: "-74.10191003067288",
  });
  return (
    <div className="App">
      <NavBar setLocation={setCity} />
      <CityConditions location={city} />
      <WeatherMap location={city} />
      <WeekConditions location={city} />
    </div>
  );
}

export default App;
