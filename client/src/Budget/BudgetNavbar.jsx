import React, { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { NavLink, useNavigate } from "react-router-dom";
// import { Nav } from './Styles';
import { Context as AuthContext } from "../context/AuthContext";

import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function BudgetNavBar() {
  const {
    state: { user },
    setCurrentUser,
  } = useContext(AuthContext);
  const history = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    history("/login");
  };
  useEffect(() => {
    if (Cookies.get("token")) {
      setCurrentUser(Cookies, jwtDecode);
    }
  }, []);
  const classes = useStyles();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          The Productive
        </Typography>
        <div className={classes.navlinks}>
          <Link to="/todos" className={classes.link}>
            Your Tasks
          </Link>
          <Link to="/story" className={classes.link}>
            Your Stories
          </Link>
          <Link to="/expense" className={classes.link}>
            user: {user.username}
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default BudgetNavBar;

const mapStateToProps = ({ auth }) => {
  console.log(auth);
  return { ...auth };
};
