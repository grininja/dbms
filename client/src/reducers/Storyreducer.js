import { initialState } from "../context/StoryContext";

const StoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_STORY_LOADING":
        return { ...state };
        case "CREATE_STORY_SUCCESS":
        return {
            ...state,
            story: [action.payload, ...state.story]
        };
        case "CREATE_STORY_FAILURE":
        return {
            ...state,
            createStoryError: action.payload.error
        };
    
        case "FETCH_STORY_LOADING":
        return { ...state };
        case "FETCH_STORY_SUCCESS":
        return {
            ...state,
            story: action.payload,
        };
        case "FETCH_STORY_FAILURE":
        return {
            ...state,
            fetchStoryError: action.error,
        };
    
        case "UPDATE_STORY_LOADING":
        return { ...state };
        case "UPDATE_STORY_SUCCESS":
        return {
            ...state,
            story: action.payload,
        };
        case "UPDATE_STORY_FAILURE":
        return {
            ...state,
            updateStoryError: action.error,
        };
    
        case "DELETE_STORY_SUCCESS":
        const { story } = state;
        const newStory = story.filter((todo) => todo.id !== action.payload);
        return { ...state, story: newStory };
    
        default:
        return state;
    }
}

export default StoryReducer;