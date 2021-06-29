import React, { useEffect, useState } from "react";
import petitionFetch from "../petitionFetch";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function WeekConditions({ location }) {
  const classes = useStyles();
  const [weatherWeek, setweatherWeek] = useState([]);
  useEffect(() => {
    petitionFetch(
      `https://corsproxybypass.herokuapp.com/https://api.darksky.net/forecast/88030114c5e47763a011a75e7a10c633/${location.lat}, ${location.lng}`
    ).then((data) => setweatherWeek(data.daily.data));
  }, [location]);

  return (
    <div className={classes.root}>
      <p style={{ textAlign: "center", fontSize: "24px" }}>
        Weather conditions for the next Week
      </p>

      {weatherWeek?.map((day, id) => (
        <Accordion key={id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              <img
                src={`https://darksky.net/images/weather-icons/${day.icon}.png`}
                alt="weather Icon"
                style={{ width: "20px", marginRight: "10px" }}
              />
              <Moment unix format="dddd">
                {day.time}
              </Moment>{" "}
              :
              <span>
                {" "}
                Min:{(((day.temperatureMin - 32) * 5) / 9).toFixed(1)}°{" "}
              </span>
              ||{" "}
              <span>
                {" "}
                Max:{(((day.temperatureMin - 32) * 5) / 9).toFixed(1)}°{" "}
              </span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <p style={{ fontWeight: 800 }}>Wind:</p> {day.windSpeed} mph{" "}
              <br />
              <p style={{ fontWeight: 800 }}>Humidity:</p> {day.humidity * 100}%{" "}
              <br />
              <p style={{ fontWeight: 800 }}>Dew Point:</p> {day.dewPoint}{" "}
              <br />
              <p style={{ fontWeight: 800 }}>UV Index:</p> {day.uvIndex} <br />
              <p style={{ fontWeight: 800 }}>Visibility:</p> {day.visibility} mi{" "}
              <br />
              <p style={{ fontWeight: 800 }}>Pressure:</p> {day.pressure} mb{" "}
              <br />
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>
            Disabled Accordion
          </Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
}
