import React, { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
// import { Nav } from './Styles';
import { Context as AuthContext } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
// import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
const TodoNavbar = () => {
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
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/todos">TheProductiveDiary</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/expense">Your Expenses</Nav.Link>
            <Nav.Link href="/story">Memories</Nav.Link>
            <Nav.Link href="/changepassword">Update Password</Nav.Link>
          </Nav>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>{" "}
        </Container>

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{user.username}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default TodoNavbar;
