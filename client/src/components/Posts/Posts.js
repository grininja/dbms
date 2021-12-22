import React, { useContext, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import Cookies from "js-cookie";
import {
  Context as StoryContext,
  Provider as StoryProvider,
} from "../../context/StoryContext";
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const { state, getPosts } = useContext(StoryContext);
  const classes = useStyles();
  useEffect(() => {
    (async () => {
      await getPosts(Cookies);
    })();
  }, []);
  const posts = state.story;
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post.id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

// export default () => {
//   return (
//     <StoryProvider>
//       <Posts />
//     </StoryProvider>
//   );
// };
export default Posts;