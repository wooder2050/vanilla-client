const initialState = {
  user: {},
  followingUsers: null,
  followedUsers: null,
  myPageUserInfo: null,
  myPageCurrentFollowList: null,
  searchUsers: [],
  myPageFollowState: false,
  myPageListTitle: null
};

function usersReducers(state = initialState, action) {
  switch (action.type) {
    case "USERS_ONLOAD":
      return Object.assign(
        { ...state },
        {
          followingUsers: action.responseJson.followingUsers,
          followedUsers: action.responseJson.followedUsers,
          user: action.responseJson.user
        }
      );
    case "USERINFO_UPDATE":
      return Object.assign(
        { ...state },
        {
          user: action.responseJson.user
        }
      );
    case "CLICK_FOLLOW_MYPAGE_MODAL":
      return Object.assign(
        { ...state },
        {
          myPageFollowState: !action.state,
          myPageListTitle: action.name,
          myPageCurrentFollowList: action.list
        }
      );
    case "SEARCH_USERS":
      return Object.assign(
        { ...state },
        {
          searchUsers: action.searchUsers
        }
      );
    default:
      return state;
  }
}

export default usersReducers;
