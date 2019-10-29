const initialState = {
  user: {},
  followingUsers: null,
  followedUsers: null,
  myPageUserInfo: null,
  myPageCurrentFollowList: null,
  searchUsers: [],
  myPageFollowState: false,
  myPageListTitle: null,
  userPageInfo: null,
  userPagePosts: null,
  userPagefollower: null,
  userPagefollowing: null,
  following: false,
  userPageFollowState: false,
  userPageListTitle: null,
  userPageCurrentFollowList: null,
  userPagefollowingUsers: null,
  userPagefollowedUsers: null
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
    case "USERPAGE_ONLOAD":
      return Object.assign(
        { ...state },
        {
          userPageInfo: action.responseJson.pageUser[0],
          userPagePosts: action.responseJson.pageUserPosts,
          userPagefollower: action.responseJson.pageUser[0].follower,
          userPagefollowing: action.responseJson.pageUser[0].following,
          userPagefollowingUsers: action.responseJson.userPagefollowingUsers,
          userPagefollowedUsers: action.responseJson.userPagefollowedUsers
        }
      );
    case "FOLLOWING_STATE":
      return Object.assign(
        { ...state },
        {
          following: true
        }
      );
    case "CLICK_FOLLOW_USERPAGE_MODAL":
      return Object.assign(
        { ...state },
        {
          userPageFollowState: !action.state,
          userPageListTitle: action.name,
          userPageCurrentFollowList: action.list
        }
      );
    default:
      return state;
  }
}

export default usersReducers;
