const initialState = {
  myPosts: null,
  newPosts: null,
  followingPosts: null
};

function postReducers(state = initialState, action) {
  switch (action.type) {
    case "POSTS_ONLOAD":
      console.log("POSTS_ONLOAD ", action);
      return Object.assign(
        { ...state },
        {
          myPosts: action.responseJson.posts,
          newPosts: action.responseJson.newPosts,
          followingPosts: action.responseJson.followingPosts
        }
      );
    default:
      return state;
  }
}

export default postReducers;
