import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import petitionFetch from "../petitionFetch";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    align: "justify",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const NavBar = ({ setLocation }) => {
  const handleKeyPress = (event) => {
    petitionFetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=pk.eyJ1Ijoiam9uYXRoeiIsImEiOiJja3FkYmxqeTYxMThyMnBzN3IxZzV1NjY3In0.HpVGfj3JG4CfaxCzpYLn_g`
    ).then((data) => {
      setLocation({
        lat: data.features[0].center[1],
        lng: data.features[0].center[0],
      });
    });
  };
  const classes = useStyles();
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Weather
          </Typography>
          <div
            display="flex"
            className={classes.search}
            style={{ display: "flex", justifySelf: "center" }}
          >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleKeyPress(event);
                }
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
