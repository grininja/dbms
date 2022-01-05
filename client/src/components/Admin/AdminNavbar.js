import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { NavLink, useNavigate } from "react-router-dom";
// import { Nav } from './Styles';
import { Context as AuthContext } from "../../context/AuthContext";


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

function AdminNavBar() {
  const { state, setCurrentUser } = useContext(AuthContext);
  const history = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (Cookies.get("token")) {
      setCurrentUser(Cookies, jwtDecode);
    }
    (async () => {
      await setUser(jwtDecode(localStorage.getItem("token")).username);
    })();
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    history("/login");
  };

  const classes = useStyles();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          The Productive
        </Typography>
        <div className={classes.navlinks}>
          <Link to="/story" className={classes.link}>
            Your Stories
          </Link>
          <Link to="/expense" className={classes.link}>
            Your Expenses
          </Link>
          <Link to="/todos" className={classes.link}>
            user: {user === null ? "login" : user}
          </Link>
          <button onClick={handleLogout}>
             Logout
          </button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default AdminNavBar;

const mapStateToProps = ({ auth }) => {
  console.log(auth);
  return { ...auth };
};
