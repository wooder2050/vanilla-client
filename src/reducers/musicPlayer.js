const initialState = {
  musicPlayState: "off",
  currentMusic: null
};

function musicPlayerReducers(state = initialState, action) {
  switch (action.type) {
    case "START_MUSICPLAYER":
      return Object.assign(
        { ...state },
        {
          musicPlayState: "bodyPlay",
          currentMusic: action.music
        }
      );
    case "CLOSE_MUSICPLAYER":
      return Object.assign(
        { ...state },
        {
          musicPlayState: "off",
          currentMusic: null
        }
      );
    case "BODYPLAY_MUSICPLAYER":
      return Object.assign(
        { ...state },
        {
          musicPlayState: "footPlay"
        }
      );
    case "FOOTERPLAY_MUSICPLAYER":
      return Object.assign(
        { ...state },
        {
          musicPlayState: "bodyPlay"
        }
      );

    default:
      return state;
  }
}

export default musicPlayerReducers;
