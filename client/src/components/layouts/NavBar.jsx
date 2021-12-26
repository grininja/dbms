import React, { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { NavLink, useNavigate } from 'react-router-dom';
// import { Nav } from './Styles';
import { Context as AuthContext } from '../../context/AuthContext';

// const NavBar = () => {
//   const { state: { user }, setCurrentUser } = useContext(AuthContext);
//   const history = useNavigate();

//   useEffect(() => {
//     if (Cookies.get('token')) {
//       setCurrentUser(Cookies, jwtDecode);
//     }
//   }, []);

//   return (
//     <Nav>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-md-5">
//             <div className="logo"><a href="/">The productive</a></div>
//           </div>
//           <div className="auth-btns col-md-7">
//             {user ? (
//               <div className="float-right mt-3">{user.username}
//               <NavLink to="/story">
//               <button className="btn sign-up">Write Your Story</button>
//             </NavLink>
//             </div>
//             ) : (
//               <>
               
//                 {/* <NavLink to="/login">
//                   <button className="btn sign-in">Sign In</button>
//                 </NavLink> */}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </Nav>
//   )
// };

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

function NavBar() {
    const { state: { user }, setCurrentUser } = useContext(AuthContext);
  const history = useNavigate();

  useEffect(() => {
    if (Cookies.get('token')) {
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
            <Link to="/story" className={classes.link}>
              Your Stories
            </Link>
            <Link to="/expense" className={classes.link}>
              Your Expenses
            </Link>
            <Link to="/todos" className={classes.link}>
             user: {user.username}
            </Link>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;




const mapStateToProps = ({ auth }) => {
  console.log(auth);
  return { ...auth }
}


