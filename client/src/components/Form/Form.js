import React, { useState, useEffect, useContext } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
// import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import Cookies from "js-cookie";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";
import {
  Context as StoryContext,
  Provider as StoryProvider,
} from "../../context/StoryContext";
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
  });
  const { state, createPost, updatePost } = useContext(StoryContext);
  const post = state.story.find((post) => post.id === currentId);
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", description: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      await createPost(postData, Cookies);
      clear();
    } else {
      await updatePost(currentId, postData, Cookies);
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post.title}"` : "Creating a Memory"}
        </Typography>
        {/* <TextField
          name="author"
          variant="outlined"
          label="author"
          fullWidth
          value={postData.author}
          onChange={(e) => setPostData({ ...postData, author: e.target.value })}
        /> */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="description"
          variant="outlined"
          label="description"
          fullWidth
          multiline
          rows={4}
          value={postData.description}
          onChange={(e) =>
            setPostData({ ...postData, description: e.target.value })
          }
        />
        {/* <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} /> */}
        {/* <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div> */}
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
