import apiCall from "../apiCall";

export const getPosts = (dispatch) => async (Cookies) => {
  try {
    dispatch({ type: "FETCH_STORY_LOADING" });
    const { data } = await apiCall(
      "/getStoryByUser",
      "get",
      null,
      Cookies.get("token")
    );
    dispatch({ type: "FETCH_STORY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_STORY_FAILURE" });
    console.log(error);
  }
};

export const createPost = (dispatch) => async (post, Cookies) => {
  try {
    dispatch({ type: "CREATE_STORY_LOADING" });
    const { data } = await apiCall(
      "/createstory",
      "post",
      post,
      Cookies.get("token")
    );

    dispatch({ type: "CREATE_STORY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "CREATE_STORY_FAILURE" });
    console.log(error);
  }
};

export const updatePost = (dispatch) => async (id, post, Cookies) => {
  try {
    dispatch({ type: "UPDATE_STORY_LOADING" });
    const { data } = await apiCall(
      `/getStoryByUser/${id}`,
      "put",
      post,
      Cookies.get("token")
    );

    dispatch({ type: "UPDATE_STORY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "UPDATE_STORY_FAILURE" });
    console.log(error);
  }
};

export const deletePost = (dispatch) => async (id, Cookies) => {
  try {
    dispatch({ type: "DELETE_STORY_LOADING" });
    await apiCall(`/deleteStory/${id}`, "delete", null, Cookies.get("token"));

    dispatch({ type: "DELETE_STORY_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "DELETE_STORY_FAILURE" });
    console.log(error);
  }
};


