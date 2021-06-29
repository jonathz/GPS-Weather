import React, { useState, useEffect } from "react";
import petitionFetch from "../petitionFetch.js";
import "../assets/CityConditions.scss";
import Moment from "react-moment";

const CityConditions = ({ location }) => {
  const [weatherMeasures, setWeatherMeasures] = useState("");
  useEffect(() => {
    petitionFetch(
      `https://corsproxybypass.herokuapp.com/https://api.darksky.net/forecast/88030114c5e47763a011a75e7a10c633/${location.lat}, ${location.lng}`
    ).then((data) =>
      setWeatherMeasures({
        temperature: (((data.currently.temperature - 32) * 5) / 9).toFixed(1),
        feeling: (((data.currently.apparentTemperature - 32) * 5) / 9).toFixed(
          1
        ),
        wind: data.currently.windSpeed,
        humidity: data.currently.humidity,
        dewPoint: data.currently.dewPoint,
        UV: data.currently.uvIndex,
        visibility: data.currently.visibility,
        pressure: data.currently.pressure,
        summary: data.hourly.summary,
        icon: data.currently.icon,
        nextHour: data.hourly.data,
      })
    );
  }, [location]);

  return (
    <>
      <section className="city-stats">
        <div>
          || Wind: {weatherMeasures.wind} mph || Humidity:{" "}
          {weatherMeasures.humidity * 100}% || Dew Pt:{" "}
          {weatherMeasures.dewPoint}˚ || UV Index: {weatherMeasures.UV} ||
          Visibility: {weatherMeasures.visibility} mi || Pressure:{" "}
          {weatherMeasures.pressure} mb ||
        </div>
        <br />
        <br />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={`https://darksky.net/images/weather-icons/${weatherMeasures.icon}.png`}
              alt="weather Icon"
              style={{ width: "60px" }}
            />
            <div style={{ fontSize: "32px" }}>
              {weatherMeasures.temperature}°
            </div>
          </div>
          Feels Like: {weatherMeasures.feeling}°
        </div>
        <br />

        <span style={{ fontSize: "28px" }}>{weatherMeasures.summary}</span>
        <br />

        <div className="hour-weather">
          {weatherMeasures.nextHour?.map((hour, id) => (
            <div style={{ width: "200px" }} key={id}>
              <div style={{ width: "100%", height: "20px" }}>
                <img
                  src={`https://darksky.net/images/weather-icons/${hour.icon}.png`}
                  alt="weather Icon"
                  style={{ width: "20px" }}
                />
              </div>
              <div style={{ paddingRight: "20px" }}>
                <Moment unix format="HH">
                  {hour.time}
                </Moment>
                :00
                <br />
              </div>
              <span>{(((hour.temperature - 32) * 5) / 9).toFixed(1)}°</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CityConditions;
