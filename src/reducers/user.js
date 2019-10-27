const initialState = {
  user: {},
  followingUsers: null,
  followedUsers: null,
  myPageUserInfo: null,
  myPageCurrentFollowList: null,
  searchUsers: []
};

function usersReducers(state = initialState, action) {
  switch (action.type) {
    case "USERS_ONLOAD":
      console.log("USERS_ONLOAD ", action);
      return Object.assign(
        { ...state },
        {
          followingUsers: action.responseJson.followingUsers,
          followedUsers: action.responseJson.followedUsers,
          user: action.responseJson.user
        }
      );
    case "USERINFO_UPDATE":
      console.log("USERINFO_UPDATE ", action);
      return Object.assign(
        { ...state },
        {
          user: action.responseJson.user
        }
      );
    default:
      return state;
  }
}

export default usersReducers;
