const initialState = {
  view: "photo",
  currentPost: null,
  postViewState: "off",
  modal: false
};

function clickReducers(state = initialState, action) {
  switch (action.type) {
    case "CLICK_PHOTO":
      return Object.assign(
        { ...state },
        {
          view: "photo"
        }
      );
    case "CLICK_MUSIC":
      return Object.assign(
        { ...state },
        {
          view: "music"
        }
      );
    case "CLICK_VIDEO":
      return Object.assign(
        { ...state },
        {
          view: "video"
        }
      );
    case "CLICK_POST":
      return Object.assign(
        { ...state },
        {
          currentPost: action.post,
          postViewState: "on"
        }
      );
    case "CLOSE_POST":
      return Object.assign(
        { ...state },
        {
          currentPost: null,
          postViewState: "off"
        }
      );
    case "CLICK_MODAL":
      return Object.assign(
        { ...state },
        {
          modal: !action.state
        }
      );
    case "CLOSE_MODAL":
      return Object.assign(
        { ...state },
        {
          modal: false
        }
      );
    default:
      return state;
  }
}

export default clickReducers;
