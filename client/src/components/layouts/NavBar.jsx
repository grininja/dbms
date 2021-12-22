import React, { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav } from './Styles';
import { Context as AuthContext } from '../../context/AuthContext';

const NavBar = () => {
  const { state: { user }, setCurrentUser } = useContext(AuthContext);
  const history = useNavigate();

  useEffect(() => {
    if (Cookies.get('token')) {
      setCurrentUser(Cookies, jwtDecode);
    }
  }, []);

  return (
    <Nav>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5">
            <div className="logo"><a href="/">The productive</a></div>
          </div>
          <div className="auth-btns col-md-7">
            {user ? (
              <div className="float-right mt-3">{user.username}</div>
            ) : (
              <>
                <NavLink to="/signup">
                  <button className="btn sign-up">Sign Up</button>
                </NavLink>
                <NavLink to="/login">
                  <button className="btn sign-in">Sign In</button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </Nav>
  )
};

const mapStateToProps = ({ auth }) => {
  console.log(auth);
  return { ...auth }
}

export default NavBar;
