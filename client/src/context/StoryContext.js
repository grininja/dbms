import { getPosts, createPost, updatePost, deletePost } from "../actions/posts";
import createDataContext from "./createDataContext";
import StoryReducer from "../reducers/Storyreducer";

export const initialState = {
  createStoryError: "",
  fetchStoryError: "",
  updateStoryError: "",
  story: [],
};

export const { Context, Provider } = createDataContext(
  StoryReducer,
  { getPosts, createPost, updatePost, deletePost },
  initialState
);
