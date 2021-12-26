import React, { useState, useEffect, useContext } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import Cookies from "js-cookie";
import Posts from "../components/Posts/Posts";
import Form from "../components/Form/Form";
import jwtDecode from "jwt-decode";
import useStyles from "./styles";
import memories from "../images/memories.png";
import {
  Context as StoryContext,
  Provider as StoryProvider,
} from "../context/StoryContext";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Context as AuthContext } from "../context/AuthContext";
import { Toolbar } from "@mui/material";
const Story = () => {
  const {
    state: { user },
    setCurrentUser,
  } = useContext(AuthContext);
  const history = useNavigate();

  useEffect(() => {
    if (Cookies.get("token")) {
      setCurrentUser(Cookies, jwtDecode);
    }
  }, []);
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Your Memories
        </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </AppBar>
      <Toolbar>
        <div className={classes.navlinks}>
          <Link to="/story" className={classes.link}>
            Your Stories
            {`\n`}
          </Link>
          <Link to="/todos" className={classes.link}>
            user: {user.username}
          </Link>
        </div>
      </Toolbar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default () => {
  return (
    <StoryProvider>
      <Story />
    </StoryProvider>
  );
};
