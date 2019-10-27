const initialState = {
  view: "photo",
  currentPost: null,
  postViewState: "off",
  modal: false
};

function clickReducers(state = initialState, action) {
  switch (action.type) {
    case "CLICK_PHOTO":
      console.log("CLICK_PHOTO ", action);
      return Object.assign(
        { ...state },
        {
          view: "photo"
        }
      );
    case "CLICK_MUSIC":
      console.log("CLICK_MUSIC ", action);
      return Object.assign(
        { ...state },
        {
          view: "music"
        }
      );
    case "CLICK_VIDEO":
      console.log("CLICK_VIDEO ", action);
      return Object.assign(
        { ...state },
        {
          view: "video"
        }
      );
    case "CLICK_POST":
      console.log("CLICK_POST ", action);
      return Object.assign(
        { ...state },
        {
          currentPost: action.post,
          postViewState: "on"
        }
      );
    case "CLOSE_POST":
      console.log("CLOSE_POST ", action);
      return Object.assign(
        { ...state },
        {
          currentPost: null,
          postViewState: "off"
        }
      );
      case "CLICK_MODAL":
      console.log("CLICK_MODAL ", action);
      return Object.assign(
        { ...state },
        {
          modal: !action.state
        }
      );
    default:
      return state;
  }
}

export default clickReducers;
